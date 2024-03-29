type NewsUnit = {
  author: string;
  image: string;
  source: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  site: string;
};

type CompanyDetail = {
  symbol: string;
  sector: string;
  name: string;
  description: string;
  exchange: string;
  country: string;
  industry: string;
  address: string;
  fullTimeEmployees: string;
  marketCapitalization: string;
  ebitda: string;
  pegRatio: string;
};

namespace CompanyInfoActionType {
  export const GET_NEWS = 'company-info/GET_NEWS';
  export const SET_NEWS = 'company-info/SET_NEWS';
  export const GET_DETAIL = 'company-info/GET_DETAIL';
  export const GET_DETAIL_FAILURE = 'company-info/GET_DETAIL_FAILURE';
  export const SET_DETAIL = 'company-info/SET_DETAIL';
}

export { NewsUnit, CompanyDetail, CompanyInfoActionType };
