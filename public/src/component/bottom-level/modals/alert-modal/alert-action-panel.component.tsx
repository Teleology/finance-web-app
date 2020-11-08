import * as React from 'react';
import { Button } from '@material-ui/core';
import { ModalActionsPropsGroup } from '../../../../service/modal/modal-utils';

const AlertActionPanel = (props: ModalActionsPropsGroup['alert']): React.ReactElement => {
  const { confirmText, confirmHandler } = props;
  return (
    <Button onClick={confirmHandler} color="primary">
      {confirmText}
    </Button>
  );
};

export { AlertActionPanel };
