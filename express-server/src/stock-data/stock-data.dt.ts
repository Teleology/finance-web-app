import { mapKeys, omit, flow, get } from 'lodash/fp';
import axios, { AxiosInstance } from 'axios';
import { injectable } from 'inversify';
import {
  TStockItemEntity,
  TStockItemResponse,
  TStockLatestResponse,
  TStockMetaDataEntity,
  TStockMetaDataResponse,
  TStockSeriesResponse,
} from '../typings/stock-data.type';
import { alphaApiBasicSettings } from '../common/constants';
import { numberSpaceReplaceFn1 } from '../common/utils';

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
      transformResponse: this.transformResponse,
    });
    this.fetchStockLatest = axios.create({
      ...alphaApiBasicSettings,
      transformResponse: (data: string): TStockLatestResponse => {
        console.log(data);
        return flow(JSON.parse, get('Global Quote'), mapKeys(numberSpaceReplaceFn1))(data);
      },
    });
  }

  private transformResponse = (input: string): TStockSeriesResponse => {
    console.log(input);
    const parsedKey = this.mapStockTimeEntity(JSON.parse(input));
    const parsedMetaData = this.transformStockMetaDataEntity(get('metaData')(parsedKey));
    const parsedSeries = this.transformStockSeriesObjectToArray(get('series')(parsedKey));
    return {
      metaData: parsedMetaData,
      series: parsedSeries,
    };
  };

  private transformStockSeriesObjectToArray = (input: Record<string, TStockItemEntity>): Array<TStockItemResponse> => {
    const ret: Array<TStockItemResponse> = [];
    for (const [key, value] of Object.entries(input)) {
      ret.push({
        ...mapKeys(numberSpaceReplaceFn1)(value),
        time: key,
      } as TStockItemResponse);
    }
    return ret;
  };
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
