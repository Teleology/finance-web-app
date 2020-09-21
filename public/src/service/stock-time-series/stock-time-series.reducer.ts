import { RootAction } from '../root-store';
import { StockTimeSeriesState } from './stock-time-series.typing';
import { StockTimeSeriesActionType } from './stock-time-series.action';

const defaultState: StockTimeSeriesState = {
  metaData: null,
  series: null
};

const stockTimeSeriesReducer = (prevState: StockTimeSeriesState = defaultState, action: RootAction): StockTimeSeriesState => {
  switch (action.type) {
    case StockTimeSeriesActionType.SET_TIME_SERIES: {
      return action.payload;
    }
    default:
      return prevState;
  }
};

export { stockTimeSeriesReducer, StockTimeSeriesState };
