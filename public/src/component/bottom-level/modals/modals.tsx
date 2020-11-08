import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { ModalActionsPropsGroup, ModalType } from '../../../service/shared-service/modal/modal-utils';
import { ConfirmActionPanel } from './confirmation-modal/confirmation-action-panel.component';
import { AlertActionPanel } from './alert-modal/alert-action-panel.component';

type DialogProps = {
  title: string;
  content: string;
  handleClose: React.MouseEventHandler;
  isOpen: boolean;
};

const createModal = <T extends keyof ModalActionsPropsGroup>(
  ActionComponent: React.FC<ModalActionsPropsGroup[T]>
): React.FC<DialogProps & ModalActionsPropsGroup[T]> => {
  console.log(123);
  // eslint-disable-next-line react/display-name
  return (props: DialogProps & ModalActionsPropsGroup[T]): React.ReactElement => {
    const { title, content, isOpen, handleClose, ...rest } = props;
    const actionComponentProps = (rest as ModalActionsPropsGroup[keyof ModalActionsPropsGroup]) as ModalActionsPropsGroup[T];
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ActionComponent {...actionComponentProps} />
        </DialogActions>
      </Dialog>
    );
  };
};

const AlertModal = createModal<ModalType.ALERT>(AlertActionPanel);
const ConfirmationModal = createModal<ModalType.CONFIRM>(ConfirmActionPanel);

const modalMapping = {
  alert: AlertModal,
  confirm: ConfirmationModal
};

export { modalMapping };
