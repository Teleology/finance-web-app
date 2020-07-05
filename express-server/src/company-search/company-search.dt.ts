import axios from 'axios';
import { flow, get, mapKeys, map } from 'lodash/fp';
import { alphaApiBasicSettings } from '../common/constants';
import { CompanyInfo } from '../typings/company-search.type';
import { numberSpaceReplaceFn1 } from '../common/utils';
export const fetchCompanies = axios.create({
  ...alphaApiBasicSettings,
  transformResponse: (data: string): Array<CompanyInfo> => {
    return flow(JSON.parse, get('bestMatches'), map(mapKeys(numberSpaceReplaceFn1)))(data);
  },
});
