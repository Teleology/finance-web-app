import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { serviceIDS } from '../common/string-utils';
import { baseURL } from '../common/network-utils';
import { CompanyInfoService } from './company-info.service';
@controller(`${baseURL}/company-info`)
class CompanyInfoController {
  constructor(@inject(serviceIDS.companyInfoService) private companyInfoService: CompanyInfoService) {}
  @httpGet('/detail')
  public async getDetail(req: Request, res: Response): Promise<void> {
    const {
      query: { symbol }
    } = req;
    try {
      const response = await this.companyInfoService.getDetails(symbol as string);
      res.status(200).json(response);
    } catch (ex) {
      console.log(ex);
      res.status(500).send('get company detail error');
    }
  }

  @httpGet('/news')
  public async getNews(req: Request, res: Response): Promise<void> {
    const {
      query: { keywords }
    } = req;
    try {
      const response = await this.companyInfoService.getNews(keywords as string);
      res.status(200).json(response);
    } catch (ex) {
      console.log(ex);
      res.status(500).send('get company detail error');
    }
  }
}

export { CompanyInfoController };
