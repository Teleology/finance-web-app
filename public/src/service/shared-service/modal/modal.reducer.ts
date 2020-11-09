import { RootAction } from '../../root-store';
import { ModalActionPayloadGroup } from './modal-utils';
import { ModalActionType } from './modal.action';

type ModalState = ModalActionPayloadGroup[keyof ModalActionPayloadGroup] | null;

const modalReducer = (prevState: ModalState = null, action: RootAction): ModalState => {
  switch (action.type) {
    case ModalActionType.OPEN: {
      return action.payload;
    }
    case ModalActionType.CLOSE: {
      return null;
    }
    default:
      return prevState;
  }
};

export { modalReducer, ModalState };
