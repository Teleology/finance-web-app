import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
// eslint-disable-next-line import/no-unresolved
import { Params } from 'express-serve-static-core';
import { AxiosResponse } from 'axios';
import { TStockQuery } from '../typings/stock-data.type';
import { fetchStock } from './stock-data.dt';
@controller('/api/v1/stock')
export class StockDataController {
  @httpGet('/days')
  public async getStockInfo(req: Request<Params, never, never, TStockQuery>, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await fetchStock({
        params: {
          function: 'TIME_SERIES_DAILY',
          ...query,
        },
      }).then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }
}
