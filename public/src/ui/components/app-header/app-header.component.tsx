import * as React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import AppIcon from '../../../assets/svg/gs-logo.svg';
import useStyles from './app-header.style';

// TODO: APPIcon float then overflow bfc?
type Props = {
  openDrawer: () => void;
};
const AppHeader = React.memo(
  (props: Props): React.ReactElement => {
    const { title } = useStyles();
    const { openDrawer } = props;
    return (
      <AppBar elevation={0}>
        <Toolbar>
          <AppIcon />
          <IconButton onClick={openDrawer} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h1" classes={{ h1: title }} align="center">
            Finance Web App
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
);

AppHeader.displayName = 'AppHeader';

export { AppHeader };
