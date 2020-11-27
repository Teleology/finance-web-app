import { ReturnTypeOfGroup, PeriodEnum } from '../../utils/type-util';
import { LatestStock, StockTimeSeries } from './stock-time-series-utils';

namespace StockTimeSeriesActionType {
  export const GET_LATEST = 'stock-time-series/GET_LATEST';
  export const SET_LATEST = 'stock-time-series/SET_LATEST';
  export const GET_TIME_SERIES = 'stock-time-series/GET_TIME_SERIES';
  export const GET_TIME_SERIES_FAILURE = 'stock-time-series/GET_TIME_SERIES_FAILURE';
  export const SET_TIME_SERIES = 'stock-time-series/SET_TIME_SERIES';
  export const SET_PERIOD = 'stock-time-series/SET_PERIOD';
}

const getLatest = (symbol: string) =>
  ({
    type: StockTimeSeriesActionType.GET_LATEST,
    payload: { symbol }
  } as const);

const setLatest = (latestStock: LatestStock) =>
  ({
    type: StockTimeSeriesActionType.SET_LATEST,
    payload: latestStock
  } as const);

const getTimeSeries = (symbol: string, period: PeriodEnum) =>
  ({
    type: StockTimeSeriesActionType.GET_TIME_SERIES,
    payload: {
      symbol,
      period
    }
  } as const);

const getTimeSeriesFailure = () =>
  ({
    type: StockTimeSeriesActionType.GET_TIME_SERIES_FAILURE
  } as const);

const setTimeSeries = (series: StockTimeSeries) =>
  ({
    type: StockTimeSeriesActionType.SET_TIME_SERIES,
    payload: series
  } as const);

const setPeriod = (period: PeriodEnum) =>
  ({
    type: StockTimeSeriesActionType.SET_PERIOD,
    payload: { period }
  } as const);

const stockTimeSeriesAction = {
  getLatest,
  setLatest,
  setTimeSeries,
  getTimeSeriesFailure,
  getTimeSeries,
  setPeriod
};

type StockTimeSeriesActionGroup = ReturnTypeOfGroup<typeof stockTimeSeriesAction>;
type StockTimeSeriesActionUnion = StockTimeSeriesActionGroup[keyof StockTimeSeriesActionGroup];

export { stockTimeSeriesAction, StockTimeSeriesActionType, StockTimeSeriesActionGroup, StockTimeSeriesActionUnion };
