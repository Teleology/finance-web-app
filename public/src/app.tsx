import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Container, ThemeProvider, Grid } from '@material-ui/core';
import { store, history } from './root-redux/root-store';
import { theme } from './theme';
import { SelectionPanel } from './containers/selection-panel.component';
import { LineChart } from './components/line-chart.component';

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Container maxWidth="xl">
          <Grid container={true}>
            <SelectionPanel />
            <LineChart />
          </Grid>
        </Container>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
