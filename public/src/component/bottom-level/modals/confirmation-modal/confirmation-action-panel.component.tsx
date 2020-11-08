import * as React from 'react';
import { Button } from '@material-ui/core';
import { ModalActionsPropsGroup } from '../../../../service/shared-service/modal/modal-utils';

const ConfirmActionPanel = (props: ModalActionsPropsGroup['confirm']): React.ReactElement => {
  const { closeHandler, closeText, confirmHandler, confirmText } = props;
  return (
    <>
      <Button onClick={closeHandler} color="primary">
        {closeText}
      </Button>
      <Button onClick={confirmHandler} color="primary" autoFocus={true}>
        {confirmText}
      </Button>
    </>
  );
};

export { ConfirmActionPanel };
