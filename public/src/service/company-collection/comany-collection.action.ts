import { LabelText, ReturnTypeOfGroup } from '../../utils/type-util';

namespace CompanyCollectionActionType {
  export const ADD_COMPANY = 'company-collection/ADD_COMPANY';
}

const addCompany = (company: LabelText<string>) =>
  ({
    type: CompanyCollectionActionType.ADD_COMPANY,
    value: {
      company
    }
  } as const);

const companyCollectionAction = {
  addCompany
};

type CompanyCollectionActionGroup = ReturnTypeOfGroup<typeof companyCollectionAction>;
type CompanyCollectionActionUnion = CompanyCollectionActionGroup[keyof CompanyCollectionActionGroup];

export { companyCollectionAction, CompanyCollectionActionGroup, CompanyCollectionActionUnion };
