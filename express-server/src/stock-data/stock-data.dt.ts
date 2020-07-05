import { mapKeys, omit, flow, get, camelCase, replace } from 'lodash/fp';
import axios from 'axios';
import {
  TStockItemEntity,
  TStockItemResponse,
  TStockLatestResponse,
  TStockMetaDataEntity,
  TStockMetaDataResponse,
  TStockSeriesResponse,
} from '../typings/stock-data.type';
import { alphaApiBasicSettings } from '../common/constants';

const mapStockTimeEntity = mapKeys((key: string) => {
  if (key.includes('Time Series')) {
    return 'series';
  } else if (key.includes('Meta Data')) {
    return 'metaData';
  } else {
    return key;
  }
});

const numberSpaceReplaceFn1: (input: string) => string = flow(replace(/[0-9.]/gi)(''), camelCase);

export const fetchStockSeries = axios.create({
  ...alphaApiBasicSettings,

  transformResponse: (data: string): TStockSeriesResponse => {
    console.log(data);
    const parsedKey = mapStockTimeEntity(JSON.parse(data));
    const parsedMetaData = (flow(
      omit<TStockMetaDataEntity, keyof TStockMetaDataEntity>('4. Output Size'),
      mapKeys(numberSpaceReplaceFn1)
    )(parsedKey.metaData) as unknown) as TStockMetaDataResponse;
    const parsedSeries: Array<TStockItemResponse> = [];
    for (const [key, value] of Object.entries(parsedKey.series)) {
      parsedSeries.push({
        ...mapKeys(numberSpaceReplaceFn1)(value as TStockItemEntity),
        time: key,
      } as TStockItemResponse);
    }
    return {
      metaData: parsedMetaData,
      series: parsedSeries,
    };
  },
});

export const fetchStockLatest = axios.create({
  ...alphaApiBasicSettings,
  transformResponse: (data: string): TStockLatestResponse => {
    console.log(data);
    return flow(JSON.parse, get('Global Quote'), mapKeys(numberSpaceReplaceFn1))(data);
  },
});
