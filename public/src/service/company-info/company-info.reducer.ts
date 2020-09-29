import { RootAction } from '../root-store';
import { CompanyDetail, CompanyInfoActionType, NewsUnit } from './company-info-util';

type CompanyInfoState = {
  newsList: Array<NewsUnit> | null;
  detail: CompanyDetail | null;
};

const defaultState: CompanyInfoState = {
  newsList: null,
  detail: null
};

const companyInfoReducer = (prevState: CompanyInfoState = defaultState, action: RootAction): CompanyInfoState => {
  switch (action.type) {
    case CompanyInfoActionType.SET_NEWS: {
      return {
        ...prevState,
        newsList: action.payload.newsList
      };
    }
    case CompanyInfoActionType.SET_DETAIL: {
      return {
        ...prevState,
        detail: action.payload.detail
      };
    }
    default:
      return prevState;
  }
};

export { CompanyInfoState, companyInfoReducer };
