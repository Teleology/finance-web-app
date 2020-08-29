import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { store, history } from './root-redux/root-store';
import { Button } from './components/button';
import { AppThemeProvider } from './theme';

const a = (): React.ReactElement => (
  <h1>
    React App
    <Link to={'/b'}>To B</Link>
  </h1>
);
const b = (): React.ReactElement => (
  <h1>
    React Bpp
    <Link to={'/c'}>To C</Link>
  </h1>
);
const c = (): React.ReactElement => (
  <h1>
    React Cpp
    <Link to={'/a'}>To A</Link>
  </h1>
);
const d = (): React.ReactElement => <Button>123123123</Button>;

export const App = (): React.ReactElement => (
  <AppThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact={true} path={'/user1'} render={a} />
          <Route exact={true} path="/user2" render={b} />
          <Route exact={true} path="/user3" render={c} />
          <Route exact={true} path="*" render={d} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </AppThemeProvider>
);
