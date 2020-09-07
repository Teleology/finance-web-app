import { mapKeys, omit, flow, get } from 'lodash/fp';
import axios, { AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import {
  TStockItemEntity,
  TStockItemResponse,
  TStockLatestResponse,
  TStockMetaDataEntity,
  TStockMetaDataResponse,
  TStockSeriesResponse
} from '../typings/stock-data.type';
import { alphaApiBasicSettings } from '../common/constants';
import { numberSpaceReplaceFn1 } from '../common/utils';
import { ValueUnionOfObject } from '../common/type-utils';

const metaKeyMapping = {
  '1. Information': 'information',
  '2. Symbol': 'symbol',
  '3. Last Refreshed': 'lastRefreshed',
  '4. Output Size': 'outputSize',
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
type StockSeriesDatumContract = Record<ValueUnionOfObject<typeof stockSeriesDatumKeyMapping>, string>;
type StockSeriesContract = {
  metaData: MetaContract;
  series: Array<StockSeriesDatumContract>;
};
type StockLatestContract = Record<ValueUnionOfObject<typeof stockLatestKeyMapping>, string>;

@injectable()
export class StockDataService {
  public fetchStockSeries: AxiosInstance;
  public fetchStockLatest: AxiosInstance;

  private mapStockTimeEntity: (input: object) => object = mapKeys((key: string) => {
    if (key.includes('Time Series')) {
      return 'series';
    } else if (key.includes('Meta Data')) {
      return 'metaData';
    } else {
      return key;
    }
  });

  // @ts-ignore
  private transformStockMetaDataEntity: (input: TStockMetaDataEntity) => TStockMetaDataResponse = flow(
    omit<TStockMetaDataEntity, keyof TStockMetaDataEntity>('4. Output Size'),
    mapKeys(numberSpaceReplaceFn1)
  );

  constructor() {
    this.fetchStockSeries = axios.create({
      ...alphaApiBasicSettings,
      transformResponse: this.transformResponse.bind(this)
    });
    this.fetchStockLatest = axios.create({
      ...alphaApiBasicSettings,
      transformResponse: (data: string): TStockLatestResponse => {
        console.log(data);
        return flow(JSON.parse, get('Global Quote'), mapKeys(numberSpaceReplaceFn1))(data);
      }
    });
  }

  private transformResponse(input: string): TStockSeriesResponse {
    console.log(input);
    const parsedKey = this.mapStockTimeEntity(JSON.parse(input));
    const parsedMetaData = this.transformStockMetaDataEntity(get('metaData')(parsedKey));
    const parsedSeries = this.transformStockSeriesObjectToArray(get('series')(parsedKey));
    return {
      metaData: parsedMetaData,
      series: parsedSeries
    };
  }

  private transformStockSeriesObjectToArray(input: Record<string, TStockItemEntity>): Array<TStockItemResponse> {
    const ret: Array<TStockItemResponse> = [];
    for (const [key, value] of Object.entries(input)) {
      ret.push({
        ...mapKeys(numberSpaceReplaceFn1)(value),
        time: key
      } as TStockItemResponse);
    }
    return ret;
  }
}
// const mapStockTimeEntity = mapKeys((key: string) => {
//   if (key.includes('Time Series')) {
//     return 'series';
//   } else if (key.includes('Meta Data')) {
//     return 'metaData';
//   } else {
//     return key;
//   }
// });
//
// export const fetchStockSeries = axios.create({
//   ...alphaApiBasicSettings,
//
//   transformResponse: (data: string): TStockSeriesResponse => {
//     console.log(data);
//     const parsedKey = mapStockTimeEntity(JSON.parse(data));
//     const parsedMetaData = (flow(
//       omit<TStockMetaDataEntity, keyof TStockMetaDataEntity>('4. Output Size'),
//       mapKeys(numberSpaceReplaceFn1)
//     )(parsedKey.metaData) as unknown) as TStockMetaDataResponse;
//     const parsedSeries: Array<TStockItemResponse> = [];
//     for (const [key, value] of Object.entries(parsedKey.series)) {
//       parsedSeries.push({
//         ...mapKeys(numberSpaceReplaceFn1)(value as TStockItemEntity),
//         time: key,
//       } as TStockItemResponse);
//     }
//     return {
//       metaData: parsedMetaData,
//       series: parsedSeries,
//     };
//   },
// });
//
// export const fetchStockLatest = axios.create({
//   ...alphaApiBasicSettings,
//   transformResponse: (data: string): TStockLatestResponse => {
//     console.log(data);
//     return flow(JSON.parse, get('Global Quote'), mapKeys(numberSpaceReplaceFn1))(data);
//   },
// });
