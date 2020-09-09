import { mapKeys, omit, flow, get, keys } from 'lodash/fp';
import axios, { AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import { alphaApiBasicSettings } from '../common/constants';
import { ValueUnionOfObject } from '../common/type-utils';

const metaKeyMapping = {
  '1. Information': 'information',
  '2. Symbol': 'symbol',
  '3. Last Refreshed': 'lastRefreshed',
  '4. Output Size': 'outputSize',
  '4. Time Zone': 'timeZone',
  '5. Time Zone': 'timeZone'
} as const;

const stockSeriesDatumKeyMapping = {
  '1. open': 'open',
  '2. high': 'high',
  '3. low': 'low',
  '4. close': 'close',
  '5. volume': 'volume'
} as const;

const stockLatestKeyMapping = {
  '01. symbol': 'symbol',
  '02. open': 'open',
  '03. high': 'high',
  '04. low': 'low',
  '05. price': 'price',
  '06. volume': 'volume',
  '07. latest trading day': 'latestTradingDay',
  '08. previous close': 'previousClose',
  '09. change': 'change',
  '10. change percent': 'changePercent'
} as const;

const fieldKeyMapping = {
  'Meta Data': 'metaData',
  'Time Series (Daily)': 'series',
  'Weekly Time Series': 'series',
  'Monthly Time Series': 'series',
  'Global Quote': 'globalQuote'
} as const;

type MetaContract = Record<ValueUnionOfObject<typeof metaKeyMapping>, string>;

type StockSeriesDatumContract = Record<ValueUnionOfObject<typeof stockSeriesDatumKeyMapping>, string> & { time: string };

type StockSeriesContract = {
  metaData: MetaContract;
  series: Array<StockSeriesDatumContract>;
};
type StockLatestContract = Record<ValueUnionOfObject<typeof stockLatestKeyMapping>, string>;

@injectable()
export class StockDataService {
  public fetchStockSeries: AxiosInstance;
  public fetchStockLatest: AxiosInstance;

  constructor() {
    this.fetchStockSeries = axios.create({
      ...alphaApiBasicSettings,
      transformResponse: this.transformStockSeriesResponse.bind(this)
    });
    this.fetchStockLatest = axios.create({
      ...alphaApiBasicSettings,
      transformResponse: this.transformStockLatestResponse.bind(this)
    });
  }

  private transformStockLatestResponse(input: string): StockLatestContract {
    return flow(
      JSON.parse,
      get('Global Quote'),
      mapKeys((key: string) => stockLatestKeyMapping[key as keyof typeof stockLatestKeyMapping] ?? key)
    )(input);
  }
  private transformStockSeriesResponse(input: string): StockSeriesContract {
    const parsedKey = flow(
      JSON.parse,
      mapKeys((key: string) => fieldKeyMapping[key as keyof typeof fieldKeyMapping] ?? key)
    )(input);
    const parsedMetaData = flow(
      get('metaData'),
      omit('4. Output Size'),
      mapKeys((key: string) => metaKeyMapping[key as keyof typeof metaKeyMapping] ?? key)
    )(parsedKey);
    const parsedSeries = flow(get('series'), this.transformStockSeriesObjectToArray)(parsedKey);
    return {
      metaData: parsedMetaData,
      series: parsedSeries
    } as StockSeriesContract;
  }

  private transformStockSeriesObjectToArray(input: Record<string, Omit<StockSeriesDatumContract, 'time'>>): Array<StockSeriesDatumContract> {
    return keys(input).map(
      (date: string) =>
        ({
          ...mapKeys((key: string) => stockSeriesDatumKeyMapping[key as keyof typeof stockSeriesDatumKeyMapping] ?? key)(input[date]),
          time: date
        } as StockSeriesDatumContract)
    );
  }
}
