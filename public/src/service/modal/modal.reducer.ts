import { RootAction } from '../root-store';
import { ModalPropsGroup } from './modal-utils';
import { ModalActionType } from '../shared-service/modal.action';

type ModalState = ModalPropsGroup[keyof ModalPropsGroup] | null;

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
