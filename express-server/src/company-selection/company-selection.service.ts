// TODO: continent -> country -> indices -> company

import { injectable } from 'inversify';
import { get, filter, map, flow } from 'lodash/fp';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { fcsApiBasicSettings } from '../common/network-utils';
const continent: Array<Continent> = ['asia', 'europe', 'oceania', 'africa', 'north-america', 'south-america'];
type Country = { country: string; continent: Continent };

const countries: Array<Country> = [
  { country: 'brazil', continent: 'north-america' },
  { country: 'canada', continent: 'north-america' },
  { country: 'china', continent: 'asia' },
  { country: 'denmark', continent: 'europe' },
  { country: 'dubai', continent: 'asia' },
  { country: 'finland', continent: 'europe' },
  { country: 'france', continent: 'europe' },
  { country: 'germany', continent: 'europe' },
  { country: 'india', continent: 'asia' },
  { country: 'indonesia', continent: 'oceania' },
  { country: 'ireland', continent: 'europe' },
  { country: 'japan', continent: 'asia' },
  { country: 'malaysia', continent: 'asia' },
  { country: 'mexico', continent: 'north-america' },
  { country: 'netherlands', continent: 'europe' },
  { country: 'pakistan', continent: 'asia' },
  { country: 'philippines', continent: 'asia' },
  { country: 'russia', continent: 'europe' },
  { country: 'saudi-arabia', continent: 'asia' },
  { country: 'singapore', continent: 'asia' },
  { country: 'south-africa', continent: 'africa' },
  { country: 'spain', continent: 'europe' },
  { country: 'sweden', continent: 'europe' },
  { country: 'switzerland', continent: 'europe' },
  { country: 'thailand', continent: 'asia' },
  { country: 'turkey', continent: 'asia' },
  { country: 'united-arab-emirates', continent: 'asia' },
  { country: 'united-kingdom', continent: 'europe' },
  { country: 'united-states', continent: 'north-america' }
];

type IndiceResponse = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  category_id: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  category_name: string;
  country: string;
};
type IndiceContract = {
  categoryId: string;
  categoryName: string;
};

type StockResponse = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  stock_id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  short_name: string;
  country: string;
};
type StockContract = {
  stockId: string;
  name: string;
  shortName: string;
  country: string;
};

@injectable()
class CompanySelectionService {
  private optionAxios: AxiosInstance;
  constructor() {
    this.optionAxios = axios.create({
      ...fcsApiBasicSettings,
      transformResponse: flow(JSON.parse, get('response'))
    });
  }
  public getContinent(): ReadonlyArray<Continent> {
    return continent;
  }
  public getCountriesByContinent(continent: Continent): Array<string> {
    return flow(filter<Country>({ continent }), map<Country, 'country'>('country'))(countries);
  }

  public getIndicesByCountry(country: string): Promise<Array<IndiceContract>> {
    return this.optionAxios({ params: { country }, url: 'indices' }).then(
      flow(
        get<AxiosResponse<Array<IndiceResponse>>, 'data'>('data'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        map(({ category_id, category_name }: IndiceResponse) => ({ categoryId: category_id, categoryName: category_name }))
      )
    );
  }

  public getCompaniesByIndice(indiceId: string): Promise<Array<StockContract>> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return this.optionAxios({ params: { indices_id: indiceId }, url: 'list' }).then(
      flow(
        get<AxiosResponse<Array<StockResponse>>, 'data'>('data'),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        map(({ short_name, stock_id, name, country }: StockResponse) => ({ shortName: short_name, stockId: stock_id, name, country }))
      )
    );
  }
}

export { CompanySelectionService };
