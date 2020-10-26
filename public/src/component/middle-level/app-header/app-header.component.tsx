import * as React from 'react';
import { AppBar, IconButton, Toolbar, Typography, Box } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import AppIcon from '../../../assets/svg/gs-logo.svg';
import styles from './app-header.style';

// TODO: APPIcon float then overflow bfc?
type Props = {
  openDrawer: () => void;
};
const AppHeader = React.memo(
  (props: Props): React.ReactElement => {
    const { useTitleStyles, usePlainStyles } = styles;
    const { iconContainer } = usePlainStyles();
    const { openDrawer } = props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" alignItems="center" className={iconContainer}>
            <IconButton onClick={openDrawer} color="inherit">
              <MenuIcon fontSize="large" />
            </IconButton>
            <AppIcon />
          </Box>
          <Typography variant="h1" classes={useTitleStyles()} align="center">
            Finance Web App
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
);

AppHeader.displayName = 'AppHeader';

export { AppHeader };
