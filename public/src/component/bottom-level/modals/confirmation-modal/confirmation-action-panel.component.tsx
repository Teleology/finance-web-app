import * as React from 'react';
import { Button } from '@material-ui/core';
import { ModalActionComponentPropsGroup } from '../../../../service/shared-service/modal/modal-utils';
import { modalAction } from '../../../../service/shared-service/modal/modal.action';

const ConfirmActionPanel = (props: ModalActionComponentPropsGroup['confirm']): React.ReactElement => {
  const { closeText, confirmText, dispatch, closeAction, confirmAction } = props;
  const handleClose = React.useCallback(() => {
    dispatch(modalAction.closeModal());
    if (closeAction !== undefined) {
      dispatch(closeAction);
    }
  }, [dispatch, closeAction]);
  const handleConfirm = React.useCallback(() => {
    dispatch(modalAction.closeModal());
    if (confirmAction !== undefined) {
      dispatch(confirmAction);
    }
  }, [dispatch, confirmAction]);
  return (
    <>
      <Button onClick={handleClose} color="primary">
        {closeText}
      </Button>
      <Button onClick={handleConfirm} color="primary" autoFocus={true} variant="contained">
        {confirmText}
      </Button>
    </>
  );
};

export { ConfirmActionPanel };
