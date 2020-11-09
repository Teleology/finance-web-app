import * as React from 'react';
import { Button } from '@material-ui/core';
import { ModalActionsPropsGroup } from '../../../../service/shared-service/modal/modal-utils';

const ConfirmActionPanel = (props: ModalActionsPropsGroup['confirm']): React.ReactElement => {
  const { closeText, confirmText } = props;
  return (
    <>
      <Button onClick={console.log} color="primary">
        {closeText}
      </Button>
      <Button onClick={console.log} color="primary" autoFocus={true}>
        {confirmText}
      </Button>
    </>
  );
};

export { ConfirmActionPanel };
