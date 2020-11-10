import { LabelText, ReturnTypeOfGroup } from '../../utils/type-util';

namespace SharedActionType {
  export const GET_COMPANY_INFO = 'shared/GET_COMPANY_INFO';
}

const getCompanyInfo = (company: LabelText<string>) =>
  ({
    type: SharedActionType.GET_COMPANY_INFO,
    payload: {
      company
    }
  } as const);

const sharedAction = {
  getCompanyInfo
};

type SharedActionGroup = ReturnTypeOfGroup<typeof sharedAction>;

type SharedActionUnion = SharedActionGroup[keyof SharedActionGroup];

export { sharedAction, SharedActionType, SharedActionGroup, SharedActionUnion };
