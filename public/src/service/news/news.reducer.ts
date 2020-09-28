import { RootAction } from '../root-store';
import { NewsActionType, NewsUnit } from './news-util';

type NewsState = {
  newsList: Array<NewsUnit> | null;
};

const defaultState: NewsState = {
  newsList: null
};

const newsReducer = (prevState: NewsState = defaultState, action: RootAction): NewsState => {
  switch (action.type) {
    case NewsActionType.SET_NEWS: {
      return {
        ...prevState,
        newsList: action.payload.newsList
      };
    }
    default:
      return prevState;
  }
};

export { NewsState, newsReducer };
