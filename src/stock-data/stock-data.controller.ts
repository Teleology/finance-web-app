import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/api/v1/stock')
export class StockDataController {
  @httpGet('/info')
  public getStockInfo(req: Request, res: Response): void {
    try {
      res.status(200).send('good data');
    } catch (ex) {
      res.status(500).send('stock data error');
    }
  }
}
