import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { AxiosResponse } from 'axios';
import { inject } from 'inversify';
import { AlphaFunction, serviceIDS } from '../common/constants';
import { StockDataService } from './stock-data.service';
// services missing to catch not 200 status for alphaApi
@controller('/api/v1/stock')
export class StockDataController {
  constructor(@inject(serviceIDS.StockDataService) private stockDataService: StockDataService) {}

  @httpGet('/days')
  public async getDailyInfo(req: Request, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await this.stockDataService
        .fetchStockSeries({
          params: {
            function: AlphaFunction.DAILY,
            ...query
          }
        })
        .then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/weeks')
  public async getWeeklyInfo(req: Request, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await this.stockDataService
        .fetchStockSeries({
          params: {
            function: AlphaFunction.WEEKLY,
            ...query
          }
        })
        .then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/months')
  public async getMonthlyInfo(req: Request, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await this.stockDataService
        .fetchStockSeries({
          params: {
            function: AlphaFunction.MONTHLY,
            ...query
          }
        })
        .then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/latest')
  public async getLatestInfo(req: Request, res: Response): Promise<void> {
    const { query } = req;
    try {
      const response = await this.stockDataService
        .fetchStockLatest({
          params: {
            function: AlphaFunction.LATEST,
            ...query
          }
        })
        .then((response: AxiosResponse) => response.data);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }
}
