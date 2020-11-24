import { map } from 'lodash';
import { createSelector } from 'reselect';
import { StockTimeSeriesState, StockTimeSeriesUnit, TimeChartDataUnit } from './stock-time-series-utils';

const stockTimeSeriesDataSelector = (state: StockTimeSeriesState): StockTimeSeriesState['series']['data'] => state.series.data;

const stockTimeSeriesChartConverter = createSelector(
  stockTimeSeriesDataSelector,
  (series: StockTimeSeriesState['series']['data']): Array<TimeChartDataUnit> => {
    if (series === null) {
      return [];
    }
    return map(series, (datum: StockTimeSeriesUnit) => ({ x: datum.time, y: datum.close }));
  }
);

export { stockTimeSeriesChartConverter };
