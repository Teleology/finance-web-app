import { ReturnTypeOfGroup } from '../../utils/type-util';
import { NewsUnit, CompanyInfoActionType } from './company-info-util';

const setNews = (newsList: Array<NewsUnit>) =>
  ({
    type: CompanyInfoActionType.SET_NEWS,
    payload: {
      newsList
    }
  } as const);

const newsActions = {
  setNews
};

type NewsActionGroup = ReturnTypeOfGroup<typeof newsActions>;
type NewsActionUnion = NewsActionGroup[keyof NewsActionGroup];

export { newsActions, NewsActionGroup, CompanyInfoActionType, NewsActionUnion };
