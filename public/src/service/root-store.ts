import { applyMiddleware, combineReducers, createStore } from 'redux';
import { RouterState, routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { CompanySelectionActionUnion } from './company-selection/company-selection.action';
import { companySelectionEpic } from './company-selection/company-selection.epic';
import { companySelectionReducer, CompanySelectionState } from './company-selection/company-selection.reducer';
import { StockTimeSeriesActionUnion } from './stock-time-series/stock-time-series.action';
import { stockTimeSeriesReducer, StockTimeSeriesState } from './stock-time-series/stock-time-series.reducer';
import { stockTimeSeriesEpic } from './stock-time-series/stock-time-series.epic';
import { SharedActionUnion } from './shared.action';
import { companyCollectionReducer, CompanyCollectionState } from './company-collection/company-collection.reducer';
import { NewsActionUnion } from './company-info/company-info.action';
import { companyInfoReducer, CompanyInfoState } from './company-info/company-info.reducer';

type RootAction = CompanySelectionActionUnion | StockTimeSeriesActionUnion | NewsActionUnion | SharedActionUnion;

type RootState = {
  router: RouterState;
  companySelection: CompanySelectionState;
  stockTimeSeries: StockTimeSeriesState;
  companyCollection: CompanyCollectionState;
  companyInfo: CompanyInfoState;
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
  stockTimeSeries: stockTimeSeriesReducer,
  companyCollection: companyCollectionReducer,
  companyInfo: companyInfoReducer
});

const isLocal = process.env.NODE_ENV === 'development';
const store = isLocal ? createStore(rootReducer, enhancers) : createStore(rootReducer, middlewares);

const rootEpic = combineEpics(companySelectionEpic, stockTimeSeriesEpic);
epicMiddleware.run(rootEpic);
export { store, isLocal, history, RootState, RootAction };
