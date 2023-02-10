import * as KEYS from './config/envKeys';

import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { configureRouter } from './api/v1/routes';
import ErrorObject from './utils/ErrorObject';
import passport from 'passport';
import * as UserModel from './models/UserModel';

import oAuthRouter from './api/v1/oAuthRoutes';

mongoose
  .connect(KEYS.MONGO_DB_URL || 'mongodb://localhost:27017/auth_node_react')
  .then(() => console.log('Connected to db'))
  .catch(() => console.log('Error connecting to DB'));

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(passport.initialize());
import * as passoportService from './services/passport';
app.use('/api/v1', oAuthRouter);

configureRouter(app);

// Default Error Handler:
app.use((error: ErrorObject, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.statusCode || 500);
  res.send({ success: 'false', message: error.message || 'Something wrong happened!', data: error.data });
});

// Path Not found:
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404)
  res.send('invalid path')
});

app.listen(KEYS.PORT_BE || 8000, () => {
  console.log('listeing on port 8000');
});