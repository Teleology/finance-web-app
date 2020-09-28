import { Observable, EMPTY, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { combineEpics, ofType, StateObservable } from 'redux-observable';
import { mergeMap, tap, map, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { map as lodashMap, startCase, flow } from 'lodash/fp';
import * as lodash from 'lodash';
import { RootAction, RootState } from '../root-store';
import { LabelUnit } from '../../utils/general-type';
import { baseUrl } from '../../utils/network-util';
import { LabelText } from '../../utils/type-util';
import { sharedAction } from '../shared.action';
import { companySelectionAction, CompanySelectionActionGroup, CompanySelectionActionType } from './company-selection.action';

type IndiceOptionContract = { categoryId: string; categoryName: string };
type CompanyOptionContract = {
  shortName: string;
  stockId: string;
  name: string;
  country: string;
};
const selectionUrl = `${baseUrl}/company-selection`;
const mapToLabelUnit = lodashMap((option: string): LabelUnit => ({ value: option, label: startCase(option) }));
const resetActionList: Array<RootAction> = [companySelectionAction.resetCountry(), companySelectionAction.resetIndice(), companySelectionAction.resetCompany()];
const getContinentOptionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType(CompanySelectionActionType.GET_CONTINENT_OPTIONS),
    mergeMap(() => ajax.getJSON(`${selectionUrl}/continents`)),
    tap(console.log),
    map(flow(mapToLabelUnit, companySelectionAction.setContinentOptions)),
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );

const setContinentSelectionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, CompanySelectionActionGroup['setContinentSelection']>(CompanySelectionActionType.SET_CONTINENT_SELECTION),
    mergeMap((action: CompanySelectionActionGroup['setContinentSelection']) => ajax.getJSON(`${selectionUrl}/countries/${action.payload.selection}`)),
    tap(console.log),
    map(flow(mapToLabelUnit, companySelectionAction.setCountryOptions)),
    concatMap((action: CompanySelectionActionGroup['setCountryOptions']) => of(...resetActionList, action)),
    tap(console.log),
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );

const setCountrySelectionEpic = (action$: Observable<RootAction>): Observable<RootAction> => {
  console.log('I set country execute');
  return action$.pipe(
    ofType(CompanySelectionActionType.SET_COUNTRY_SELECTION),
    mergeMap<CompanySelectionActionGroup['setCountrySelection'], Observable<Array<IndiceOptionContract>>>(
      (action: CompanySelectionActionGroup['setCountrySelection']) => ajax.getJSON(`${selectionUrl}/indices/${action.payload.selection}`)
    ),
    map(
      flow(
        lodashMap((item: IndiceOptionContract) => ({ value: item.categoryId, label: item.categoryName })),
        companySelectionAction.setIndiceOptions
      )
    ),
    concatMap((action: CompanySelectionActionGroup['setIndiceOptions']) => of(...resetActionList.slice(1), action)),
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );
};

const setIndiceSelectionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType(CompanySelectionActionType.SET_INDICE_SELECTION),
    mergeMap<CompanySelectionActionGroup['setIndiceSelection'], Observable<Array<CompanyOptionContract>>>(
      (action: CompanySelectionActionGroup['setIndiceSelection']) => ajax.getJSON(`${selectionUrl}/companies/${action.payload.selection}`)
    ),
    map(
      flow(
        lodashMap((item: CompanyOptionContract): LabelUnit => ({ value: item.shortName, label: item.name })),
        companySelectionAction.setCompanyOptions
      )
    ),
    concatMap((action: CompanySelectionActionGroup['setCompanyOptions']) => of(...resetActionList.slice(2), action)),
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );

const setCompanySelectionEpic = (action$: Observable<RootAction>, state$: StateObservable<RootState>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, CompanySelectionActionGroup['setCompanySelection']>(CompanySelectionActionType.SET_COMPANY_SELECTION),
    withLatestFrom(state$.pipe(map((state: RootState) => state.companySelection.company.options))),
    map(([action, options]: [CompanySelectionActionGroup['setCompanySelection'], Array<LabelText<string>>]) => {
      const symbol = action.payload.selection;
      return lodash.find<LabelText<string>>(options, { value: symbol }) as LabelText<string>;
    }),
    map(sharedAction.setCollection)
  );
const companySelectionEpic = combineEpics(
  getContinentOptionEpic,
  setContinentSelectionEpic,
  setCountrySelectionEpic,
  setIndiceSelectionEpic,
  setCompanySelectionEpic
);

export { companySelectionEpic };
