import { Nullable } from '../../utils/type-util';

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

type StockTimeSeriesState = Nullable<StockTimeSeries>;

type TimeChartDataUnit = { x: Date; y: number };

export { StockTimeSeries, StockTimeSeriesUnit, StockTimeSeriesMeta, StockTimeSeriesState, TimeChartDataUnit };
