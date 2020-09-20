import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { stringifyUrl } from 'query-string';
import { RootAction } from '../root-store';
import { baseUrl } from '../../utils/network-util';
import { StockTimeSeriesActionType } from './stock-time-series.action';
const stockTimeSeriesUrl = `${baseUrl}/stock/days`;
const setTimeSeriesEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType(StockTimeSeriesActionType.GET_TIME_SERIES),
    exhaustMap(() => ajax.getJSON(stringifyUrl(stockTimeSeriesUrl)))
  );
