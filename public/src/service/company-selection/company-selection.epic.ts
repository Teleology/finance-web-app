import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, tap, map } from 'rxjs/operators';
import { RootAction } from '../root-store';
import { companySelectionAction, CompanySelectionActionType } from './company-selection.action';

const selectionUrl = '/api/v1/company-selection';

const selectContinentEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType(CompanySelectionActionType.GET_CONTINENT_OPTIONS),
    mergeMap(() => ajax.getJSON(`${selectionUrl}/continent`)),
    tap(console.log),
    map(companySelectionAction.setContinentOptions)
  );

const companySelectionEpic = combineEpics(selectContinentEpic);

export { companySelectionEpic };
