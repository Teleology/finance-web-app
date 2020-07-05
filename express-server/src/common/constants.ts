import { encode } from 'querystring';
import { AxiosRequestConfig } from 'axios';

export enum AlphaFunction {
  DAILY = 'TIME_SERIES_DAILY',
  WEEKLY = 'TIME_SERIES_WEEKLY',
  MONTHLY = 'TIME_SERIES_MONTHLY',
  LATEST = 'GLOBAL_QUOTE',
  SEARCH = 'SYMBOL_SEARCH',
}

export const alphaApiBasicSettings: AxiosRequestConfig = {
  method: 'GET' as 'GET',
  baseURL: 'https://www.alphavantage.co/query',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramsSerializer: (params: any) => encode({ apikey: 'C5TADQOPXWJ7BF35', ...params }),
};

// headers: {
//   Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'en-US,en;q=0.9',
//     'Cache-Control': 'max-age=0',
//     Connection: 'keep-alive',
//     Cookie: '_ga=GA1.2.459230013.1593834881; _gid=GA1.2.668945523.1593834881; csrftoken=ofs7xpmHDywJdm1M1vjbkFGsOqZaCQ12nEnMvgFUbbWilKLiztzJaJZfjs5b5owC',
//     Host: 'www.alphavantage.co',
//     'Sec-Fetch-Dest': 'document',
//     'Sec-Fetch-Mode': 'navigate',
//     'Sec-Fetch-Site': 'none',
//     'Sec-Fetch-User': '?1',
//     'Upgrade-Insecure-Requests': '1',
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
// },
