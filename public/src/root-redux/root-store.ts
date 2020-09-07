import { applyMiddleware, combineReducers, createStore } from 'redux';
import { RouterState, routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { CompanySelectionActionUnion } from './company-selection/company-selection.action';

type RootAction = CompanySelectionActionUnion;

type RootState = {
  router: RouterState;
};

// middlewares
const history = createBrowserHistory();
const connectedRouterMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();
const middlewares = applyMiddleware(connectedRouterMiddleware, epicMiddleware);
const enhancers = composeWithDevTools({})(middlewares);

const rootReducer = combineReducers<RootState>({
  router: connectRouter(history)
});

const isLocal = process.env.NODE_ENV === 'development';
const store = isLocal ? createStore(rootReducer, enhancers) : createStore(rootReducer, middlewares);

const rootEpic = combineEpics();
epicMiddleware.run(rootEpic);
export { store, isLocal, history, RootState, RootAction };
