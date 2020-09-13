import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { baseURL } from '../common/network-utils';
import { serviceIDS } from '../common/string-utils';
import { CompanySelectionService } from './company-selection.service';
@controller(`${baseURL}/company-selection`)
class CompanySelectionController {
  constructor(@inject(serviceIDS.companySelectionService) private companySelectionService: CompanySelectionService) {}

  @httpGet('/continents')
  public getContinents(request: Request, response: Response): void {
    try {
      const continents = this.companySelectionService.getContinent();
      response.status(200).json(continents);
    } catch (e) {
      response.status(500).send('get continent error');
    }
  }

  @httpGet('/countries/:continent')
  public getCountriesByContinent(request: Request, response: Response): void {
    try {
      const { continent } = request.params;
      const countries = this.companySelectionService.getCountriesByContinent(continent as Continent);
      response.status(200).json(countries);
    } catch (e) {
      response.status(500).send('get countries error');
    }
  }

  @httpGet('/indices/:country')
  public async getIndicesByCountry(request: Request, response: Response): Promise<void> {
    try {
      const { country } = request.params;
      const indices = await this.companySelectionService.getIndicesByCountry(country);
      response.status(200).json(indices);
    } catch (e) {
      response.status(500).send('get indices error');
    }
  }

  @httpGet('/companies/:indice')
  public async getCompaniesByIndice(request: Request, response: Response): Promise<void> {
    try {
      const { indice } = request.params;
      const companies = await this.companySelectionService.getCompaniesByIndice(indice);
      response.status(200).json(companies);
    } catch (e) {
      response.status(500).send('get companies error');
    }
  }
}

export { CompanySelectionController };
