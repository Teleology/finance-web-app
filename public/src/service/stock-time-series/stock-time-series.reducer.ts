import { RootAction } from '../root-store';
import { StockTimeSeries } from '../../typing/stock-time-series.typing';
import { Nullable } from '../../utils/type-util';
import { StockTimeSeriesActionType } from './stock-time-series.action';

type StockTimeSeriesState = Nullable<StockTimeSeries>;

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

export { stockTimeSeriesReducer };
