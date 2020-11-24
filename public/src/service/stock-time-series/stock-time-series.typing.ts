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
  data: Array<StockTimeSeriesUnit>;
};

type StockTimeSeriesState = {
  series: {
    data: Array<StockTimeSeriesUnit> | null;
    metaData: StockTimeSeriesMeta | null;
    fetchStatus: FetchStatusEnum;
    period: PeriodEnum;
  };
};

type TimeChartDataUnit = { x: Date; y: number };

export { StockTimeSeries, StockTimeSeriesUnit, StockTimeSeriesMeta, StockTimeSeriesState, TimeChartDataUnit };
