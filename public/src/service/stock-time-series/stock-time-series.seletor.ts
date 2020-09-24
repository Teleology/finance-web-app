import { map } from 'lodash';
import { createSelector } from 'reselect';
import { StockTimeSeriesState, StockTimeSeriesUnit, TimeChartDataUnit } from './stock-time-series.typing';

const stockTimeSeriesDataSelector = (state: StockTimeSeriesState): StockTimeSeriesState['series'] => state.series;

const stockTimeSeriesChartConverter = createSelector(
  stockTimeSeriesDataSelector,
  (series: StockTimeSeriesState['series']): Array<TimeChartDataUnit> => {
    if (series === null) return [];
    return map(series, (datum: StockTimeSeriesUnit) => ({ x: datum.time, y: datum.close }));
  }
);

export { stockTimeSeriesChartConverter };