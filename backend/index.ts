import express, {Request, Response} from 'express';
import { configureRouter } from './src/api/v1/routes';

const app =express();

app.use(express.json());

configureRouter(app);

app.listen(8000,()=>{
    console.log('listeing on port 8000');
});