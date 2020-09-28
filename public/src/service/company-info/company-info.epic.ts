import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { RootAction } from '../root-store';
import { SharedActionGroup, SharedActionType } from '../shared.action';
import { baseURL } from '../../../../express-server/src/common/network-utils';
const companyInfoUrl = `${baseURL}/company-info`;
const newsEpic = (action$: Observable<RootAction>): Observable<unknown> =>
  action$.pipe(
    ofType<RootAction, SharedActionGroup['setCollection']>(SharedActionType.COLLECT_COMPANY),
    switchMap((action: SharedActionGroup['setCollection']) =>
      ajax.getJSON(stringifyUrl({ url: `${companyInfoUrl}/news`, query: { keywords: action.payload.company.label } }))
    )
  );
