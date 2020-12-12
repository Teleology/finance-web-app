import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  Business as BusinessIcon,
  Timeline as TimeLineIcon,
  Compare as CompareIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon
} from '@material-ui/icons';
import { TreeView, TreeItem } from '@material-ui/lab';
import { AppRouteLink } from '../../common/app-link.component';
import { infoLink, compareLink, searchLink } from '../../../utils/network-util';
import styles from './app-drawer.styles';
type Props = { isOpen: boolean; close: () => void };

const AppDrawer = (props: Props): React.ReactElement => {
  const { isOpen, close } = props;
  const { useContainerStyles, useListItemIconStyles } = styles;
  return (
    <Drawer anchor="left" open={isOpen} onClose={close} classes={useContainerStyles()}>
      <List component="nav">
        <AppRouteLink to={searchLink}>
          <ListItem button={true} onClick={close}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </AppRouteLink>
        <AppRouteLink to={infoLink}>
          <ListItem button={true} onClick={close}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <TimeLineIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItem>
        </AppRouteLink>
        <AppRouteLink to={compareLink}>
          <ListItem button={true} onClick={close}>
            <ListItemIcon classes={useListItemIconStyles()}>
              <CompareIcon />
            </ListItemIcon>
            <ListItemText primary="Compare" />
          </ListItem>
        </AppRouteLink>
        <ListItem>
          <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
            <TreeItem nodeId="1" label="Info">
              <TreeItem nodeId="2" label="Calendar" />
              <TreeItem nodeId="3" label="Chrome" />
              <TreeItem nodeId="4" label="Webstorm" />
            </TreeItem>
          </TreeView>
        </ListItem>
      </List>
    </Drawer>
  );
};
AppDrawer.displayName = 'AppDrawer';

export { AppDrawer };
