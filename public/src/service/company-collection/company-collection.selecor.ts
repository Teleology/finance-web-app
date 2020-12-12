import { createSelector } from 'reselect';
import { find } from 'lodash';
import { RootState } from '../root-store';
import { LabelText } from '../../utils/type-util';
const activeCompanySelector = createSelector(
  (state: RootState) => state.companyCollection.collectionList,
  (state: RootState) => state.companyCollection.activeSymbol,
  (list: Array<LabelText<string>>, value: string | null) => find(list, (company: LabelText<string>) => company.value === value)
);

export { activeCompanySelector };
