import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Container, ThemeProvider, Grid, CssBaseline } from '@material-ui/core';
import { store, history } from './service/root-store';
import { theme } from './theme';
import { SelectionPanelContainer } from './ui/containers/selection-panel/selection-panel.component';
import { CompanySearchContainer } from './ui/containers/company-search.component';
import { CompanyWatcher } from './ui/containers/company-watcher.component';
import { StockTimeSeriesChartContainer } from './ui/containers/time-series-chart/stock-time-series-chart.component';
import { NewsSectionContainer } from './ui/components/news/news-section.component';
import { CompanyDetailContainer } from './ui/components/company-detail/company-detail.component';
import { FinanceAppBar } from './ui/components/finance-app-bar/finance-app-bar.component';
export const App = (): React.ReactElement => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConnectedRouter history={history}>
        <Container maxWidth="xl">
          <FinanceAppBar />
          <Grid container={true}>
            <SelectionPanelContainer />
            <Grid item={true} xs={4}>
              <CompanySearchContainer />
            </Grid>
            <StockTimeSeriesChartContainer />
            <NewsSectionContainer />
            <CompanyDetailContainer />
            <CompanyWatcher />
          </Grid>
        </Container>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
