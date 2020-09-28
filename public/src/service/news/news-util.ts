type NewsUnit = {
  source: string;
  title: string;
  description: string;
  content: string;
  publishAt: string;
  site: string;
};

namespace NewsActionType {
  export const GET_NEWS = 'news/GET_NEWS';
  export const SET_NEWS = 'news/SET_NEWS';
}

export { NewsUnit, NewsActionType };
