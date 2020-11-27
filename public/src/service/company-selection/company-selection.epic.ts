import { Observable, EMPTY, of, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { combineEpics, ofType } from 'redux-observable';
import { switchMap, map, catchError, concatMap } from 'rxjs/operators';
import { map as fpMap, startCase as fpStartCase, flow } from 'lodash/fp';
// import * as lodash from 'lodash';
import { RootAction } from '../root-store';
import { LabelUnit } from '../../utils/type-util';
import { baseUrl } from '../../utils/network-util';
import { modalAction } from '../shared-service/modal/modal.action';
import { ModalType } from '../shared-service/modal/modal-utils';
import { companySelectionAction, CompanySelectionActionGroup, CompanySelectionActionType } from './company-selection.action';
import { CompanyInIndice } from './company-selection-utils';

type IndiceOptionContract = { categoryId: string; categoryName: string };

const selectionUrl = `${baseUrl}/company-selection`;
const mapToLabelUnit = fpMap((option: string): LabelUnit => ({ value: option, label: fpStartCase(option) }));
const resetActionList: Array<RootAction> = [
  companySelectionAction.resetCountry(),
  companySelectionAction.resetIndice(),
  companySelectionAction.resetCompaniesInIndice()
];
const getContinentOptionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, CompanySelectionActionGroup['getContinentOptions']>(CompanySelectionActionType.GET_CONTINENT_OPTIONS),
    switchMap<CompanySelectionActionGroup['getContinentOptions'], Observable<Array<string>>>(() => ajax.getJSON(`${selectionUrl}/continents`)),
    map(flow(mapToLabelUnit, companySelectionAction.setContinentOptions)),
    catchError((error) => {
      console.log(error);
      return of(companySelectionAction.getContinentOptionsFailure());
    })
  );

const setContinentSelectionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, CompanySelectionActionGroup['setContinentSelection']>(CompanySelectionActionType.SET_CONTINENT_SELECTION),
    switchMap<CompanySelectionActionGroup['setContinentSelection'], Observable<Array<string>>>((action: CompanySelectionActionGroup['setContinentSelection']) =>
      ajax.getJSON(`${selectionUrl}/countries/${action.payload.selection}`)
    ),
    catchError((error) => {
      console.log(error);
      return throwError({ error, action: companySelectionAction.getCountryOptionsFailure() });
    }),
    map(flow(mapToLabelUnit, companySelectionAction.setCountryOptions)),
    concatMap((action: CompanySelectionActionGroup['setCountryOptions']) => of(...resetActionList, action)),
    catchError((error) => {
      console.log(error);
      if (error.action != null) {
        return of(error.action);
      } else {
        return EMPTY;
      }
    })
  );

const setCountrySelectionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType(CompanySelectionActionType.SET_COUNTRY_SELECTION),
    switchMap<CompanySelectionActionGroup['setCountrySelection'], Observable<Array<IndiceOptionContract>>>(
      (action: CompanySelectionActionGroup['setCountrySelection']) => ajax.getJSON(`${selectionUrl}/indices/${action.payload.selection}`)
    ),
    map(
      flow(
        fpMap((item: IndiceOptionContract) => ({ value: item.categoryId, label: item.categoryName })),
        companySelectionAction.setIndiceOptions
      )
    ),
    concatMap((action: CompanySelectionActionGroup['setIndiceOptions']) => of(...resetActionList.slice(1), action)),
    catchError((error) => {
      console.log(error);
      return of(companySelectionAction.getIndiceOptionsFailure());
    })
  );

const setIndiceSelectionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType(CompanySelectionActionType.SET_INDICE_SELECTION),
    switchMap<CompanySelectionActionGroup['setIndiceSelection'], Observable<Array<CompanyInIndice>>>(
      (action: CompanySelectionActionGroup['setIndiceSelection']) => ajax.getJSON(`${selectionUrl}/companies/${action.payload.selection}`)
    ),
    map(companySelectionAction.setCompaniesInIndice),
    concatMap((action: CompanySelectionActionGroup['setCompaniesInIndice']) => of(...resetActionList.slice(2), action)),
    catchError((error) => {
      console.log(error);
      return of(
        modalAction.openModal({
          modalType: ModalType.ALERT,
          title: 'We are sorry',
          content: "Sorry, we can't find anything related to the indice you chose",
          confirmText: 'close'
        }),
        companySelectionAction.getCompaniesInIndiceFailure()
      );
    })
  );

// const setCompanySelectionEpic = (action$: Observable<RootAction>, state$: StateObservable<RootState>): Observable<RootAction> =>
//   action$.pipe(
//     ofType<RootAction, CompanySelectionActionGroup['setCompanySelection']>(CompanySelectionActionType.SET_COMPANY_SELECTION),
//     withLatestFrom(state$.pipe(map((state: RootState) => state.companySelection.company.options))),
//     map(([action, options]: [CompanySelectionActionGroup['setCompanySelection'], Array<LabelText<string>>]) => {
//       const symbol = action.payload.selection;
//       return lodash.find<LabelText<string>>(options, { value: symbol }) as LabelText<string>;
//     }),
//     map(sharedAction.setCollection)
//   );
const companySelectionEpic = combineEpics(
  getContinentOptionEpic,
  setContinentSelectionEpic,
  setCountrySelectionEpic,
  setIndiceSelectionEpic
  // setCompanySelectionEpic
);

export { companySelectionEpic };
