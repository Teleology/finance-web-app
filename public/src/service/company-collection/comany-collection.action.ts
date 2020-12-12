import { LabelText, ReturnTypeOfGroup } from '../../utils/type-util';

namespace CompanyCollectionActionType {
  export const ADD_COMPANY = 'company-collection/ADD_COMPANY';
  export const REMOVE_COMPANY = 'company-collection/REMOVE_COMPANY';
}

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

const companyCollectionAction = {
  addCompany,
  removeCompany
};

type CompanyCollectionActionGroup = ReturnTypeOfGroup<typeof companyCollectionAction>;
type CompanyCollectionActionUnion = CompanyCollectionActionGroup[keyof CompanyCollectionActionGroup];

export { companyCollectionAction, CompanyCollectionActionType, CompanyCollectionActionGroup, CompanyCollectionActionUnion };
