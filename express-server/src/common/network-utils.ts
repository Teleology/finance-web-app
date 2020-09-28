import { encode } from 'querystring';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { assign, flow, get } from 'lodash/fp';

const baseURL = '/api/v1';

const alphaApiBasicSettings: AxiosRequestConfig = {
  method: 'GET',
  baseURL: 'https://www.alphavantage.co/query',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramsSerializer: flow(assign({ apikey: 'C5TADQOPXWJ7BF35' }), encode)
  // paramsSerializer: (params: any) => encode({ apikey: 'C5TADQOPXWJ7BF35', ...params })
};

const fcsApiBasicSettings: AxiosRequestConfig = {
  method: 'GET',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  paramsSerializer: flow(assign({ access_key: 'fJdJdNzONFfvCJKow8BFU8OzuuxRAqVVI2BG24PhGrH0HEIcPR' }), encode)
};

const getAxiosData = get<AxiosResponse, 'data'>('data');

export { alphaApiBasicSettings, baseURL, fcsApiBasicSettings, getAxiosData };
