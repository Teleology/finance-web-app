import * as React from 'react';
import { Drawer } from '@material-ui/core';
type Props = { isOpen: boolean; close: () => void };

const AppDrawer = React.memo(
  (props: Props): React.ReactElement => {
    const { isOpen, close } = props;

    return (
      <Drawer anchor="left" open={isOpen} onClose={close}>
        123
      </Drawer>
    );
  }
);

AppDrawer.displayName = 'AppDrawer';

export { AppDrawer };
