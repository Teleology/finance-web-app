import { Observable } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { flow, pick, camelCase, mapKeys } from 'lodash/fp';
import { RootAction } from '../root-store';
import { SharedActionGroup, SharedActionType } from '../shared.action';
import { baseURL } from '../../../../express-server/src/common/network-utils';
import { CompanyDetail, NewsUnit } from './company-info-util';
import { companyInfoAction } from './company-info.action';
const companyInfoUrl = `${baseURL}/company-info`;

const newsEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, SharedActionGroup['setCollection']>(SharedActionType.COLLECT_COMPANY),
    switchMap((action: SharedActionGroup['setCollection']) =>
      ajax.getJSON<Array<NewsUnit>>(stringifyUrl({ url: `${companyInfoUrl}/news`, query: { keywords: action.payload.company.label } }))
    ),
    map(companyInfoAction.setNews)
  );

const pickedDetailField = [
  'Symbol',
  'Name',
  'Description',
  'Exchange',
  'Country',
  'Industry',
  'Address',
  'FullTimeEmployees',
  'MarketCapitalization',
  'EBITDA',
  'PEGRatio'
];
const detailEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, SharedActionGroup['setCollection']>(SharedActionType.COLLECT_COMPANY),
    switchMap((action: SharedActionGroup['setCollection']) =>
      ajax.getJSON(stringifyUrl({ url: `${companyInfoUrl}/detail`, query: { symbol: action.payload.company.value } }))
    ),
    map(flow(pick(pickedDetailField), mapKeys(camelCase) as (input: unknown) => CompanyDetail)),
    map(companyInfoAction.setDetail)
  );
const companyInfoEpic = combineEpics(newsEpic, detailEpic);

export { companyInfoEpic };
