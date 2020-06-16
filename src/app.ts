import express, { Application, urlencoded } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
export const setApp = (app: Application) => {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  return app;
};

setApp(express()).listen('3000');
