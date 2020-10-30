import { RootAction } from '../root-store';
import { CompanyInSearch } from './company-search-utils';
import { CompanySearchActionType } from './company-search.action';

type CompanySearchState = {
  matches: Array<CompanyInSearch> | null;
};

// TODO: not persist ?
const defaultState: CompanySearchState = {
  matches: null
};

const companySearchReducer = (prevState: CompanySearchState = defaultState, action: RootAction): CompanySearchState => {
  switch (action.type) {
    case CompanySearchActionType.SET_MATCHES: {
      return {
        ...prevState,
        matches: action.payload.matches
      };
    }
    default: {
      return prevState;
    }
  }
};

export { companySearchReducer, CompanySearchState };
