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
    series: {
      fetchStatus: stockTimeSeries.fetchStatus,
      data: stockTimeSeriesChartConverter(stockTimeSeries)
    },
    company: companyCollection.collection.value
  } as const);
type Props = typeof mapDispatch & ReturnType<typeof mapState>;
const StockTimeSeriesChart = ({ getTimeSeries, series, company }: Props): React.ReactElement => {
  React.useEffect(() => {
    company !== null && getTimeSeries(company);
  }, [getTimeSeries, company]);
  // set LineChart's debounceTime to 0 if you want immediately updating
  return (
    <div style={{ minHeight: 200, height: '50vh', maxHeight: 800 }}>
      <LineChart data={series.data} />;
    </div>
  );
};

// const emptyCompanyBranch = branch(
//   ({ company }: Props) => company === null,
//   renderComponent(() => <EmptyContent text="Please favorite a company first" icon={<LocationCityIcon />} />)
// );
//
// const emptySeriesBranch = branch(
//   ({ series }: Props) => series === null,
//   renderComponent(() => <EmptyContent icon={<LocationCityIcon />} text="Sorry, we can't find the company you favorite" />)
// );

// const loadingBranch = branch(({ series }: Props) => series.fetchStatus === FetchStatusEnum.PENDING, renderComponent(LoadingContent));

const StockTimeSeriesChartContainer = connect(mapState, mapDispatch)(StockTimeSeriesChart);

export { StockTimeSeriesChartContainer };
