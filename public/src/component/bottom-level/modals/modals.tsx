import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { omit as _omit } from 'lodash';
import { connect } from 'react-redux';
import { ModalActionsPropsGroup, ModalType } from '../../../service/shared-service/modal/modal-utils';
import { RootState } from '../../../service/root-store';
import { ModalState } from '../../../service/shared-service/modal/modal.reducer';
import { ConfirmActionPanel } from './confirmation-modal/confirmation-action-panel.component';
import { AlertActionPanel } from './alert-modal/alert-action-panel.component';
type DialogProps = {
  title: string;
  content: string;
  handleClose: React.MouseEventHandler;
};

const createModal = <T extends keyof ModalActionsPropsGroup>(
  ActionComponent: React.FC<ModalActionsPropsGroup[T]>
): React.FC<DialogProps & ModalActionsPropsGroup[T]> => {
  console.log(123);
  // eslint-disable-next-line react/display-name
  return (props: DialogProps & ModalActionsPropsGroup[T]): React.ReactElement => {
    const { title, content, handleClose, ...rest } = props;
    const actionComponentProps = (rest as ModalActionsPropsGroup[keyof ModalActionsPropsGroup]) as ModalActionsPropsGroup[T];
    return (
      <Dialog open={true} onClose={handleClose}>
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

const mapState = (state: RootState): ModalState => state.modal;

const ModalManager = (props: ModalState): React.ReactElement => {
  if (props === null) {
    return <></>;
  }
  switch (props.modalType) {
    case ModalType.CONFIRM: {
      const { modalType, ...rest } = props;
      return <ConfirmationModal {...rest} />;
    }
    case ModalType.ALERT: {
      const { modalType, ...rest } = props;
      return <AlertModal {...rest} />;
    }
    default:
      return <></>;
  }
};

const ModalManagerContainer = connect(mapState, null)(ModalManager);

export { ModalManagerContainer };
