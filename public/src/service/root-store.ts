import { applyMiddleware, combineReducers, createStore } from 'redux';
import { RouterState, routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { StockTimeSeries } from '../typing/stock-time-series.typing';
import { CompanySelectionActionUnion } from './company-selection/company-selection.action';
import { companySelectionEpic } from './company-selection/company-selection.epic';
import { companySelectionReducer, CompanySelectionState } from './company-selection/company-selection.reducer';
import { StockTimeSeriesActionUnion } from './stock-time-series/stock-time-series.action';
import { stockTimeSeriesReducer } from './stock-time-series/stock-time-series.reducer';

type RootAction = CompanySelectionActionUnion | StockTimeSeriesActionUnion;

type RootState = {
  router: RouterState;
  companySelection: CompanySelectionState;
  stockTimeSeries: StockTimeSeries;
};

// middlewares
const history = createBrowserHistory();
const connectedRouterMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();
const middlewares = applyMiddleware(connectedRouterMiddleware, epicMiddleware);
const enhancers = composeWithDevTools({})(middlewares);

const rootReducer = combineReducers<RootState>({
  router: connectRouter(history),
  companySelection: companySelectionReducer,
  stockTimeSeries: stockTimeSeriesReducer
});

const isLocal = process.env.NODE_ENV === 'development';
const store = isLocal ? createStore(rootReducer, enhancers) : createStore(rootReducer, middlewares);

const rootEpic = combineEpics(companySelectionEpic);
epicMiddleware.run(rootEpic);
export { store, isLocal, history, RootState, RootAction };
