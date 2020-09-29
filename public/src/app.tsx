import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Container, ThemeProvider, Grid } from '@material-ui/core';
import { store, history } from './service/root-store';
import { theme } from './theme';
import { SelectionPanelContainer } from './containers/selection-panel/selection-panel.component';
import { CompanySearchContainer } from './containers/company-search.component';
import { CompanyWatcher } from './containers/company-watcher.component';
import { StockTimeSeriesChartContainer } from './containers/time-series-chart/stock-time-series-chart.component';
import { NewsSectionContainer } from './components/news/news-section.component';

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Container maxWidth="xl">
          <Grid container={true}>
            <SelectionPanelContainer />
            <Grid item={true} xs={4}>
              <CompanySearchContainer />
            </Grid>
            <StockTimeSeriesChartContainer />
            <NewsSectionContainer />
            <CompanyWatcher />
          </Grid>
        </Container>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
