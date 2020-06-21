import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { store, history } from './root-redux/root-store';

export const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="*" render={(): React.ReactElement => <h1>React App</h1>} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};
