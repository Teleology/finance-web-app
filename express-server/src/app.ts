import 'reflect-metadata';
import * as path from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as morgan from 'morgan';
import './stock-data/stock-data.controller';
import './company-search/company-search.controller';
import { serviceIDS } from './common/constants';
import { StockDataService } from './stock-data/stock-data.dt';

const container = new Container();
container.bind(serviceIDS.StockDataService).to(StockDataService);

const server = new InversifyExpressServer(container);
server.setConfig((app: express.Application) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public/dist/')));
});

// C5TADQOPXWJ7BF35
// fJdJdNzONFfvCJKow8BFU8OzuuxRAqVVI2BG24PhGrH0HEIcPR
server.build().listen(3000, () => console.log('Server is not listening on port 3000'));
