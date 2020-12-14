import { LabelText, ReturnTypeOfGroup } from '../../utils/type-util';
import { CompanyCollectionActionType } from './company-collection.util';

const addCompany = (company: LabelText<string>) =>
  ({
    type: CompanyCollectionActionType.ADD_COMPANY,
    payload: {
      company
    }
  } as const);

const removeCompany = (company: LabelText<string>) =>
  ({
    type: CompanyCollectionActionType.REMOVE_COMPANY,
    payload: {
      company
    }
  } as const);

const setActiveCompany = (symbol: string) =>
  ({
    type: CompanyCollectionActionType.SET_ACTIVE_COMPANY,
    payload: {
      symbol
    }
  } as const);
const companyCollectionAction = {
  addCompany,
  removeCompany,
  setActiveCompany
};

type CompanyCollectionActionGroup = ReturnTypeOfGroup<typeof companyCollectionAction>;
type CompanyCollectionActionUnion = CompanyCollectionActionGroup[keyof CompanyCollectionActionGroup];

export { companyCollectionAction, CompanyCollectionActionGroup, CompanyCollectionActionUnion };
