type NewsUnit = {
  source: string;
  title: string;
  description: string;
  content: string;
  publishAt: string;
  site: string;
};

namespace CompanyInfoActionType {
  export const GET_NEWS = 'company-info/GET_NEWS';
  export const SET_NEWS = 'company-info/SET_NEWS';
}

export { NewsUnit, CompanyInfoActionType };
