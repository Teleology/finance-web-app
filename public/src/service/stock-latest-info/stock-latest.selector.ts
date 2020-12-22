import { createSelector } from 'reselect';
import { StockLatestInfoState } from './stock-latest-info.utils';

const stockLatestDataSelector = (state: StockLatestInfoState): StockLatestInfoState['latest']['data'] => state.latest.data;

const stockLatestConverter = createSelector(stockLatestDataSelector, (latest: StockLatestInfoState['latest']['data']) => {
  if (latest === null) {
    return null;
  }
  const change = latest.previousClose - latest.price;
  return {
    ...latest,
    change,
    changePercent: change / latest.price
  };
});

export { stockLatestConverter };
