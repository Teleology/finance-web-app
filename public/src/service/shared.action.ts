import { LabelText, ReturnTypeOfGroup } from '../utils/type-util';

namespace SharedActionType {
  export const COLLECT_COMPANY = 'shared/COLLECT_COMPANY';
}

const setCollection = (company: LabelText<string>) =>
  ({
    type: SharedActionType.COLLECT_COMPANY,
    payload: {
      company
    }
  } as const);

const sharedAction = {
  setCollection
};

type SharedActionGroup = ReturnTypeOfGroup<typeof sharedAction>;

type SharedActionUnion = SharedActionGroup[keyof SharedActionGroup];

export { sharedAction, SharedActionType, SharedActionGroup, SharedActionUnion };
