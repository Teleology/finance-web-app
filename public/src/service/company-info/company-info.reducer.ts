import { RootAction } from '../root-store';
import { CompanyInfoActionType, NewsUnit } from './company-info-util';

type CompanyInfoState = {
  newsList: Array<NewsUnit> | null;
};

const defaultState: CompanyInfoState = {
  newsList: null
};

const companyInfoReducer = (prevState: CompanyInfoState = defaultState, action: RootAction): CompanyInfoState => {
  switch (action.type) {
    case CompanyInfoActionType.SET_NEWS: {
      return {
        ...prevState,
        newsList: action.payload.newsList
      };
    }
    default:
      return prevState;
  }
};

export { CompanyInfoState, companyInfoReducer };
