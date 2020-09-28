import { ReturnTypeOfGroup } from '../../utils/type-util';
import { NewsUnit, CompanyInfoActionType } from './company-info-util';

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

const newsActions = {
  getNews,
  setNews
};

type NewsActionGroup = ReturnTypeOfGroup<typeof newsActions>;
type NewsActionUnion = NewsActionGroup[keyof NewsActionGroup];

export { newsActions, NewsActionGroup, CompanyInfoActionType, NewsActionUnion };
