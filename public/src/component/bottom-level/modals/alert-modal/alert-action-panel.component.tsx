import * as React from 'react';
import { Button } from '@material-ui/core';
import { ModalActionsPropsGroup } from '../../../../service/shared-service/modal/modal-utils';

const AlertActionPanel = (props: ModalActionsPropsGroup['alert']): React.ReactElement => {
  const { confirmText, handleConfirm } = props;
  return (
    <Button onClick={handleConfirm} color="primary">
      {confirmText}
    </Button>
  );
};

export { AlertActionPanel };
