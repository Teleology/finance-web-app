import * as React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { Route, Switch } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { store, history, persistor } from './service/root-store';
import { theme } from './theme';
import { CompanyWatcher } from './view/middle-level/company-watcher.component';
import { AppHeader } from './view/middle-level/app-header/app-header.component';
import { AppDrawer } from './view/middle-level/app-drawer/app-drawer.component';
import { AppDrawerManager } from './view/middle-level/app-drawer-manager.component';
import { compareLink, infoLink, searchLink } from './utils/network-util';
import { SearchPage } from './view/top-level/search-page.component';
import { ModalManagerContainer } from './view/bottom-level/modals/modals';
import { InfoPage } from './view/top-level/info-page/info-page.component';

export const App = (): React.ReactElement => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
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
              <InfoPage />
            </Route>
            <Route exact={true} path={compareLink}>
              <CompanyWatcher />
            </Route>
            <Route exact={true} path={['/', searchLink]}>
              <SearchPage />
            </Route>
          </Switch>
          <ModalManagerContainer />
        </ConnectedRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
