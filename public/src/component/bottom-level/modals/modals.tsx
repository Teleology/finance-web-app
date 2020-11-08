import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { ModalActionsPropsGroup } from '../../../service/modal/modal-utils';
import { ConfirmActionPanel } from './confirmation-modal/confirmation-action-panel.component';
import { AlertActionPanel } from './alert-modal/alert-action-panel.component';

type ActionComponentPropsUnion = ModalActionsPropsGroup[keyof ModalActionsPropsGroup];

type DialogProps = {
  title: string;
  content: string;
  handleClose: React.MouseEventHandler;
  isOpen: boolean;
};

const createModal = <T extends ActionComponentPropsUnion>(ActionComponent: React.FC<T>): React.FC<DialogProps & T> => {
  console.log(123);
  // eslint-disable-next-line react/display-name
  return (props: DialogProps & ActionComponentPropsUnion): React.ReactElement => {
    const { title, content, isOpen, handleClose, ...rest } = props;
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ActionComponent {...(rest as T)} />
        </DialogActions>
      </Dialog>
    );
  };
};

const AlertModal = createModal(AlertActionPanel);
const ConfirmationModal = createModal(ConfirmActionPanel);

const modalMapping = {
  alert: AlertModal,
  confirm: ConfirmationModal
};

export { modalMapping };
