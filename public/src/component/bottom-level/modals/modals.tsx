import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ModalActionsPropsGroup, ModalType } from '../../../service/shared-service/modal/modal-utils';
import { RootAction, RootState } from '../../../service/root-store';
import { ModalState } from '../../../service/shared-service/modal/modal.reducer';
import { ConfirmActionPanel } from './confirmation-modal/confirmation-action-panel.component';
import { AlertActionPanel } from './alert-modal/alert-action-panel.component';
type DialogProps = {
  title: string;
  content: string;
  handleClose: React.MouseEventHandler;
};

const createModal = <T extends keyof ModalActionsPropsGroup>(
  ActionComponent: React.FC<ModalActionsPropsGroup[T] & { dispatch: Dispatch<RootAction> }>
): React.FC<DialogProps & ModalActionsPropsGroup[T] & { dispatch: Dispatch<RootAction> }> => {
  console.log(123);
  // eslint-disable-next-line react/display-name
  return (props: DialogProps & ModalActionsPropsGroup[T] & { dispatch: Dispatch<RootAction> }): React.ReactElement => {
    const { title, content, handleClose, ...rest } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actionComponentProps = rest as any;
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
AlertModal.displayName = 'AlertModal';
const ConfirmationModal = createModal<ModalType.CONFIRM>(ConfirmActionPanel);
ConfirmationModal.displayName = 'ConfirmationModal';
const mapState = (state: RootState): ModalState => state.modal;

const ModalManager = (props: ModalState & { dispatch: Dispatch<RootAction> }): React.ReactElement => {
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

// @ts-ignore
const ModalManagerContainer = connect(mapState, (dispatch: Dispatch<RootAction>) => ({ dispatch }))(ModalManager);

export { ModalManagerContainer };
