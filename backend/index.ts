require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {configureRouter} from './src/api/v1/routes';

mongoose
  .connect(process.env.MONGO_DB_URL || 'mongodb://localhost:27017/auth_node_react')
  .then(() => console.log('Connected to db'))
  .catch(() => console.log('Error connecting to DB'));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'https://localhost:3000', credentials: true}));

configureRouter(app);

app.listen(process.env.PORT || 8000, () => {
  console.log('listeing on port 8000');
});
