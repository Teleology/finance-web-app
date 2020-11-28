import { ReturnTypeOfGroup } from '../../utils/type-util';
import { NewsUnit, CompanyInfoActionType, CompanyDetail } from './company-info-util';

const getNews = (symbol: string) =>
  ({
    type: CompanyInfoActionType.GET_NEWS,
    payload: {
      symbol
    }
  } as const);
const setNews = (newsList: Array<NewsUnit>) =>
  ({
    type: CompanyInfoActionType.SET_NEWS,
    payload: {
      newsList
    }
  } as const);

const setDetail = (detail: CompanyDetail) =>
  ({
    type: CompanyInfoActionType.SET_DETAIL,
    payload: {
      detail
    }
  } as const);

const companyInfoAction = {
  getNews,
  setNews,
  setDetail
};

type CompanyInfoActionGroup = ReturnTypeOfGroup<typeof companyInfoAction>;
type CompanyInfoActionUnion = CompanyInfoActionGroup[keyof CompanyInfoActionGroup];

export { companyInfoAction, CompanyInfoActionGroup, CompanyInfoActionType, CompanyInfoActionUnion };
