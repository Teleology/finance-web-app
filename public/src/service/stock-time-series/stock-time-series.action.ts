import { StockTimeSeries } from '../../typing/stock-time-series.typing';
import { ReturnTypeOfGroup } from '../../utils/type-util';

namespace StockTimeSeriesActionType {
  export const GET_TIME_SERIES = 'stock-time-series/GET_TIME_SERIES_DATA';
  export const SET_TIME_SERIES = 'stock-time-series/SET_TIME_SERIES_DATA';
}

const getTimeSeries = () =>
  ({
    type: StockTimeSeriesActionType.GET_TIME_SERIES
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
