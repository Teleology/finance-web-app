import { Dispatch } from 'redux';
import { RootAction } from '../../root-store';

type ModalActionCommonPayload = {
  title: string;
  content: string;
};

enum ModalType {
  ALERT = 'alert',
  CONFIRM = 'confirm'
}

type AlertActionPayload = ModalActionCommonPayload & {
  modalType: ModalType.ALERT;
  confirmText: string;
  confirmAction?: RootAction;
};

type ConfirmActionPayload = ModalActionCommonPayload & {
  modalType: ModalType.CONFIRM;
  confirmText: string;
  closeText: string;
  confirmAction?: RootAction;
  closeAction?: RootAction;
};

type AlertActionComponentProps = AlertActionPayload & { dispatch: Dispatch<RootAction> };
type ConfirmActionComponentProps = ConfirmActionPayload & { dispatch: Dispatch<RootAction> };
type ModalActionComponentPropsGroup = {
  [ModalType.ALERT]: AlertActionComponentProps;
  [ModalType.CONFIRM]: ConfirmActionComponentProps;
};

type ModalPropsGroup = { [key in keyof ModalActionsPropsGroup]: ModalActionsPropsGroup[key] & ModalWrapperProps & { modalType: key } };
type ModalPropsUnion = ModalPropsGroup[keyof ModalPropsGroup];

export { ModalType, ModalActionsPropsGroup, ModalPropsGroup, ModalPropsUnion, ModalWrapperProps };
