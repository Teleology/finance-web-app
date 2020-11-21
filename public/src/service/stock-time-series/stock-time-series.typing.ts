import { Nullable } from '../../utils/type-util';
import { FetchStatusEnum } from '../../utils/network-util';
import { PeriodEnum } from '../../utils/general-type';

type StockTimeSeriesUnit = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: Date;
};

type StockTimeSeriesMeta = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  timeZone: string;
};

type StockTimeSeries = {
  metaData: StockTimeSeriesMeta;
  series: Array<StockTimeSeriesUnit>;
};

type StockTimeSeriesState = Nullable<StockTimeSeries> & { fetchStatus: FetchStatusEnum; period: PeriodEnum };

type TimeChartDataUnit = { x: Date; y: number };

export { StockTimeSeries, StockTimeSeriesUnit, StockTimeSeriesMeta, StockTimeSeriesState, TimeChartDataUnit };
