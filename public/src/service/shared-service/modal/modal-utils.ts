import * as React from 'react';

type ModalWrapperProps = {
  title: string;
  content: string;
  handleClose?: React.MouseEventHandler;
};

enum ModalType {
  ALERT = 'alert',
  CONFIRM = 'confirm'
}

type AlertAction = {
  confirmText: string;
  handleConfirm: React.MouseEventHandler;
};
type ConfirmAction = {
  confirmText: string;
  handlerConfirm: React.MouseEventHandler;
  closeText: string;
  closeHandler: React.MouseEventHandler;
};
type ModalActionsPropsGroup = {
  [ModalType.ALERT]: AlertAction;
  [ModalType.CONFIRM]: ConfirmAction;
};

type ModalPropsGroup = { [key in keyof ModalActionsPropsGroup]: ModalActionsPropsGroup[key] & ModalWrapperProps & { modalType: key } };
type ModalPropsUnion = ModalPropsGroup[keyof ModalPropsGroup];

export { ModalType, ModalActionsPropsGroup, ModalPropsGroup, ModalPropsUnion, ModalWrapperProps };
