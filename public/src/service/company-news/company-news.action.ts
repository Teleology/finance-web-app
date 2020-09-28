namespace CompanyNewsActionType {
  export const GET_NEWS = 'company-news/GET_NEWS';
  export const SET_NEWS = 'company-news/SET_NEWS';
}

const getNews = (symbol: string) =>
  ({
    type: CompanyNewsActionType.GET_NEWS,
    payload: {
      symbol
    }
  } as const);

const setNews = ()
