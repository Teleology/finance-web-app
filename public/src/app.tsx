import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Container, ThemeProvider } from '@material-ui/core';
import { store, history } from './root-redux/root-store';
import { theme } from './theme';
import { SelectionPanel } from './containers/selection-panel.component';

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Container maxWidth="xl">
          <SelectionPanel />
        </Container>
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);
