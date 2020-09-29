import { Observable } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { RootAction } from '../root-store';
import { SharedActionGroup, SharedActionType } from '../shared.action';
import { baseURL } from '../../../../express-server/src/common/network-utils';
import { NewsUnit } from './company-info-util';
import { newsActions } from './company-info.action';
const companyInfoUrl = `${baseURL}/company-info`;

const newsEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, SharedActionGroup['setCollection']>(SharedActionType.COLLECT_COMPANY),
    switchMap((action: SharedActionGroup['setCollection']) =>
      ajax.getJSON<Array<NewsUnit>>(stringifyUrl({ url: `${companyInfoUrl}/news`, query: { keywords: action.payload.company.label } }))
    ),
    map(newsActions.setNews)
  );

const companyInfoEpic = combineEpics(newsEpic);

export { companyInfoEpic };
