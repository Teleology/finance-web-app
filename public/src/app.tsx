import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, Paper, CssBaseline } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import { store, history } from './service/root-store';
import { theme } from './theme';
import { SelectionPanelContainer } from './ui/components/selection-panel/selection-panel.component';
import { CompanySearchContainer } from './ui/components/company-search.component';
import { CompanyWatcher } from './ui/components/company-watcher.component';
import { StockTimeSeriesChartContainer } from './ui/components/time-series-chart/stock-time-series-chart.component';
import { NewsSectionContainer } from './ui/components/news/news-section.component';
import { CompanyDetailContainer } from './ui/components/company-detail/company-detail.component';
import { AppHeader } from './ui/components/app-header/app-header.component';
import { AppDrawer } from './ui/components/app-drawer/app-drawer.component';
import { AppDrawerManager } from './ui/components/app-drawer-manager.component';
import { compareLink, infoLink, searchLink } from './utils/network-util';

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConnectedRouter history={history}>
        <AppDrawerManager>
          {(isOpen: boolean, close: () => void, open: () => void): React.ReactElement => (
            <>
              <AppHeader openDrawer={open} />
              <AppDrawer close={close} isOpen={isOpen} />
            </>
          )}
        </AppDrawerManager>
        <Switch>
          <Route exact={true} path={infoLink}>
            <StockTimeSeriesChartContainer />
            <NewsSectionContainer />
          </Route>
          <Route exact={true} path={compareLink}>
            <CompanyWatcher />
          </Route>
          <Route exact={true} path={['/', searchLink]}>
            <Paper>
              <SelectionPanelContainer />
              <CompanySearchContainer />
              <CompanyDetailContainer />
            </Paper>
          </Route>
        </Switch>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
