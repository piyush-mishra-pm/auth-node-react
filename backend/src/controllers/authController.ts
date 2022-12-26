import { NextFunction, Request,Response } from "express";
import { Joi } from "express-validation";
import bcryptjs from "bcryptjs";

import { UserModel } from "../models/UserModel";

const registerValidation = Joi.object({
    first_name:Joi.string().required(),
    last_name:Joi.string(),
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    password_confirm:Joi.string().required(),
});

export async function register(req:Request, res:Response){

    try{
        // Validation errors:
        const {error} = await registerValidation.validateAsync(req.body);
        if(error){
            return res.status(400).send(`Invalid inputs: ${error.message}`);
        }
        if(req.body.password !== req.body.password_confirm){
            return res.status(400).send(`Invalid inputs: passwords don't match`);
        }
        // Does user Already Exists?
        const existingUser = await UserModel.findOne({ email:req.body.email });

        if(existingUser){ 
            return res.status(400).send('Email already exists. Could not Signup the user!');
        }
        
        const salt = await bcryptjs.genSalt(10);    
        const encryptedPassword = await bcryptjs.hash(req.body.password,salt);

        const newUser = new UserModel({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email: req.body.email,
            password: encryptedPassword
        });
        
        const saveDbResult = await newUser.save();
        const {password, ...savedDbResultWithoutPassword} = saveDbResult.toJSON();

        return res.send(savedDbResultWithoutPassword);
    }catch(e){
        console.log('SignUp failed: ', e);
        return res.status(500).send(`Something went wrong in signUp!${e}`);
    }
}