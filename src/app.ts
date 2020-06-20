import 'reflect-metadata';
import path from 'path';
import express, { Application, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import './stock-data/stock-data.controller';

const container = new Container();
const server = new InversifyExpressServer(container);
server.setConfig((app: Application) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
});
server.build().listen(3000, () => console.log('Server is not listening on port 3000'));
