import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { serviceIDS } from '../common/string-utils';
import { baseURL } from '../common/network-utils';
import { StockDataService } from './stock-data.service';
@controller(`${baseURL}/stock`)
class StockDataController {
  constructor(@inject(serviceIDS.StockDataService) private stockDataService: StockDataService) {}

  @httpGet('/days')
  public async getDailyInfo(req: Request, res: Response): Promise<void> {
    const {
      query: { symbol }
    } = req;
    try {
      const response = await this.stockDataService.fetchDailyStockSeries(symbol as string);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/weeks')
  public async getWeeklyInfo(req: Request, res: Response): Promise<void> {
    const {
      query: { symbol }
    } = req;
    try {
      const response = await this.stockDataService.fetchWeeklyStockSeries(symbol as string);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/months')
  public async getMonthlyInfo(req: Request, res: Response): Promise<void> {
    const {
      query: { symbol }
    } = req;
    try {
      const response = await this.stockDataService.fetchMonthlyStockSeries(symbol as string);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }

  @httpGet('/latest')
  public async getLatestInfo(req: Request, res: Response): Promise<void> {
    const {
      query: { symbol }
    } = req;
    try {
      const response = await this.stockDataService.fetchLatestStock(symbol as string);
      res.status(200).json(response);
    } catch (ex) {
      console.error(ex);
      res.status(500).send('stock data error');
    }
  }
}

export { StockDataController };
