import { applyMiddleware, combineReducers, createStore } from 'redux';
import { RouterState, routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { CompanySelectionActionUnion } from './company-selection/company-selection.action';
import { companySelectionEpic } from './company-selection/company-selection.epic';
import { companySelectionReducer, CompanySelectionState } from './company-selection/company-selection.reducer';

type RootAction = CompanySelectionActionUnion;

type RootState = {
  router: RouterState;
  companySelection: CompanySelectionState;
};

// middlewares
const history = createBrowserHistory();
const connectedRouterMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();
const middlewares = applyMiddleware(connectedRouterMiddleware, epicMiddleware);
const enhancers = composeWithDevTools({})(middlewares);

const rootReducer = combineReducers<RootState>({
  router: connectRouter(history),
  companySelection: companySelectionReducer
});

const isLocal = process.env.NODE_ENV === 'development';
const store = isLocal ? createStore(rootReducer, enhancers) : createStore(rootReducer, middlewares);

const rootEpic = combineEpics(companySelectionEpic);
epicMiddleware.run(rootEpic);
export { store, isLocal, history, RootState, RootAction };
