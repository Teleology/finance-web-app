import * as React from 'react';
import { pick } from 'lodash';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@material-ui/core';
import { stockTimeSeriesAction } from '../../../service/stock-time-series/stock-time-series.action';
import { RootState } from '../../../service/root-store';
import { stockTimeSeriesChartConverter } from '../../../service/stock-time-series/stock-time-series.seletor';
import { LineChart } from '../../bottom-level/line-chart/line-chart.component';
import { Breadcrumb } from '../../bottom-level/app-chip.component';

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

  const handleBreadCrumbClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const period = e.currentTarget.dataset.period;
    console.log(period);
  }, []);

  // set LineChart's debounceTime to 0 if you want immediately updating
  return (
    <>
      <div>
        <Breadcrumbs>
          <Breadcrumb label="days" data-period="day" onClick={handleBreadCrumbClick} />
          <Breadcrumb label="weeks" data-period="week" onClick={handleBreadCrumbClick} />
          <Breadcrumb label="weeks" data-period="month" onClick={handleBreadCrumbClick} />
          <Breadcrumb label="weeks" data-period="year" onClick={handleBreadCrumbClick} />
        </Breadcrumbs>
      </div>
      <div style={{ minHeight: 200, height: '50vh', maxHeight: 800 }}>
        <LineChart data={series.data} />;
      </div>
    </>
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
