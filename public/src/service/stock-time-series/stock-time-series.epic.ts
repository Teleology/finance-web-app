import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { map as _map, toNumber } from 'lodash';
import { flow, map as fpMap, sortBy as fpSortBy } from 'lodash/fp';
import { stringifyUrl } from 'query-string';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as dayjs from 'dayjs';
import { RootAction } from '../root-store';
import { baseUrl } from '../../utils/network-util';
import { Override } from '../../utils/type-util';
import { PeriodEnum } from '../../utils/general-type';
import { StockTimeSeries, StockTimeSeriesMeta, StockTimeSeriesUnit } from './stock-time-series.typing';
import { stockTimeSeriesAction, StockTimeSeriesActionGroup, StockTimeSeriesActionType } from './stock-time-series.action';
dayjs.extend(timezone);
dayjs.extend(utc);

type StockTimeSeriesContract = {
  metaData: StockTimeSeriesMeta;
  series: Array<Override<StockTimeSeriesUnit, { time: string }>>;
};

const getTimeUrl = (period: PeriodEnum): string =>
  ((): string => {
    const periodMapping = {
      [PeriodEnum.DAY]: 'days',
      [PeriodEnum.WEEK]: 'weeks',
      [PeriodEnum.MONTH]: 'months'
    };
    return `${baseUrl}/stock/${periodMapping[period]}`;
  })();

const setTimeSeriesEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, StockTimeSeriesActionGroup['getTimeSeries']>(StockTimeSeriesActionType.GET_TIME_SERIES),
    switchMap<StockTimeSeriesActionGroup['getTimeSeries'], Observable<StockTimeSeriesContract>>(
      ({ payload: { symbol, period } }: StockTimeSeriesActionGroup['getTimeSeries']) =>
        ajax.getJSON(stringifyUrl({ url: getTimeUrl(period), query: { symbol } }))
    ),
    map<StockTimeSeriesContract, StockTimeSeries>(({ series, metaData }: StockTimeSeriesContract) => {
      const convertedSeries = flow(
        fpMap((datum: Override<StockTimeSeriesUnit, { time: string }>) => ({
          ...datum,
          open: toNumber(datum.open),
          close: toNumber(datum.close),
          high: toNumber(datum.high),
          low: toNumber(datum.low),
          time: dayjs(datum.time).tz(metaData.timeZone).toDate()
        })),
        fpSortBy('time')
      )(series);
      // TODO: typing
      return {
        metaData,
        series: (convertedSeries as unknown) as Array<StockTimeSeriesUnit>
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
