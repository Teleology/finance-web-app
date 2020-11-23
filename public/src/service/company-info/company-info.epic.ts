import { Observable, of, pipe, merge, EMPTY } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { map, switchMap, filter, catchError, concatMapTo, share } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { flow, pick, camelCase, mapKeys, isEmpty as fpIsEmpty, negate as fpIsNegate } from 'lodash/fp';
import { RootAction } from '../root-store';
import { baseURL } from '../../../../express-server/src/common/network-utils';
import { sharedAction, SharedActionGroup, SharedActionType } from '../shared-service/shared.action';
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
/*
Here we placed the catchError() inside our mergeMap(),
but after our AJAX call; this is important because if we let the error reach the action$.pipe(),
it will terminate it and no longer listen for new actions.
 */
namespace CompanyDetail {
  const fetchDetailPipe = pipe(
    ofType<RootAction, SharedActionGroup['getCompanyInfo']>(SharedActionType.GET_COMPANY_INFO),
    switchMap((action: SharedActionGroup['getCompanyInfo']) =>
      ajax.getJSON(stringifyUrl({ url: `${companyInfoUrl}/detail`, query: { symbol: action.payload.company.value } })).pipe(
        catchError((error: Error) => {
          console.log(error);
          return EMPTY;
        })
      )
    ),
    map(flow(pick(pickedDetailField), mapKeys(camelCase) as (input: unknown) => CompanyDetail | {}))
  );

  const detailPipe = pipe(filter(fpIsNegate(fpIsEmpty)), map(companyInfoAction.setDetail));

  // TODO: should provide the exact company name instead of refer it to "company"
  const emptyDetailPipe = pipe(
    filter(fpIsEmpty),
    concatMapTo(
      of(
        sharedAction.getCompanyInfoFailure(),
        modalAction.openModal({
          modalType: ModalType.ALERT,
          title: 'We are sorry',
          content: "Sorry, we can't find anything related to the company you chose",
          confirmText: 'close'
        })
      )
    )
  );

  export const detailEpic = (action$: Observable<RootAction>): Observable<RootAction> => {
    const ajax$ = action$.pipe(fetchDetailPipe, share());
    const empty$ = ajax$.pipe(emptyDetailPipe);
    const content$ = ajax$.pipe(detailPipe);
    return merge(empty$, content$).pipe(catchError(() => EMPTY));
  };
}

const companyInfoEpic = combineEpics(newsEpic, CompanyDetail.detailEpic);

export { companyInfoEpic };
