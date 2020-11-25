import { createSelector } from 'reselect';
import { flow } from 'lodash/fp';
import { RootState } from '../root-store';
import { formatLargeNumber, formatLargeMoney } from '../../utils/formatter';
import { CompanyDetail } from './company-info-util';
const companyDetailSelector = createSelector(
  (state: RootState) => state.companyInfo.detail.data,
  (detail: CompanyDetail | null) => {
    if (detail === null) {
      return null;
    }
    const formatStringMoney = flow(parseFloat, formatLargeMoney);
    const marketCapitalization = formatStringMoney(detail.marketCapitalization);
    const fullTimeEmployees = flow(parseInt, formatLargeNumber)(detail.fullTimeEmployees);
    const ebitda = formatStringMoney(detail.ebitda);
    return {
      ...detail,
      marketCapitalization,
      fullTimeEmployees,
      ebitda
    };
  }
);

export { companyDetailSelector };
