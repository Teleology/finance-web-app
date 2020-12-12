import { ReturnTypeOfGroup } from '../../utils/type-util';

namespace SharedActionType {}

const sharedAction = {};

type SharedActionGroup = ReturnTypeOfGroup<typeof sharedAction>;

type SharedActionUnion = SharedActionGroup[keyof SharedActionGroup];

export { sharedAction, SharedActionType, SharedActionGroup, SharedActionUnion };
