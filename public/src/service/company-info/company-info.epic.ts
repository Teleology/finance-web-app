import { Observable, of, pipe } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { flow, pick, camelCase, mapKeys, isEmpty as fpIsEmpty, negate as fpIsNegate } from 'lodash/fp';
import { RootAction } from '../root-store';
import { baseURL } from '../../../../express-server/src/common/network-utils';
import { SharedActionGroup, SharedActionType } from '../shared-service/shared.action';
import { modalAction } from '../shared-service/modal/modal.action';
import { ModalType } from '../shared-service/modal/modal-utils';
import { CompanyDetail, NewsUnit } from './company-info-util';
import { companyInfoAction } from './company-info.action';
const companyInfoUrl = `${baseURL}/company-info`;

const newsEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, SharedActionGroup['getCompanyInfo']>(SharedActionType.GET_COMPANY_INFO),
    switchMap((action: SharedActionGroup['getCompanyInfo']) =>
      ajax.getJSON<Array<NewsUnit>>(stringifyUrl({ url: `${companyInfoUrl}/news`, query: { keywords: action.payload.company.label } }))
    ),
    map(companyInfoAction.setNews)
  );

const pickedDetailField = [
  'Symbol',
  'Sector',
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

const fetchDetailPipe = pipe(
  ofType<RootAction, SharedActionGroup['getCompanyInfo']>(SharedActionType.GET_COMPANY_INFO),
  switchMap((action: SharedActionGroup['getCompanyInfo']) =>
    ajax.getJSON(stringifyUrl({ url: `${companyInfoUrl}/detail`, query: { symbol: action.payload.company.value } }))
  ),
  map(flow(pick(pickedDetailField), mapKeys(camelCase) as (input: unknown) => CompanyDetail | {})),
  catchError((error: Error) => {
    console.log(error);
    return of({});
  })
);

const detailEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(fetchDetailPipe, filter(fpIsNegate(fpIsEmpty)), map(companyInfoAction.setDetail));

// TODO: should provide the exact company name instead of refer it to "company"
const emptyDetailEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    fetchDetailPipe,
    filter(fpIsEmpty),
    map(() =>
      modalAction.openModal({
        modalType: ModalType.ALERT,
        title: 'We are sorry',
        content: "Sorry, we can't find anything related to the company you chose",
        confirmText: 'close'
      })
    )
  );
const companyInfoEpic = combineEpics(newsEpic, detailEpic, emptyDetailEpic);

export { companyInfoEpic };
