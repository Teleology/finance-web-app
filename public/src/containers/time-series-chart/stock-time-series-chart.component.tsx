import * as React from 'react';
import { pick, isEmpty } from 'lodash';
import { connect } from 'react-redux';

import { stockTimeSeriesAction } from '../../service/stock-time-series/stock-time-series.action';
import { RootState } from '../../service/root-store';
import { stockTimeSeriesChartConverter } from '../../service/stock-time-series/stock-time-series.seletor';
import { LineChart } from '../../components/line-chart/line-chart.component';

const mapDispatch = pick<typeof stockTimeSeriesAction, 'getTimeSeries'>(stockTimeSeriesAction, ['getTimeSeries']);
const mapState = ({ stockTimeSeries, companySelection }: RootState) =>
  ({
    series: stockTimeSeriesChartConverter(stockTimeSeries),
    selectedCompany: companySelection.company.value
  } as const);
type Props = typeof mapDispatch & ReturnType<typeof mapState>;
const StockTimeSeriesChart = ({ getTimeSeries, series, selectedCompany }: Props): React.ReactElement => {
  React.useEffect(() => {
    !isEmpty(selectedCompany) && getTimeSeries(selectedCompany);
  }, [getTimeSeries, selectedCompany]);
  return <LineChart data={series} />;
};

const StockTimeSeriesChartContainer = connect(mapState, mapDispatch)(StockTimeSeriesChart);

export { StockTimeSeriesChartContainer };
