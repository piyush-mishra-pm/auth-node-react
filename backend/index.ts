import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { configureRouter } from './src/api/v1/routes';

mongoose
    .connect('mongodb://localhost:27017/auth_node_react')
    .then(()=>console.log('Connected to db'))
    .catch(()=>console.log('Error connecting to DB'));


const app =express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:'https://localhost:3000',credentials:true}));

configureRouter(app);

app.listen(8000,()=>{
    console.log('listeing on port 8000');
});