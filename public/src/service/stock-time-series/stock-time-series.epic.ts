import { Observable, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { toNumber } from 'lodash';

import { flow, map as fpMap, sortBy as fpSortBy, negate as fpNegate, isEmpty as fpIsEmpty, omit as fpOmit, mapValues as fpMapValues } from 'lodash/fp';
import { stringifyUrl } from 'query-string';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as dayjs from 'dayjs';
import { RootAction } from '../root-store';
import { baseUrl } from '../../utils/network-util';
import { Override } from '../../utils/type-util';
import { PeriodEnum } from '../../utils/general-type';
import { LatestStock, StockTimeSeries, StockTimeSeriesMeta, StockTimeSeriesUnit } from './stock-time-series-utils';
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

const setLatestEpic = (action$: Observable<RootAction>): Observable<RootAction> => {
  console.log('setLatestEpic');
  const valuesMapping = {
    open: parseFloat,
    high: parseFloat,
    low: parseFloat,
    price: parseFloat,
    volume: parseFloat,
    previousClose: parseFloat
  };
  const fetchPipe = pipe(
    ofType<RootAction, StockTimeSeriesActionGroup['getLatest']>(StockTimeSeriesActionType.GET_LATEST),
    switchMap<StockTimeSeriesActionGroup['getLatest'], Observable<LatestStock | {}>>((action: StockTimeSeriesActionGroup['getLatest']) =>
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
    // TODO: 11/25 remove this one
    // TODO: convert should be able in the latest version
    // @ts-ignore
    map(
      flow(
        fpOmit(['change', 'changePercent']),
        fpMapValues.convert({ cap: false })((value: string, key: string): string | number => {
          console.log(value, key);
          if (key in valuesMapping) {
            console.log(key + ' in ' + value);
            return valuesMapping[key as keyof typeof valuesMapping](value);
          } else {
            return value;
          }
        })
      )
    ),
    map(stockTimeSeriesAction.setLatest)
  );
  return action$.pipe(fetchPipe, successPipe);
};

const setTimeSeriesEpic = (action$: Observable<RootAction>): Observable<RootAction> =>
  action$.pipe(
    ofType<RootAction, StockTimeSeriesActionGroup['getTimeSeries']>(StockTimeSeriesActionType.GET_TIME_SERIES),
    switchMap<StockTimeSeriesActionGroup['getTimeSeries'], Observable<StockTimeSeriesContract>>(
      ({ payload: { symbol, period } }: StockTimeSeriesActionGroup['getTimeSeries']) =>
        ajax.getJSON(stringifyUrl({ url: getTimeUrl(period), query: { symbol } }))
    ),
    map<StockTimeSeriesContract, StockTimeSeries>(({ series, metaData }: StockTimeSeriesContract) => {
      const convertedSeries = flow(
        fpMap<Override<StockTimeSeriesUnit, { time: string }>, StockTimeSeriesUnit>((datum: Override<StockTimeSeriesUnit, { time: string }>) => ({
          ...datum,
          open: toNumber(datum.open),
          close: toNumber(datum.close),
          high: toNumber(datum.high),
          low: toNumber(datum.low),
          // TODO: Date is not serializable, should not in redux
          time: dayjs(datum.time).tz(metaData.timeZone).toDate()
        })),
        fpSortBy<StockTimeSeriesUnit>((dataum) => dataum.time)
      )(series);
      return {
        metaData,
        data: convertedSeries
      };
    }),
    map(stockTimeSeriesAction.setTimeSeries),
    catchError((error) => {
      console.log(error);
      return of(stockTimeSeriesAction.getTimeSeriesFailure());
    })
  );

const stockTimeSeriesEpic = combineEpics(setTimeSeriesEpic, setLatestEpic);
export { stockTimeSeriesEpic };
