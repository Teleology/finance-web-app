import { EMPTY, Observable } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { RootAction } from '../root-store';
import { baseUrl } from '../../utils/network-util';
import { StockTimeSeries } from '../../typing/stock-time-series.typing';
import { stockTimeSeriesAction, StockTimeSeriesActionGroup, StockTimeSeriesActionType } from './stock-time-series.action';
const stockTimeSeriesUrl = `${baseUrl}/stock/days`;
const setTimeSeriesEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, StockTimeSeriesActionGroup['getTimeSeries']>(StockTimeSeriesActionType.GET_TIME_SERIES),
    exhaustMap<StockTimeSeriesActionGroup['getTimeSeries'], Observable<StockTimeSeries>>(
      ({ payload: { symbol } }: StockTimeSeriesActionGroup['getTimeSeries']) => ajax.getJSON(stringifyUrl({ url: stockTimeSeriesUrl, query: { symbol } }))
    ),
    map(stockTimeSeriesAction.setTimeSeries),
    catchError((error) => {
      console.log(error);
      return EMPTY;
    })
  );

const stockTimeSeriesEpic = combineEpics(setTimeSeriesEpic);
export { stockTimeSeriesEpic };
