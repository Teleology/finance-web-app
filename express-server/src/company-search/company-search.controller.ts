import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { inject } from 'inversify';
import { serviceIDS } from '../common/string-utils';
import { CompanySearchService } from './company-search.service';

@controller('/api/v1/search')
class CompanySearchController {
  constructor(@inject(serviceIDS.CompanySearchService) private companySearchService: CompanySearchService) {}
  @httpGet('')
  public async getMatchedCompanies(req: Request, res: Response): Promise<void> {
    const {
      query: { keywords }
    } = req;
    try {
      const response = await this.companySearchService.fetchCompanies(keywords as string);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('search company error');
    }
  }
}

export { CompanySearchController };
