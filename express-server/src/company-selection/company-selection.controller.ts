import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { baseURL } from '../common/network-utils';
import { serviceIDS } from '../common/string-utils';
import { CompanySelectionService } from './company-selection.service';
@controller(`${baseURL}/company-selection`)
class CompanySelectionController {
  constructor(@inject(serviceIDS.companySelectionService) private companySelectionService: CompanySelectionService) {}

  @httpGet('/continent')
  public getContinents(request: Request, response: Response): void {
    try {
      const continents = this.companySelectionService.getContinent();
      response.status(200).json(continents);
    } catch (e) {
      response.status(500).send('get continent error');
    }
  }

  @httpGet('/country/:continent')
  public getCountriesByContinent(request: Request, response: Response) {
    try {
      const { continent } = request.params;
      const countries = this.companySelectionService.getCountriesByContinent(continent as Continent);
      response.status(200).json(countries);
    } catch (e) {
      response.status(500).send('get countries error');
    }
  }

  @httpGet('/indices/:country')
  public async getIndicesByCountry(request: Request, response: Response) {
    try {
      const { country } = request.params;
      const indices = await this.companySelectionService.getIndicesByCountry(country);
      response.status(200).json(indices);
    } catch (e) {
      response.status(500).send('get indices error');
    }
  }
}
