import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, tap, map } from 'rxjs/operators';
import { RootAction } from '../root-store';
import { baseURL } from '../../../../express-server/src/common/network-utils';
import { companySelectionAction, CompanySelectionActionType } from './company-selection.action';

const selectionUrl = `${baseURL}/company-selection`;

const selectContinentEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType(CompanySelectionActionType.GET_CONTINENT_OPTIONS),
    mergeMap(() => ajax.getJSON(`${selectionUrl}/continents`)),
    tap(console.log),
    map(companySelectionAction.setContinentOptions)
  );

const companySelectionEpic = combineEpics(selectContinentEpic);

export { companySelectionEpic };
