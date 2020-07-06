import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
// eslint-disable-next-line import/no-unresolved
import { Params } from 'express-serve-static-core';
import { AxiosResponse } from 'axios';
import { inject } from 'inversify';
import { TStockQuery } from '../typings/stock-data.type';
import { AlphaFunction, SERVICE_IDS } from '../common/constants';
import { StockDataService } from './stock-data.dt';
// services missing to catch not 200 status for alphaApi
@controller('/api/v1/stock')
export class StockDataController {
  constructor(@inject(SERVICE_IDS.StockDataService) private stockDataService: StockDataService) {}

  @httpGet('/days')
  public async getDailyInfo(req: Request<Params, never, never, TStockQuery>, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await this.stockDataService
        .fetchStockSeries({
          params: {
            function: AlphaFunction.DAILY,
            ...query,
          },
        })
        .then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/weeks')
  public async getWeeklyInfo(req: Request<Params, never, never, TStockQuery>, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await this.stockDataService
        .fetchStockSeries({
          params: {
            function: AlphaFunction.WEEKLY,
            ...query,
          },
        })
        .then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/months')
  public async getMonthlyInfo(req: Request<Params, never, never, TStockQuery>, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await this.stockDataService
        .fetchStockSeries({
          params: {
            function: AlphaFunction.MONTHLY,
            ...query,
          },
        })
        .then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/latest')
  public async getLatestInfo(req: Request<Params, never, never, TStockQuery>, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await this.stockDataService
        .fetchStockLatest({
          params: {
            function: AlphaFunction.LATEST,
            ...query,
          },
        })
        .then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }
}
