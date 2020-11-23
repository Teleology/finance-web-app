import { LabelText, ReturnTypeOfGroup } from '../../utils/type-util';

namespace SharedActionType {
  export const GET_COMPANY_INFO = 'common/GET_COMPANY_INFO';
  export const GET_COMPANY_INFO_FAILURE = 'common/GET_COMPANY_INFO_FAILURE';
}

const getCompanyInfo = (company: LabelText<string>) =>
  ({
    type: SharedActionType.GET_COMPANY_INFO,
    payload: {
      company
    }
  } as const);

const getCompanyInfoFailure = () =>
  ({
    type: SharedActionType.GET_COMPANY_INFO_FAILURE
  } as const);

const sharedAction = {
  getCompanyInfo,
  getCompanyInfoFailure
};

type SharedActionGroup = ReturnTypeOfGroup<typeof sharedAction>;

type SharedActionUnion = SharedActionGroup[keyof SharedActionGroup];

export { sharedAction, SharedActionType, SharedActionGroup, SharedActionUnion };
