import * as React from 'react';
import { connect } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';
import { RootState } from '../../../service/root-store';
import { stockTimeSeriesChartConverter } from '../../../service/stock-time-series/stock-time-series.seletor';
import { LineChart } from '../../common/visualization/line-chart/line-chart.component';
const mapState = (state: RootState) =>
  ({
    fetchStatus: state.stockTimeSeries.series.fetchStatus,
    data: stockTimeSeriesChartConverter(state.stockTimeSeries),
    period: state.stockTimeSeries.series.period
  } as const);
type Props = ReturnType<typeof mapState>;

/*
  <Card>
    <CardHeader title="My Watch List" />
    <CardContent>
      <Button variant="contained" color="default" endIcon={<Add />}>
        Google
      </Button>
    </CardContent>
  </Card>
 */
const CompanyComparison = (props: Props): React.ReactElement => {
  const { data } = props;
  return <>{!_isEmpty(data) && <LineChart data={data} />}</>;
};

const CompanyComparisonContainer = connect(mapState, {})(CompanyComparison);
export { CompanyComparisonContainer };
