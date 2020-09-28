import { ReturnTypeOfGroup } from '../../utils/type-util';
import { NewsUnit, NewsActionType } from './news-util';

const getNews = (symbol: string) =>
  ({
    type: NewsActionType.GET_NEWS,
    payload: {
      symbol
    }
  } as const);

const setNews = (newsList: Array<NewsUnit>) =>
  ({
    type: NewsActionType.SET_NEWS,
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

export { newsActions, NewsActionGroup, NewsActionType, NewsActionUnion };
