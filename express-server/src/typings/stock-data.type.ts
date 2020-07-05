export type TStockQuery = {
  symbol: string;
};
export type TStockIntradayQuery = {
  interval: string;
} & TStockQuery;

export type TStockMetaDataEntity = {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size'?: string;
  '5. Time Zone': string;
};

export type TStockMetaDataResponse = {
  information: string;
  symbol: string;
  lastRefreshed: string;
  timeZone: string;
};

export type TStockItemEntity = {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
};

export type TStockItemResponse = {
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  time: string;
};

export type TStockDailyEntity = {
  'Meta Data': TStockMetaDataEntity;
  'Time Series (Daily)': Array<TStockItemEntity>;
};

export type TStockWeeklyEntity = {
  'Meta Data': TStockMetaDataEntity;
  'Weekly Time Series': Array<TStockItemEntity>;
};

export type TStockMonthlyEntity = {
  'Meta Data': TStockMetaDataEntity;
  'Monthly Time Series': Array<TStockItemEntity>;
};

export type TStockSeriesResponse = {
  metaData: TStockMetaDataResponse;
  series: Array<TStockItemResponse>;
};

export type TStockLatestResponse = {
  symbol: string;
  open: string;
  high: string;
  low: string;
  price: string;
  volume: string;
  latestTradingDay: string;
  previousClose: string;
  change: string;
  changePercent: string;
};
