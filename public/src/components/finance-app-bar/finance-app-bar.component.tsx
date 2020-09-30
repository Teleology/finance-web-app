import * as React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import AppIcon from '../../assets/svg/gs-logo.svg';

const FinanceAppBar = (): React.ReactElement => (
  <AppBar elevation={0}>
    <Toolbar>
      <AppIcon />
    </Toolbar>
  </AppBar>
);

export { FinanceAppBar };
