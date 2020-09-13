import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { flow, get, mapKeys, map } from 'lodash/fp';
import { injectable } from 'inversify';
import { alphaApiBasicSettings } from '../common/network-utils';
import { ValueUnionOfObject } from '../common/type-utils';
import { AlphaFunction } from '../common/string-utils';

const mapCompanyInfoKey = {
  '1. symbol': 'symbol',
  '2. name': 'name',
  '3. type': 'type',
  '4. region': 'region',
  '5. marketOpen': 'marketOpen',
  '6. marketClose': 'marketClose',
  '7. timezone': 'timezone',
  '8. currency': 'currency',
  '9. matchScore': 'matchScore'
} as const;

type CompanyInfo = Record<ValueUnionOfObject<typeof mapCompanyInfoKey>, string>;

@injectable()
export class CompanySearchService {
  private axios: AxiosInstance;
  private transformCompanySearchResponse = flow(
    JSON.parse,
    get('bestMatches'),
    map(mapKeys((key: string) => mapCompanyInfoKey[key as keyof typeof mapCompanyInfoKey] ?? key))
  );

  constructor() {
    this.axios = axios.create({
      ...alphaApiBasicSettings,
      transformResponse: this.transformCompanySearchResponse.bind(this)
    });
  }

  public fetchCompanies(keywords: string): Promise<Array<CompanyInfo>> {
    return this.axios({ params: { function: AlphaFunction.SEARCH, keywords } }).then((response: AxiosResponse) => response.data);
  }
}
