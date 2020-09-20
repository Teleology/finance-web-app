import * as React from 'react';
import { pick } from 'lodash';
import * as dayjs from 'dayjs';
import { connect } from 'react-redux';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { stockTimeSeriesAction } from '../../service/stock-time-series/stock-time-series.action';
dayjs.extend(timezone);
dayjs.extend(utc);
const mapDispatch = pick<typeof stockTimeSeriesAction, 'getTimeSeries'>(stockTimeSeriesAction, ['getTimeSeries']);
type Props = typeof mapDispatch;
const TimeSeriesChart = ({ getTimeSeries }: Props): React.ReactElement => {
  React.useEffect(() => {
    getTimeSeries('IBM');
  }, [getTimeSeries]);
  return <div>line chart</div>;
};

const TimeSeriesChartContainer = connect(null, mapDispatch)(TimeSeriesChart);

export { TimeSeriesChartContainer };

console.log(dayjs('2014-06-01').tz('US/Eastern').toDate());
