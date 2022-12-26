import express, {Request, Response} from 'express';
import { configureRouter } from './src/api/v1/routes';
import mongoose from 'mongoose';

mongoose
    .connect('mongodb://localhost:27017/auth_node_react')
    .then(()=>console.log('Connected to db'))
    .catch(()=>console.log('Error connecting to DB'));


const app =express();

app.use(express.json());

configureRouter(app);

app.listen(8000,()=>{
    console.log('listeing on port 8000');
});