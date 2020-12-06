import * as React from 'react';
import { pick } from 'lodash';
import { flow } from 'lodash/fp';
import { connect } from 'react-redux';
import { Breadcrumbs, CardContent, CardHeader, Grid } from '@material-ui/core';
import { Assessment as AssessmentIcon, ShowChart as ShowChartIcon } from '@material-ui/icons';
import { stockTimeSeriesAction } from '../../../service/stock-time-series/stock-time-series.action';
import { RootState } from '../../../service/root-store';
import { stockLatestConverter, stockTimeSeriesChartConverter } from '../../../service/stock-time-series/stock-time-series.seletor';
import { LineChart } from '../../bottom-level/visualization/line-chart/line-chart.component';
import { Breadcrumb } from '../../bottom-level/app-chip.component';
import { PeriodEnum } from '../../../utils/type-util';
import { formatMoney, formatPercentChange, formatWithSign } from '../../../utils/formatter';
import {
  BackgroundColorfulFormattedTypography,
  ColorfulFormattedTypography,
  FormattedTypography
} from '../../bottom-level/marked-text/marked-typography.component';
import { Loader } from '../../bottom-level/loading-content/loading-content.component';
import { FetchStatusEnum } from '../../../utils/network-util';
import { emptyIconProps } from '../../common-props';
import { TimeChartDataUnit } from '../../../service/stock-time-series/stock-time-series-utils';
import { useCardContentStyles } from '../../common-styles';
import styles from './time-series-chart.styles';

const mapDispatch = pick<typeof stockTimeSeriesAction, 'getTimeSeries' | 'setPeriod' | 'getLatest'>(stockTimeSeriesAction, [
  'getTimeSeries',
  'setPeriod',
  'getLatest'
]);
const mapState = ({ stockTimeSeries, companyCollection }: RootState) =>
  ({
    series: {
      fetchStatus: stockTimeSeries.series.fetchStatus,
      data: stockTimeSeriesChartConverter(stockTimeSeries),
      period: stockTimeSeries.series.period
    },
    latest: {
      fetchStatus: stockTimeSeries.latest.fetchStatus,
      data: stockLatestConverter(stockTimeSeries)
    },
    company: companyCollection.collection.value
  } as const);

type Props = typeof mapDispatch & ReturnType<typeof mapState>;
const StockTimeSeriesChart = (props: Props): React.ReactElement => {
  const cardContentStyles = useCardContentStyles(),
    chartContainerStyles = styles.useChartContainerStyles().root;
  const { getTimeSeries, series, company, setPeriod, getLatest, latest } = props;
  React.useEffect(() => {
    if (company !== null) {
      getTimeSeries(company, series.period);
      getLatest(company);
    }
  }, [getTimeSeries, company, series.period, getLatest]);

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
      <Loader<Props['latest']['data'], NonNullable<Props['latest']['data']>>
        load={{
          on: latest.fetchStatus === FetchStatusEnum.PENDING || latest.fetchStatus === FetchStatusEnum.NEVER
        }}
        empty={{
          props: {
            icon: <AssessmentIcon {...emptyIconProps} />,
            text: 'sorry, we cannot find any stock data related to the company you choose'
          }
        }}
        data={latest.data}
      >
        {(latestData: NonNullable<Props['latest']['data']>): React.ReactElement => (
          <CardHeader
            title={latest.data?.symbol}
            titleTypographyProps={{ variant: 'h2', gutterBottom: true }}
            subheader={
              <Grid direction="row" container={true} spacing={1} alignItems="center">
                <Grid item={true}>
                  <FormattedTypography variant="h3" format={formatMoney}>
                    {latestData.price}
                  </FormattedTypography>
                </Grid>
                <Grid item={true}>
                  <BackgroundColorfulFormattedTypography variant="h5" tint="#137333" format={formatPercentChange}>
                    {latestData.changePercent}
                  </BackgroundColorfulFormattedTypography>
                </Grid>
                <Grid item={true}>
                  <ColorfulFormattedTypography variant="h5" tint="#137333" format={flow(formatWithSign, (n: string) => n + ' Today')}>
                    {latestData.change}
                  </ColorfulFormattedTypography>
                </Grid>
              </Grid>
            }
          />
        )}
      </Loader>
      <CardContent classes={cardContentStyles}>
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

        <div className={chartContainerStyles}>
          <Loader
            data={series.data}
            load={{ on: series.fetchStatus === FetchStatusEnum.PENDING || series.fetchStatus === FetchStatusEnum.NEVER }}
            empty={{ props: { icon: <ShowChartIcon {...emptyIconProps} />, text: 'Sorry, we cannot find the time line chart' } }}
          >
            {(data: Array<TimeChartDataUnit>): React.ReactElement => <LineChart data={data} />}
          </Loader>
        </div>
      </CardContent>
    </>
  );
};

const StockTimeSeriesChartContainer = connect(mapState, mapDispatch)(StockTimeSeriesChart);

export { StockTimeSeriesChartContainer };
