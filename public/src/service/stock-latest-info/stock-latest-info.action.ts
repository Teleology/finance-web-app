import { LatestStock } from '../stock-time-series/stock-time-series-utils';
import { ReturnTypeOfGroup } from '../../utils/type-util';
import { StockLatestInfoActionType } from './stock-latest-info.utils';

const getLatest = (symbol: string) =>
  ({
    type: StockLatestInfoActionType.GET_LATEST,
    payload: { symbol }
  } as const);

const setLatest = (latestStock: LatestStock) =>
  ({
    type: StockLatestInfoActionType.SET_LATEST,
    payload: latestStock
  } as const);

const stockLatestInfoAction = {
  getLatest,
  setLatest
};

type StockLatestInfoActionGroup = ReturnTypeOfGroup<typeof stockLatestInfoAction>;
type StockLatestInfoActionUnion = StockLatestInfoActionGroup[keyof StockLatestInfoActionGroup];

export { stockLatestInfoAction, StockLatestInfoActionGroup, StockLatestInfoActionUnion };
