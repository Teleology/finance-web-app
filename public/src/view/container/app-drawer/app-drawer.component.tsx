import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Business as BusinessIcon, Timeline as TimeLineIcon, Compare as CompareIcon } from '@material-ui/icons';
import { AppRouteLink } from '../../common/app-link.component';
import { infoLink, compareLink, searchLink } from '../../../utils/network-util';
import styles from './app-drawer.styles';
type Props = { isOpen: boolean; close: () => void };

const AppDrawer = (props: Props): React.ReactElement => {
  const { isOpen, close } = props;
  const { useContainerStyles, useListItemIconStyles } = styles;
  return (
    <Drawer anchor="left" open={isOpen} onClose={close} classes={useContainerStyles()}>
      <List component="nav" onClick={close}>
        <AppRouteLink to={searchLink}>
          <ListItem button={true}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </AppRouteLink>
        <AppRouteLink to={infoLink}>
          <ListItem button={true}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <TimeLineIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItem>
        </AppRouteLink>
        <AppRouteLink to={compareLink}>
          <ListItem button={true}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <CompareIcon />
            </ListItemIcon>
            <ListItemText primary="Compare" />
          </ListItem>
        </AppRouteLink>
      </List>
    </Drawer>
  );
};
AppDrawer.displayName = 'AppDrawer';

export { AppDrawer };
