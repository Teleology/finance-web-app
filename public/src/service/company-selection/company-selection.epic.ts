import { Observable, EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { map as lodashMap, startCase, flow } from 'lodash/fp';
import { RootAction } from '../root-store';
import { baseURL } from '../../../../express-server/src/common/network-utils';
import { LabelUnit } from '../../utils/general-type';
import { companySelectionAction, CompanySelectionActionGroup, CompanySelectionActionType } from './company-selection.action';

type IndiceOptionContract = { categoryId: string; categoryName: string };
type CompanyOptionContract = {
  shortName: string;
  stockId: string;
  name: string;
  country: string;
};
const selectionUrl = `${baseURL}/company-selection`;
const mapToLabelUnit = lodashMap((option: string): LabelUnit => ({ value: option, label: startCase(option) }));
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
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );

const setCountrySelectionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
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
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );

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
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );

const companySelectionEpic = combineEpics(getContinentOptionEpic, setContinentSelectionEpic, setCountrySelectionEpic, setIndiceSelectionEpic);

export { companySelectionEpic };
