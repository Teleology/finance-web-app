import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
export type RootState = {
  router: RouterState;
};

// TODO: add RootAction
const rootReducer = combineReducers<RootState>({
  router: connectRouter(history),
});
