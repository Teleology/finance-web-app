import * as React from 'react';
import { Button } from '@material-ui/core';
import { ModalActionComponentPropsGroup } from '../../../../service/shared-service/modal/modal-utils';
import { modalAction } from '../../../../service/shared-service/modal/modal.action';

const AlertActionPanel = (props: ModalActionComponentPropsGroup['alert']): React.ReactElement => {
  const { confirmText, dispatch, confirmAction } = props;
  const handleClose = React.useCallback(() => {
    dispatch(modalAction.closeModal());
    if (confirmAction !== undefined) {
      dispatch(confirmAction);
    }
  }, [dispatch, confirmAction]);
  return (
    <Button onClick={handleClose} color="primary" variant="contained">
      {confirmText}
    </Button>
  );
};

export { AlertActionPanel };
