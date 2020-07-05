import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';
@controller('/api/v1/search')
export class CompanySearchController {
  @httpGet('/')
  public async getMatchedCompanies(req: Request, res: Response): Promise<void> {
    const { query } = req;
  }
}
