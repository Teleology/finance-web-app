import * as React from 'react';
import { Button } from '@material-ui/core';
import { Dispatch } from 'redux';
import { ModalActionsPropsGroup } from '../../../../service/shared-service/modal/modal-utils';
import { RootAction } from '../../../../service/root-store';

const AlertActionPanel = (props: ModalActionsPropsGroup['alert'] & { dispatch: Dispatch<RootAction> }): React.ReactElement => {
  const { confirmText } = props;
  return (
    <Button onClick={console.log} color="primary">
      {confirmText}
    </Button>
  );
};

export { AlertActionPanel };
