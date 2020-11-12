import { ReturnTypeOfGroup } from '../../utils/type-util';
import { CompanyInSearch } from './company-search-utils';

namespace CompanySearchActionType {
  export const GET_MATCHES = 'company-search/GET_MATCHES';
  export const GET_MATCHES_FAILURE = 'company-search/GET_MATCHES_FAILURE';
  export const SET_MATCHES = 'company-search/SET_MATCHES';
}

const setMatches = (matches: Array<CompanyInSearch>) =>
  ({
    type: CompanySearchActionType.SET_MATCHES,
    payload: {
      matches
    }
  } as const);

const companySearchAction = {
  setMatches
};

type CompanySearchActionGroup = ReturnTypeOfGroup<typeof companySearchAction>;
type CompanySearchActionUnion = CompanySearchActionGroup[keyof CompanySearchActionGroup];

export { companySearchAction, CompanySearchActionType, CompanySearchActionGroup, CompanySearchActionUnion };
