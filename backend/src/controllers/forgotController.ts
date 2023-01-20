import { NextFunction, Request, Response } from 'express';
import { Joi } from 'express-validation';
import { createTransport } from 'nodemailer';
import bcryptjs from 'bcryptjs';

import { ResetUserModel } from '../models/ResetUserModel';
import { UserModel } from '../models/UserModel';
import ErrorObject from '../utils/ErrorObject';

const mailTransporter = createTransport({ host: '0.0.0.0', port: 1025 });

export async function forgot(req: Request, res: Response, next: NextFunction) {
    let email;
    try {
        email = req.body.email;

        // Whether email registered?
        // todo: Shouldn't necessarily inform that email unregistered yet.
        // todo: just say that checkregistered email for forgot password, even if we don't find user.
        const foundEmailUser = await UserModel.findOne({ email });
        if (!foundEmailUser) {
            return next(new ErrorObject(400, 'No such email registered! Will not generate token.'));
        }
    } catch (e) {
        console.log(`Error during finding user by Email in Forgot Password: ${e}`);
        return next(new ErrorObject(500));
    }

    // todo: Better tokens with UUID library.
    const token = Math.random().toString(20).substring(2, 12);

    // Try saving the reset user model in DB:
    try {
        const newReset = new ResetUserModel({ email, token });
        await newReset.save()
    } catch (e) {
        console.log(`Error during forgot password: ${e}`);
        return next(new ErrorObject(500));
    }

    // Try sending the Forgot password mail containing token:
    try {
        const redirectUrl = `http://localhost:3000/reset/${token}`;
        await mailTransporter.sendMail({
            from: 'admin@example.com',
            to: email,
            subject: 'Reset your Password',
            html: `Click <a href="${redirectUrl}">here</a> to reset Password`
        });
        return res.status(200).send({ success: 'true', message: `Send token to your registered Email.` });
    } catch (e) {
        console.log(`Error during Forgot password mail generation: ${e}`);
        return next(new ErrorObject(500));
    }
}

export async function reset(req: Request, res: Response, next: NextFunction) {
    // Passwords don't match?
    if (req.body.password !== req.body.password_confirm)
        return next(new ErrorObject(400, `Invalid inputs. Passwords and Confirm-Password fields don't match.`));

    // Token stored?
    let foundResetData;
    try {
        if (!req.body.token) {
            return next(new ErrorObject(400, `Token missing in request body. Please use forgot password link sent in mail.`));
        }
        foundResetData = await ResetUserModel.findOne({ token: req.body.token });
        if (!foundResetData) {
            return next(new ErrorObject(400, `Invalid token ${req.body.token}.`));
        }
    } catch (e) {
        console.log(`Error in finding reset user model while resetting password: ${e}`);
        return next(new ErrorObject(500));
    }

    // todo : Expirable token?

    // Email user found?
    const email = foundResetData.toJSON().email;

    // User found?
    let foundUser;
    try {
        foundUser = await UserModel.findOne({ email });
        if (!foundUser)
            return next(new ErrorObject(400, 'Cannot find any user with such an email id.'));
    } catch (e) {
        console.log(`Error in finding user email while resetting password: ${e}`);
        return next(new ErrorObject(500));
    }

    // Creating new password:
    const salt = await bcryptjs.genSalt(process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
    const hashedNewPassword = await bcryptjs.hash(req.body.password, salt);

    // Setting new password:
    try {
        foundUser.password = hashedNewPassword;
        foundUser.save();
    } catch (e) {
        console.log(`Error in saving new password while resetting password: ${e}`);
        return next(new ErrorObject(500));
    }

    // todo: Delete the token after it was used:

    res.status(200).send({ success: 'true', message: 'Successfully changed password' });
    // todo: redirect, or clear cookies? So that tries to login again.
}
