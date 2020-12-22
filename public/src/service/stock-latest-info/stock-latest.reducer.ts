import { FetchStatusEnum } from '../../utils/network-util';
import { RootAction } from '../root-store';
import { StockLatestInfoActionType, StockLatestInfoState } from './stock-latest-info.utils';

const defaultState: StockLatestInfoState = {
  latest: {
    data: null,
    fetchStatus: FetchStatusEnum.NEVER
  }
};

const stockLatestInfoReducer = (prevState: StockLatestInfoState = defaultState, action: RootAction): StockLatestInfoState => {
  switch (action.type) {
    case StockLatestInfoActionType.GET_LATEST: {
      return {
        ...prevState,
        latest: {
          ...prevState.latest,
          fetchStatus: FetchStatusEnum.PENDING
        }
      };
    }
    case StockLatestInfoActionType.SET_LATEST: {
      return {
        ...prevState,
        latest: {
          fetchStatus: FetchStatusEnum.SUCCESS,
          data: action.payload
        }
      };
    }
    default:
      return prevState;
  }
};

export { stockLatestInfoReducer };
