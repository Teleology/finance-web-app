import axios from 'axios';
import { flow, get, mapKeys, map } from 'lodash/fp';
import { alphaApiBasicSettings } from '../common/constants';
import { ValueUnionOfObject } from '../common/type-utils';

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

// TODO: transform to service injection
export const fetchCompanies = axios.create({
  ...alphaApiBasicSettings,
  transformResponse: (data: string): Array<CompanyInfo> =>
    flow(JSON.parse, get('bestMatches'), map(mapKeys((key: string) => mapCompanyInfoKey[key as keyof typeof mapCompanyInfoKey] ?? key)))(data)
});
