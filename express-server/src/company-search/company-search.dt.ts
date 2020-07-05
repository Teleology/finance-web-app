import axios from 'axios';
import { flow, get, mapKeys, map } from 'lodash/fp';
import { alphaApiBasicSettings } from '../common/constants';
import { TCompanyInfo } from '../typings/company-search.type';
import { numberSpaceReplaceFn1 } from '../common/utils';
export const fetchCompanies = axios.create({
  ...alphaApiBasicSettings,
  transformResponse: (data: string): Array<TCompanyInfo> => {
    return flow(JSON.parse, get('bestMatches'), map(mapKeys(numberSpaceReplaceFn1)))(data);
  },
});
