import { encode } from 'querystring';
import { mapKeys, omit, flow } from 'lodash/fp';
import axios from 'axios';
import { TStockItemEntity, TStockItemResponse, TStockMetaDataEntity, TStockMetaDataResponse, TStockResponse } from '../typings/stock-data.type';
import { browserHeaders } from '../common/constants';

const mapStockTimeEntity = mapKeys((key: string) => {
  if (key.includes('Time Series')) {
    return 'series';
  } else if (key.includes('Meta Data')) {
    return 'metaData';
  } else {
    return key;
  }
});

const mapStockItemOrMetaDataEntityKey = mapKeys((key: string) => {
  return key.replace(/[0-9.\s]/gi, '');
});

export const fetchStock = axios.create({
  method: 'GET',
  baseURL: 'https://www.alphavantage.co/query',
  headers: browserHeaders,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramsSerializer: (params: any) => encode({ apikey: 'C5TADQOPXWJ7BF35', ...params }),
  transformResponse: (data: string): TStockResponse => {
    const parsedKey = mapStockTimeEntity(JSON.parse(data));
    const parsedMetaData = (flow(
      omit<TStockMetaDataEntity, keyof TStockMetaDataEntity>('4. Output Size'),
      mapStockItemOrMetaDataEntityKey
    )(parsedKey.metaData) as unknown) as TStockMetaDataResponse;
    const parsedSeries: Array<TStockItemResponse> = [];
    for (const [key, value] of Object.entries(parsedKey.series)) {
      parsedSeries.push({
        ...mapStockItemOrMetaDataEntityKey(value as TStockItemEntity),
        time: key,
      } as TStockItemResponse);
    }
    return {
      metaData: parsedMetaData,
      series: parsedSeries,
    };
  },
});
