import 'reflect-metadata';
import path from 'path';
import express, { Application, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import './stock-data/stock-data.controller';
import './company-search/company-search.controller';

const container = new Container();
const server = new InversifyExpressServer(container);
server.setConfig((app: Application) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public/dist/')));
});

// C5TADQOPXWJ7BF35
// fJdJdNzONFfvCJKow8BFU8OzuuxRAqVVI2BG24PhGrH0HEIcPR
server.build().listen(3000, () => console.log('Server is not listening on port 3000'));
