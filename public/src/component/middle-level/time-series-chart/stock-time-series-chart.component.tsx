import * as React from 'react';
import { pick, reverse } from 'lodash';
import { connect } from 'react-redux';
import { Breadcrumbs } from '@material-ui/core';
import { bisector } from 'd3-array';
import { stockTimeSeriesAction } from '../../../service/stock-time-series/stock-time-series.action';
import { RootState } from '../../../service/root-store';
import { stockTimeSeriesChartConverter } from '../../../service/stock-time-series/stock-time-series.seletor';
import { LineChart } from '../../bottom-level/line-chart/line-chart.component';
import { Breadcrumb } from '../../bottom-level/app-chip.component';
import { PeriodEnum } from '../../../utils/general-type';
import styles from './time-series-chart.styles';
const bisectDate = bisector((datum): Date => datum.x).left;
const mapDispatch = pick<typeof stockTimeSeriesAction, 'getTimeSeries' | 'setPeriod'>(stockTimeSeriesAction, ['getTimeSeries', 'setPeriod']);
const mapState = ({ stockTimeSeries, companyCollection }: RootState) => {
  const data = stockTimeSeriesChartConverter(stockTimeSeries);
  if (data[10] !== undefined) {
    const xxx = reverse(data);
    console.log(bisectDate(xxx, xxx[10].x));
  }
  return {
    series: {
      fetchStatus: stockTimeSeries.fetchStatus,
      data,
      period: stockTimeSeries.period
    },
    company: companyCollection.collection.value
  } as const;
};
type Props = typeof mapDispatch & ReturnType<typeof mapState>;
const StockTimeSeriesChart = (props: Props): React.ReactElement => {
  const { getTimeSeries, series, company, setPeriod } = props;
  React.useEffect(() => {
    company !== null && getTimeSeries(company, series.period);
  }, [getTimeSeries, company, series.period]);

  const handleBreadCrumbClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const period = e.currentTarget.dataset.period;
      period !== undefined && setPeriod(period as PeriodEnum);
    },
    [setPeriod]
  );

  // set LineChart's debounceTime to 0 if you want immediately updating
  return (
    <>
      <Breadcrumbs>
        <Breadcrumb
          label="days"
          data-period={PeriodEnum.DAY}
          onClick={handleBreadCrumbClick}
          classes={styles.useBreadcrumbStyles({ isSelected: series.period === PeriodEnum.DAY })}
        />
        <Breadcrumb
          label="weeks"
          data-period={PeriodEnum.WEEK}
          onClick={handleBreadCrumbClick}
          classes={styles.useBreadcrumbStyles({ isSelected: series.period === PeriodEnum.WEEK })}
        />
        <Breadcrumb
          label="months"
          data-period={PeriodEnum.MONTH}
          onClick={handleBreadCrumbClick}
          classes={styles.useBreadcrumbStyles({ isSelected: series.period === PeriodEnum.MONTH })}
        />
      </Breadcrumbs>
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
