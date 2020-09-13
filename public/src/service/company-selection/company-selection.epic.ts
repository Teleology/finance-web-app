import { Observable, EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { RootAction } from '../root-store';
import { baseURL } from '../../../../express-server/src/common/network-utils';
import { companySelectionAction, CompanySelectionActionGroup, CompanySelectionActionType } from './company-selection.action';

const selectionUrl = `${baseURL}/company-selection`;

const getContinentOptionEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType(CompanySelectionActionType.GET_CONTINENT_OPTIONS),
    mergeMap(() => ajax.getJSON(`${selectionUrl}/continents`)),
    tap(console.log),
    map(companySelectionAction.setContinentOptions),
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
    map(companySelectionAction.setCountryOptions),
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );
const companySelectionEpic = combineEpics(getContinentOptionEpic, setContinentSelectionEpic);

export { companySelectionEpic };
