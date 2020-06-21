import { applyMiddleware, combineReducers, createStore } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
export type RootState = {
  router: RouterState;
};

export const history = createBrowserHistory();
const middlewares = applyMiddleware();
const enhancers = composeWithDevTools({})(middlewares);
// TODO: add RootAction
const rootReducer = combineReducers<RootState>({
  router: connectRouter(history),
});
export const isLocal = process.env.NODE_ENV === 'development';
export const store = isLocal ? createStore(rootReducer, enhancers) : createStore(rootReducer, middlewares);
