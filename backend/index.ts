require('dotenv').config();

import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {configureRouter} from './src/api/v1/routes';
import ErrorObject from './src/utils/ErrorObject';

mongoose
  .connect(process.env.MONGO_DB_URL || 'mongodb://localhost:27017/auth_node_react')
  .then(() => console.log('Connected to db'))
  .catch(() => console.log('Error connecting to DB'));

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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

app.listen(process.env.PORT || 8000, () => {
  console.log('listeing on port 8000');
});


// //Sendgrid:
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'ifs.piyushmishra1991@gmail.com', // Change to your recipient
//   from: 'ifs.piyushmishra1991@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error: any) => {
//     console.error(error)
//   });