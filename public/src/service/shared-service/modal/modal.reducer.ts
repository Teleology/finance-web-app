import { RootAction } from '../../root-store';
import { ModalActionPayloadGroup, ModalType } from './modal-utils';
import { ModalActionType } from './modal.action';

type ModalState = ModalActionPayloadGroup[keyof ModalActionPayloadGroup] | { modalType: ModalType.NONE };

const modalReducer = (prevState: ModalState = { modalType: ModalType.NONE }, action: RootAction): ModalState => {
  switch (action.type) {
    case ModalActionType.OPEN: {
      return action.payload;
    }
    case ModalActionType.CLOSE: {
      return { modalType: ModalType.NONE };
    }
    default:
      return prevState;
  }
};

export { modalReducer, ModalState };
