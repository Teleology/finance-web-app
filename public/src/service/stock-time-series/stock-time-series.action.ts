import { ReturnTypeOfGroup } from '../../utils/type-util';
import { StockTimeSeries } from './stock-time-series.typing';

namespace StockTimeSeriesActionType {
  export const GET_TIME_SERIES = 'stock-time-series/GET_TIME_SERIES';
  export const SET_TIME_SERIES = 'stock-time-series/SET_TIME_SERIES';
}

const getTimeSeries = (symbol: string) =>
  ({
    type: StockTimeSeriesActionType.GET_TIME_SERIES,
    payload: {
      symbol
    }
  } as const);

const setTimeSeries = (series: StockTimeSeries) =>
  ({
    type: StockTimeSeriesActionType.SET_TIME_SERIES,
    payload: series
  } as const);

const stockTimeSeriesAction = {
  setTimeSeries,
  getTimeSeries
};

type StockTimeSeriesActionGroup = ReturnTypeOfGroup<typeof stockTimeSeriesAction>;
type StockTimeSeriesActionUnion = StockTimeSeriesActionGroup[keyof StockTimeSeriesActionGroup];

export { stockTimeSeriesAction, StockTimeSeriesActionType, StockTimeSeriesActionGroup, StockTimeSeriesActionUnion };
