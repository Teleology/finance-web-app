import { Dispatch } from 'redux';
import { RootAction } from '../../root-store';

enum ModalType {
  ALERT = 'alert',
  CONFIRM = 'confirm'
}

type ModalContentProps = {
  title: string;
  content: string;
};

type AlertActionCommonProps = {
  confirmText: string;
  confirmAction?: RootAction;
};

type ConfirmActionCommonProps = {
  confirmText: string;
  closeText: string;
  confirmAction?: RootAction;
  closeAction?: RootAction;
};

type ModalActionCommonPropsGroup = {
  [ModalType.ALERT]: AlertActionCommonProps;
  [ModalType.CONFIRM]: ConfirmActionCommonProps;
};

type ModalActionPayloadGroup = { [key in keyof ModalActionCommonPropsGroup]: ModalActionCommonPropsGroup[key] & ModalContentProps & { modalType: key } };
type ModalActionComponentPropsGroup = {
  [key in keyof ModalActionCommonPropsGroup]: ModalActionCommonPropsGroup[key] & { dispatch: Dispatch<RootAction> };
};
type ModalPropsGroup = {
  [key in keyof ModalActionComponentPropsGroup]: ModalActionComponentPropsGroup[key] & ModalContentProps;
};

export { ModalType, ModalPropsGroup, ModalContentProps, ModalActionComponentPropsGroup, ModalActionPayloadGroup };
