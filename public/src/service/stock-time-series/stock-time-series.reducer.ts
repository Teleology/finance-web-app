import { RootAction } from '../root-store';
import { FetchStatusEnum } from '../../utils/network-util';
import { PeriodEnum } from '../../utils/general-type';
import { StockTimeSeriesState } from './stock-time-series-utils';
import { StockTimeSeriesActionType } from './stock-time-series.action';

const defaultState: StockTimeSeriesState = {
  series: {
    metaData: null,
    data: null,
    period: PeriodEnum.DAY,
    fetchStatus: FetchStatusEnum.NEVER
  },
  latest: {
    data: null,
    fetchStatus: FetchStatusEnum.NEVER
  }
};

const stockTimeSeriesReducer = (prevState: StockTimeSeriesState = defaultState, action: RootAction): StockTimeSeriesState => {
  switch (action.type) {
    case StockTimeSeriesActionType.SET_LATEST: {
      return {
        ...prevState,
        latest: {
          fetchStatus: FetchStatusEnum.SUCCESS,
          data: action.payload
        }
      };
    }
    case StockTimeSeriesActionType.GET_TIME_SERIES: {
      return {
        ...prevState,
        series: {
          ...prevState.series,
          fetchStatus: FetchStatusEnum.PENDING
        }
      };
    }
    case StockTimeSeriesActionType.GET_TIME_SERIES_FAILURE: {
      return {
        ...prevState,
        series: {
          ...prevState.series,
          fetchStatus: FetchStatusEnum.FAIL
        }
      };
    }
    case StockTimeSeriesActionType.SET_TIME_SERIES: {
      return {
        ...prevState,
        series: {
          ...prevState.series,
          fetchStatus: FetchStatusEnum.SUCCESS,
          ...action.payload
        }
      };
    }

    case StockTimeSeriesActionType.SET_PERIOD: {
      return {
        ...prevState,
        series: {
          ...prevState.series,
          period: action.payload.period
        }
      };
    }

    default:
      return prevState;
  }
};

export { stockTimeSeriesReducer, StockTimeSeriesState };
