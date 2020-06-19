import express, { NextFunction, Request, Response, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/home', (req: Request, res: Response, _next: NextFunction) => {
  console.log('I am home');
  res.send('I am home Ilohafffabc');
});

const server = http.createServer(app);
server.listen(3000);
