import { createSelector } from 'reselect';
import { find as _find } from 'lodash';
import { flow } from 'lodash/fp';
import { RootState } from '../root-store';
import { formatLargeNumber, formatLargeMoney } from '../../utils/formatter';
import { LabelText } from '../../utils/type-util';
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

const isCollectedCompanySelector = createSelector(
  (state: RootState) => state.companyInfo.detail.data?.symbol,
  (state: RootState) => state.companyCollection.collectionList,
  (value: string | undefined, collectionList: Array<LabelText<string>>) => {
    const target = _find<LabelText<string>>(collectionList, { value });
    return target !== undefined;
  }
);

export { companyDetailSelector, isCollectedCompanySelector };
