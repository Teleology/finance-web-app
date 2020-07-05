import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { get } from 'lodash/fp';
import { AlphaFunction } from '../common/constants';
import { fetchCompanies } from './company-search.dt';
@controller('/api/v1/search')
export class CompanySearchController {
  @httpGet('')
  public async getMatchedCompanies(req: Request, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await fetchCompanies({
        params: {
          function: AlphaFunction.SEARCH,
          ...query,
        },
      }).then(get('data'));
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('search company error');
    }
  }
}
