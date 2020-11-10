import { RootAction } from '../root-store';
import { FetchStatusEnum } from '../../utils/network-util';
import { SharedActionType } from '../shared-service/shared.action';
import { CompanyDetail, CompanyInfoActionType, NewsUnit } from './company-info-util';

type CompanyInfoState = {
  newsList: Array<NewsUnit> | null;
  detail: {
    data: CompanyDetail | null;
    fetchStatus: FetchStatusEnum;
  };
};

const defaultState: CompanyInfoState = {
  newsList: null,
  detail: {
    fetchStatus: FetchStatusEnum.NEVER,
    data: null
  }
};

const companyInfoReducer = (prevState: CompanyInfoState = defaultState, action: RootAction): CompanyInfoState => {
  switch (action.type) {
    case CompanyInfoActionType.SET_NEWS: {
      return {
        ...prevState,
        newsList: action.payload.newsList
      };
    }
    case SharedActionType.GET_COMPANY_INFO: {
      return {
        ...prevState,
        detail: {
          ...prevState.detail,
          fetchStatus: FetchStatusEnum.PENDING
        }
      };
    }
    case CompanyInfoActionType.SET_DETAIL: {
      return {
        ...prevState,
        detail: {
          data: action.payload.detail,
          fetchStatus: FetchStatusEnum.SUCCESS
        }
      };
    }
    default:
      return prevState;
  }
};

export { CompanyInfoState, companyInfoReducer };
