import { FetchStatusEnum } from '../../utils/network-util';
import { LatestStock } from '../stock-time-series/stock-time-series-utils';

namespace StockLatestInfoActionType {
  export const GET_LATEST = 'stock-time-series/GET_LATEST';
  export const SET_LATEST = 'stock-time-series/SET_LATEST';
}

type StockLatestInfoState = {
  latest: {
    data: LatestStock | null;
    fetchStatus: FetchStatusEnum;
  };
};

type LatestStockContract = {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePercent: string;
};

export { StockLatestInfoActionType, StockLatestInfoState, LatestStockContract };
