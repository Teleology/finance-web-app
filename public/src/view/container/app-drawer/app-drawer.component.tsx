import * as React from 'react';
import { map as _map, pick as _pick } from 'lodash';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  Business as BusinessIcon,
  Timeline as TimeLineIcon,
  Compare as CompareIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon
} from '@material-ui/icons';
import { TreeView, TreeItem } from '@material-ui/lab';
import { connect } from 'react-redux';
import { AppRouteLink } from '../../common/app-link.component';
import { infoLink, compareLink, searchLink } from '../../../utils/network-util';
import { RootState } from '../../../service/root-store';
import { companySymbolListSelector } from '../../../service/company-collection/company-collection.selecor';
import { companyCollectionAction } from '../../../service/company-collection/comany-collection.action';
import styles from './app-drawer.styles';

const mapState = (state: RootState) =>
  ({
    collectedCompanies: companySymbolListSelector(state)
  } as const);
const mapDispatch = _pick<typeof companyCollectionAction, 'setActiveCompany'>(companyCollectionAction, 'setActiveCompany');

type Props = ReturnType<typeof mapState> & typeof mapDispatch & { isOpen: boolean; close: () => void };

const AppDrawer = (props: Props): React.ReactElement => {
  const { isOpen, close, collectedCompanies, setActiveCompany } = props;
  const treeParentStyles = styles.useTreeParentStyles(),
    containerStyles = styles.useContainerStyles(),
    listItemIconStyles = styles.useListItemIconStyles(),
    treeChildStyles = styles.useTreeChildStyles();

  const handleCompanyClick = React.useCallback((event: React.MouseEvent) => {
    console.log(event.currentTarget.dataset);
  }, []);
  return (
    <Drawer anchor="left" open={isOpen} onClose={close} classes={containerStyles}>
      <List component="nav">
        <AppRouteLink to={searchLink}>
          <ListItem button={true} onClick={close}>
            <ListItemIcon classes={listItemIconStyles}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
        </AppRouteLink>
        <AppRouteLink to={infoLink}>
          <ListItem button={true} onClick={close}>
            <ListItemIcon classes={listItemIconStyles}>
              <TimeLineIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItem>
        </AppRouteLink>
        <AppRouteLink to={compareLink}>
          <ListItem button={true} onClick={close}>
            <ListItemIcon classes={listItemIconStyles}>
              <CompareIcon />
            </ListItemIcon>
            <ListItemText primary="Compare" />
          </ListItem>
        </AppRouteLink>
        <ListItem>
          <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
            <TreeItem nodeId="1" label="Info" classes={treeParentStyles}>
              {_map(collectedCompanies, (symbol: string) => (
                <div data-value={symbol} onClick={handleCompanyClick}>
                  <TreeItem nodeId={symbol} label={symbol} classes={treeChildStyles} />
                </div>
              ))}
            </TreeItem>
          </TreeView>
        </ListItem>
      </List>
    </Drawer>
  );
};
AppDrawer.displayName = 'AppDrawer';

const AppDrawerContainer = connect(mapState, mapDispatch)(AppDrawer);

export { AppDrawerContainer };
