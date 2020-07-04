import { encode } from 'querystring';
import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { Params } from 'express-serve-static-core';
import { StockQueryType } from '../typings/stock-query.type';
@controller('/api/v1/stock')
export class StockDataController {
  @httpGet('/query')
  public getStockInfo(req: Request<Params, any, any, StockQueryType>, res: Response): void {
    try {
      console.log(encode(req.query));
      res.status(200).send('good data');
    } catch (ex) {
      res.status(500).send('stock data error');
    }
  }
}
