import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Business as BusinessIcon, Timeline as TimeLineIcon, Compare as CompareIcon } from '@material-ui/icons';
import styles from './app-drawer.styles';
type Props = { isOpen: boolean; close: () => void };

const AppDrawer = React.memo(
  (props: Props): React.ReactElement => {
    const { isOpen, close } = props;
    const { useContainerStyles, useListItemIconStyles } = styles;
    return (
      <Drawer anchor="left" open={isOpen} onClose={close} classes={useContainerStyles()}>
        <List component="nav">
          <ListItem button={true}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <TimeLineIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button={true}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <CompareIcon />
            </ListItemIcon>
            <ListItemText primary="Compare" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
);

AppDrawer.displayName = 'AppDrawer';

export { AppDrawer };
