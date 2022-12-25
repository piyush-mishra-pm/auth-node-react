import { Router, Request, Response } from "express";
import { register } from "../../controllers/authController";

export function configureRouter(router: Router) {
    router.get('/api/v1/register', (req: Request,res:Response)=>res.send('soon you can register.'));
    router.get('/',(req:Request,res:Response)=> res.send('Welcome'));
    router.post('/api/v1/register', register);
}
