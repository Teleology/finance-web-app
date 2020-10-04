import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AppIcon from '../../../assets/svg/gs-logo.svg';
import useStyles from './finance-app-bar.style';

const FinanceAppBar = (): React.ReactElement => {
  const { title } = useStyles();
  return (
    <AppBar elevation={0}>
      <Toolbar>
        <AppIcon />
        <Typography variant="h1" classes={{ h1: title }} align="center">
          Finance Web App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export { FinanceAppBar };
