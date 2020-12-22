import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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
import { SharedActionUnion } from './shared-service/shared.action';
import { companyCollectionReducer, CompanyCollectionState } from './company-collection/company-collection.reducer';
import { CompanyInfoActionUnion } from './company-info/company-info.action';
import { companyInfoReducer, CompanyInfoState } from './company-info/company-info.reducer';
import { companyInfoEpic } from './company-info/company-info.epic';
import { CompanySearchActionUnion } from './company-search/company-search.action';
import { companySearchReducer, CompanySearchState } from './company-search/company-search.reducer';
import { modalReducer, ModalState } from './shared-service/modal/modal.reducer';
import { ModalActionUnion } from './shared-service/modal/modal.action';
import { CompanyCollectionActionUnion } from './company-collection/comany-collection.action';
import { StockLatestInfoActionUnion } from './stock-latest-info/stock-latest-info.action';
import { StockLatestInfoState } from './stock-latest-info/stock-latest-info.utils';
import { stockLatestInfoReducer } from './stock-latest-info/stock-latest.reducer';

type RootAction =
  | CompanySelectionActionUnion
  | StockTimeSeriesActionUnion
  | CompanyInfoActionUnion
  | CompanySearchActionUnion
  | ModalActionUnion
  | SharedActionUnion
  | CompanyCollectionActionUnion
  | StockLatestInfoActionUnion;

type RootState = {
  router: RouterState;
  companySelection: CompanySelectionState;
  companySearch: CompanySearchState;
  stockTimeSeries: StockTimeSeriesState;
  stockLatestInfo: StockLatestInfoState;
  companyCollection: CompanyCollectionState;
  companyInfo: CompanyInfoState;
  modal: ModalState;
};

// middlewares
const history = createBrowserHistory();
const connectedRouterMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware();
const middlewares = applyMiddleware(connectedRouterMiddleware, epicMiddleware);
const enhancers = composeWithDevTools({})(middlewares);

// reducer
const rootReducer = combineReducers<RootState>({
  router: connectRouter(history),
  companySelection: companySelectionReducer,
  companySearch: companySearchReducer,
  stockTimeSeries: stockTimeSeriesReducer,
  stockLatestInfo: stockLatestInfoReducer,
  companyCollection: companyCollectionReducer,
  companyInfo: companyInfoReducer,
  modal: modalReducer
});

const persistRootReducer = persistReducer(
  {
    key: 'root',
    storage,
    // TODO: bug persist date in redux cause undefined when rendering charts
    blacklist: ['router', 'modal', 'stockTimeSeries', 'companySelection', 'companySearch', 'stockTimeSeries', 'companyInfo'] as Array<keyof RootState>
  },
  rootReducer
);

// store
const isLocal = process.env.NODE_ENV === 'development';
const store = isLocal ? createStore(persistRootReducer, enhancers) : createStore(persistRootReducer, middlewares);
const persistor = persistStore(store);

// redux observable
const rootEpic = combineEpics(companySelectionEpic, stockTimeSeriesEpic, companyInfoEpic);
epicMiddleware.run(rootEpic);
export { store, persistor, isLocal, history, RootState, RootAction };
