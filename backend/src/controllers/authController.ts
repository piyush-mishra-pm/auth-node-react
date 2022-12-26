import { Request,Response } from "express";
import { Joi } from "express-validation";

const registerValidation = Joi.object({
    first_name:Joi.string().required(),
    last_name:Joi.string(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    password_confirm:Joi.string().required(),
});

export function register(req:Request, res:Response){
    const {error} = registerValidation.validate(req.body);
    if(error){
        return res.status(400).send(error.message);
    }
    if(req.body.password !== req.body.password_confirm){
        return res.status(400).send("passwords don't match");
    }
    return res.send(req.body);
}