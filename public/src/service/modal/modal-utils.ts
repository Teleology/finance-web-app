import * as React from 'react';
import { DialogProps } from '@material-ui/core';

type ModalWrapperProps = DialogProps;

type AlertAction = {
  confirmText: string;
  confirmHandler: React.MouseEventHandler;
};
type ConfirmAction = {
  confirmText: string;
  confirmHandler: React.MouseEventHandler;
  closeText: string;
  closeHandler: React.MouseEventHandler;
};
type ModalActionsPropsGroup = {
  alert: AlertAction;
  confirm: ConfirmAction;
};

type ModalPropsGroup = { [key in keyof ModalActionsPropsGroup]: ModalActionsPropsGroup[key] & ModalWrapperProps & { modalType: key } };

type ModalType = keyof ModalPropsGroup;

export { ModalType, ModalActionsPropsGroup, ModalPropsGroup, ModalWrapperProps };
