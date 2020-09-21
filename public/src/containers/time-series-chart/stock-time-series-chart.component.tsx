import * as React from 'react';
import { pick } from 'lodash';
import * as dayjs from 'dayjs';
import { connect } from 'react-redux';

import { stockTimeSeriesAction } from '../../service/stock-time-series/stock-time-series.action';
import { RootState } from '../../service/root-store';
import { stockTimeSeriesChartConverter } from '../../service/stock-time-series/stock-time-series.seletor';
import { LineChart } from '../../components/line-chart/line-chart.component';

const mapDispatch = pick<typeof stockTimeSeriesAction, 'getTimeSeries'>(stockTimeSeriesAction, ['getTimeSeries']);
const mapState = ({ stockTimeSeries }: RootState) =>
  ({
    series: stockTimeSeriesChartConverter(stockTimeSeries)
  } as const);
type Props = typeof mapDispatch & ReturnType<typeof mapState>;
const StockTimeSeriesChart = ({ getTimeSeries, series }: Props): React.ReactElement => {
  React.useEffect(() => {
    getTimeSeries('IBM');
  }, [getTimeSeries]);
  return <LineChart data={series} />;
};

const StockTimeSeriesChartContainer = connect(mapState, mapDispatch)(StockTimeSeriesChart);

export { StockTimeSeriesChartContainer };

console.log(dayjs('2014-06-01').tz('US/Eastern').toDate());
