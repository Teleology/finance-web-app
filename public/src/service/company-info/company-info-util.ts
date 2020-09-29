type NewsUnit = {
  source: string;
  title: string;
  description: string;
  content: string;
  publishAt: string;
  site: string;
};

type CompanyDetail = {
  symbol: string;
  name: string;
  description: string;
  exchange: string;
  country: string;
  industry: string;
  address: string;
  fullTimeEmployees: string;
  marketCapitalization: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  EBITDA: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PEGRatio: string;
};

namespace CompanyInfoActionType {
  export const SET_NEWS = 'company-info/SET_NEWS';
  export const SET_DETAIL = 'company-info/SET_DETAIL';
}

export { NewsUnit, CompanyDetail, CompanyInfoActionType };
