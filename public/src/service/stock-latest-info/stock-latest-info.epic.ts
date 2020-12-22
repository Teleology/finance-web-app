import { Observable, of, pipe } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { flow, isEmpty as fpIsEmpty, negate as fpNegate, omit as fpOmit } from 'lodash/fp';
import { baseUrl } from '../../utils/network-util';
import { LatestStock } from '../stock-time-series/stock-time-series-utils';
import { RootAction } from '../root-store';
import { LatestStockContract, StockLatestInfoActionType } from './stock-latest-info.utils';
import { stockLatestInfoAction, StockLatestInfoActionGroup } from './stock-latest-info.action';

const setLatestEpic = (action$: Observable<RootAction>): Observable<RootAction> => {
  console.log('setLatestEpic');
  const fetchPipe = pipe(
    ofType<RootAction, StockLatestInfoActionGroup['getLatest']>(StockLatestInfoActionType.GET_LATEST),
    switchMap<StockLatestInfoActionGroup['getLatest'], Observable<LatestStock | {}>>((action: StockLatestInfoActionGroup['getLatest']) =>
      ajax.getJSON<LatestStock>(stringifyUrl({ url: `${baseUrl}/stock/latest`, query: { symbol: action.payload.symbol } })).pipe(
        catchError(
          (error: Error): Observable<{}> => {
            console.log(error);
            return of({});
          }
        )
      )
    )
  );
  const successPipe = pipe(
    filter(fpNegate(fpIsEmpty)),
    map(
      flow(
        fpOmit<LatestStockContract, 'change' | 'changePercent'>(['change', 'changePercent']),
        (response: Omit<LatestStockContract, 'change' | 'changePercent'>) => ({
          ...response,
          open: parseFloat(response.open),
          high: parseFloat(response.high),
          low: parseFloat(response.low),
          price: parseFloat(response.price),
          volume: parseFloat(response.volume),
          previousClose: parseFloat(response.previousClose)
        })
      )
    ),
    map(stockLatestInfoAction.setLatest)
  );
  return action$.pipe(fetchPipe, successPipe);
};

const stockLatestInfoEpic = combineEpics(setLatestEpic);

export { stockLatestInfoEpic };
