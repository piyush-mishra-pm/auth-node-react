import { Router, Request, Response } from "express";
import { login, logout, register, user } from '../../controllers/authController';
import { forgot, reset } from '../../controllers/forgotController';
import checkRecaptcha from '../../middlewares/checkRecaptcha';

export function configureRouter(router: Router) {
    router.get('/api/v1/register', (req: Request,res:Response)=>res.send('soon you can register.'));
    router.get('/',(req:Request,res:Response)=> res.send('Welcome'));
    router.post('/api/v1/register', checkRecaptcha, register);
    router.post('/api/v1/login', login);
    router.get('/api/v1/user',user);
    router.post('/api/v1/logout', logout);

    router.post('/api/v1/forgot', forgot);
    router.post('/api/v1/reset', reset);
}
