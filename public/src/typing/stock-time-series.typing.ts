type StockTimeSeriesUnit = {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: Date;
};

type StockTimeSeries = {
  metaData: {
    information: string;
    symbol: string;
    lastRefreshed: string;
    timeZone: string;
  };
  series: Array<StockTimeSeriesUnit>;
};

export { StockTimeSeriesUnit, StockTimeSeries };
