import { injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { alphaApiBasicSettings, fcsApiBasicSettings, getAxiosData } from '../common/network-utils';
import { AlphaFunction } from '../common/string-utils';

/* eslint-disable @typescript-eslint/naming-convention */
type CompanyDetails = {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FullTimeEmployees: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  '52WeekHigh': string;
  '52WeekLow': string;
  '50DayMovingAverage': string;
  '200DayMovingAverage': string;
  SharesOutstanding: string;
  SharesFloat: string;
  SharesShort: string;
  SharesShortPriorMonth: string;
  ShortRatio: string;
  ShortPercentOutstanding: string;
  ShortPercentFloat: string;
  PercentInsiders: string;
  PercentInstitutions: string;
  ForwardAnnualDividendRate: string;
  ForwardAnnualDividendYield: string;
  PayoutRatio: string;
  DividendDate: string;
  ExDividendDate: string;
  LastSplitFactor: string;
  LastSplitDate: string;
};
type NewsUnit = {
  source: string;
  title: string;
  description: string;
  content: string;
  publishAt: string;
  site: string;
};

@injectable()
class CompanyInfoService {
  private alphaAxios: AxiosInstance;
  private fcsAxios: AxiosInstance;

  constructor() {
    this.alphaAxios = axios.create(alphaApiBasicSettings);
    this.fcsAxios = axios.create({
      ...fcsApiBasicSettings,
      baseURL: 'https://fcsapi.com/api-v2/news/news'
    });
  }

  public getDetails(symbol: string): Promise<CompanyDetails> {
    return this.alphaAxios({ params: { function: AlphaFunction.OVERVIEW, symbol } }).then(getAxiosData);
  }

  public getNews(keywords: string): Promise<Array<NewsUnit>> {
    return this.fcsAxios({ params: { find_title: keywords } }).then((response) => response.data.response);
  }
}

export { CompanyInfoService };
