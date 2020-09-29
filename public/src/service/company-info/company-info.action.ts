import { ReturnTypeOfGroup } from '../../utils/type-util';
import { NewsUnit, CompanyInfoActionType, CompanyDetail } from './company-info-util';

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
  setNews,
  setDetail
};

type CompanyActionGroup = ReturnTypeOfGroup<typeof companyInfoAction>;
type CompanyActionUnion = CompanyActionGroup[keyof CompanyActionGroup];

export { companyInfoAction, CompanyActionGroup, CompanyInfoActionType, CompanyActionUnion };
