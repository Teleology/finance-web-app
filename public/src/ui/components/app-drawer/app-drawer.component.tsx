import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Business as BusinessIcon } from '@material-ui/icons';
type Props = { isOpen: boolean; close: () => void };

const AppDrawer = React.memo(
  (props: Props): React.ReactElement => {
    const { isOpen, close } = props;

    return (
      <Drawer anchor="left" open={isOpen} onClose={close}>
        <List component="nav">
          <ListItem button={true}>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
);

AppDrawer.displayName = 'AppDrawer';

export { AppDrawer };
