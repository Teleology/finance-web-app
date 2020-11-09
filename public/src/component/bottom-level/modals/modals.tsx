import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ModalActionComponentPropsGroup, ModalPropsGroup, ModalType } from '../../../service/shared-service/modal/modal-utils';
import { RootAction, RootState } from '../../../service/root-store';
import { ModalState } from '../../../service/shared-service/modal/modal.reducer';
import { modalAction } from '../../../service/shared-service/modal/modal.action';
import { ConfirmActionPanel } from './confirmation-modal/confirmation-action-panel.component';
import { AlertActionPanel } from './alert-modal/alert-action-panel.component';

const createModal = <T extends keyof ModalPropsGroup>(ActionComponent: React.FC<ModalActionComponentPropsGroup[T]>): React.FC<ModalPropsGroup[T]> => {
  console.log(123);
  // eslint-disable-next-line react/display-name
  return (props: ModalPropsGroup[T]): React.ReactElement => {
    const { title, content, dispatch, ...rest } = props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actionComponentProps = { ...rest, dispatch } as any;
    const handleClose = React.useCallback(() => {
      dispatch(modalAction.closeModal());
    }, [dispatch]);
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
