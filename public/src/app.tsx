import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, Paper, CssBaseline } from '@material-ui/core';
import { store, history } from './service/root-store';
import { theme } from './theme';
import { SelectionPanelContainer } from './ui/containers/selection-panel/selection-panel.component';
import { CompanySearchContainer } from './ui/containers/company-search.component';
import { CompanyWatcher } from './ui/containers/company-watcher.component';
import { StockTimeSeriesChartContainer } from './ui/containers/time-series-chart/stock-time-series-chart.component';
import { NewsSectionContainer } from './ui/components/news/news-section.component';
import { CompanyDetailContainer } from './ui/components/company-detail/company-detail.component';
import { AppHeader } from './ui/components/app-header/app-header.component';
import { AppDrawer } from './ui/components/app-drawer/app-drawer.component';
import { AppDrawerManager } from './ui/components/app-drawer-manager.component';

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

        <Paper>
          <SelectionPanelContainer />
          <CompanySearchContainer />
        </Paper>

        <StockTimeSeriesChartContainer />
        <NewsSectionContainer />
        <CompanyDetailContainer />
        <CompanyWatcher />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
