import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Container, ThemeProvider, Grid } from '@material-ui/core';
import { store, history } from './service/root-store';
import { theme } from './theme';
import { SelectionPanel } from './containers/selection-panel.component';
import { LineChart } from './components/line-chart/line-chart.component';
import { CompanySearch } from './containers/company-search.component';
import { NewsSection } from './components/news-section/news-section.component';
import { CompanyWatcher } from './containers/company-watcher.component';

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Container maxWidth="xl">
          <Grid container={true}>
            <SelectionPanel />
            <Grid item={true} xs={4}>
              <CompanySearch />
            </Grid>
            <LineChart />
            <NewsSection title="" content="" />
            <CompanyWatcher />
          </Grid>
        </Container>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
