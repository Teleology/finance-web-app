import { Observable, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { toNumber } from 'lodash';

import { flow, map as fpMap, sortBy as fpSortBy, negate as fpNegate, isEmpty as fpIsEmpty, omit as fpOmit } from 'lodash/fp';
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
import { LatestStockContract } from './stock-time-series-contract';
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
