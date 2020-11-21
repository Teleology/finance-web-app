import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map as lodashMap, toNumber } from 'lodash';
import { stringifyUrl } from 'query-string';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as dayjs from 'dayjs';
import { RootAction } from '../root-store';
import { baseUrl } from '../../utils/network-util';
import { Override } from '../../utils/type-util';
import { StockTimeSeries, StockTimeSeriesMeta, StockTimeSeriesUnit } from './stock-time-series.typing';
import { stockTimeSeriesAction, StockTimeSeriesActionGroup, StockTimeSeriesActionType } from './stock-time-series.action';
dayjs.extend(timezone);
dayjs.extend(utc);

type StockTimeSeriesContract = {
  metaData: StockTimeSeriesMeta;
  series: Array<Override<StockTimeSeriesUnit, { time: string }>>;
};
const stockTimeSeriesUrl = `${baseUrl}/stock/weeks`;
const setTimeSeriesEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, StockTimeSeriesActionGroup['getTimeSeries']>(StockTimeSeriesActionType.GET_TIME_SERIES),
    exhaustMap<StockTimeSeriesActionGroup['getTimeSeries'], Observable<StockTimeSeriesContract>>(
      ({ payload: { symbol } }: StockTimeSeriesActionGroup['getTimeSeries']) => ajax.getJSON(stringifyUrl({ url: stockTimeSeriesUrl, query: { symbol } }))
    ),
    map<StockTimeSeriesContract, StockTimeSeries>(({ series, metaData }: StockTimeSeriesContract) => {
      const convertedSeries = lodashMap(series, (datum: Override<StockTimeSeriesUnit, { time: string }>) => ({
        ...datum,
        open: toNumber(datum.open),
        close: toNumber(datum.close),
        high: toNumber(datum.high),
        low: toNumber(datum.low),
        time: dayjs(datum.time).tz(metaData.timeZone).toDate()
      }));
      return {
        metaData,
        series: convertedSeries
      };
    }),
    map(stockTimeSeriesAction.setTimeSeries),
    catchError((error) => {
      console.log(error);
      return of(stockTimeSeriesAction.getTimeSeriesFailure());
    })
  );

const stockTimeSeriesEpic = combineEpics(setTimeSeriesEpic);
export { stockTimeSeriesEpic };
