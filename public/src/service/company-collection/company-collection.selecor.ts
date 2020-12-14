import { createSelector } from 'reselect';
import { find as _find } from 'lodash';
import { map as fpMap } from 'lodash/fp';
import { RootState } from '../root-store';
import { LabelText } from '../../utils/type-util';
const activeCompanySelector = createSelector(
  (state: RootState) => state.companyCollection.collectionList,
  (state: RootState) => state.companyCollection.activeSymbol,
  (list: Array<LabelText<string>>, value: string | null) => _find(list, (company: LabelText<string>) => company.value === value)
);

const companySymbolListSelector = createSelector(
  (state: RootState) => state.companyCollection.collectionList,
  fpMap((company: LabelText<string>) => company.value)
);

export { activeCompanySelector, companySymbolListSelector };
