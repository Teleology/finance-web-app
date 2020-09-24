import { LabelText, ReturnTypeOfGroup } from '../../utils/type-util';

namespace CompanyCollectionActionType {
  export const ADD_COMPANY = 'company-collection/ADD_COMPANY';
}

const setRecommendation = (company: LabelText<string>) =>
  ({
    type: CompanyCollectionActionType.ADD_COMPANY,
    payload: {
      company
    }
  } as const);

const companyCollectionAction = {
  setRecommendation
};

type CompanyCollectionActionGroup = ReturnTypeOfGroup<typeof companyCollectionAction>;

type CompanyCollectionActionUnion = CompanyCollectionActionGroup[keyof CompanyCollectionActionGroup];

export { companyCollectionAction, CompanyCollectionActionType, CompanyCollectionActionGroup, CompanyCollectionActionUnion };
