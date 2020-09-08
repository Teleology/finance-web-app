import axios from 'axios';
import { flow, get, mapKeys, map } from 'lodash/fp';
import { alphaApiBasicSettings } from '../common/constants';
import { TCompanyInfo } from '../typings/company-search.type';

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
};

export const fetchCompanies = axios.create({
  ...alphaApiBasicSettings,
  transformResponse: (data: string): Array<TCompanyInfo> =>
    flow(JSON.parse, get('bestMatches'), map(mapKeys((key: string) => mapCompanyInfoKey[key as keyof typeof mapCompanyInfoKey] ?? key)))(data)
});
