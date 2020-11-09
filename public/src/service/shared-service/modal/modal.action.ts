import { ReturnTypeOfGroup } from '../../../utils/type-util';
import { ModalActionPayloadGroup } from './modal-utils';

namespace ModalActionType {
  export const OPEN = 'modal/OPEN';
  export const CLOSE = 'modal/CLOSE';
}

const openModal = (modalProps: ModalActionPayloadGroup[keyof ModalActionPayloadGroup]) =>
  ({
    type: ModalActionType.OPEN,
    payload: modalProps
  } as const);

const closeModal = () =>
  ({
    type: ModalActionType.CLOSE
  } as const);

const modalAction = {
  openModal,
  closeModal
};

type ModalActionGroup = ReturnTypeOfGroup<typeof modalAction>;
type ModalActionUnion = ModalActionGroup[keyof ModalActionGroup];

export { modalAction, ModalActionType, ModalActionUnion, ModalActionGroup };
