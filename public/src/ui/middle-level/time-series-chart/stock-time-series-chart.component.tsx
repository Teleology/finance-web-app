import * as React from 'react';
import { pick } from 'lodash';
import { connect } from 'react-redux';

import { stockTimeSeriesAction } from '../../../service/stock-time-series/stock-time-series.action';
import { RootState } from '../../../service/root-store';
import { stockTimeSeriesChartConverter } from '../../../service/stock-time-series/stock-time-series.seletor';
import { LineChart } from '../../bottom-level/line-chart/line-chart.component';

const mapDispatch = pick<typeof stockTimeSeriesAction, 'getTimeSeries'>(stockTimeSeriesAction, ['getTimeSeries']);
const mapState = ({ stockTimeSeries, companyCollection }: RootState) =>
  ({
    series: stockTimeSeriesChartConverter(stockTimeSeries),
    company: companyCollection.collection.value
  } as const);
type Props = typeof mapDispatch & ReturnType<typeof mapState>;
const StockTimeSeriesChart = ({ getTimeSeries, series, company }: Props): React.ReactElement => {
  React.useEffect(() => {
    company !== null && getTimeSeries(company);
  }, [getTimeSeries, company]);
  return <LineChart data={series} />;
};

const StockTimeSeriesChartContainer = connect(mapState, mapDispatch)(StockTimeSeriesChart);

export { StockTimeSeriesChartContainer };
