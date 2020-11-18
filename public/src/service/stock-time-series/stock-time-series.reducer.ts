import { RootAction } from '../root-store';
import { FetchStatusEnum } from '../../utils/network-util';
import { StockTimeSeriesState } from './stock-time-series.typing';
import { StockTimeSeriesActionType } from './stock-time-series.action';

const defaultState: StockTimeSeriesState = {
  metaData: null,
  series: null,
  fetchStatus: FetchStatusEnum.NEVER
};

const stockTimeSeriesReducer = (prevState: StockTimeSeriesState = defaultState, action: RootAction): StockTimeSeriesState => {
  switch (action.type) {
    case StockTimeSeriesActionType.GET_TIME_SERIES: {
      return {
        ...prevState,
        fetchStatus: FetchStatusEnum.PENDING
      };
    }
    case StockTimeSeriesActionType.GET_TIME_SERIES_FAILURE: {
      return {
        ...prevState,
        fetchStatus: FetchStatusEnum.FAIL
      };
    }
    case StockTimeSeriesActionType.SET_TIME_SERIES: {
      return {
        fetchStatus: FetchStatusEnum.SUCCESS,
        ...action.payload
      };
    }
    default:
      return prevState;
  }
};

export { stockTimeSeriesReducer, StockTimeSeriesState };
