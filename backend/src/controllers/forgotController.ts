import { Request, Response } from 'express';
import { Joi } from 'express-validation';
import { createTransport } from 'nodemailer';
import bcryptjs from 'bcryptjs';

import { ResetUserModel } from '../models/ResetUserModel';
import { UserModel } from '../models/UserModel';


const forgotValidation = Joi.object({
    email: Joi.string().email().required(),
});

const resetValidation = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required()
});

const mailTransporter = createTransport({ host: '0.0.0.0', port: 1025 });

export async function forgot(req: Request, res: Response) {
    // Validation:
    try {
        await forgotValidation.validateAsync(req.body);
    } catch (e: any) {
        return res.status(400).send(`Invalid inputs: ${e.message}`);
    }
    try {
        const email = req.body.email;

        // Whether email registered?
        const foundEmailUser = await UserModel.findOne({ email });
        if (!foundEmailUser) {
            return res.status(400).send('No such email registered! Will not generate token.');
        }

        // todo: Better tokens with UUID library.
        const token = Math.random().toString(20).substring(2, 12);

        const newReset = new ResetUserModel({ email, token });

        await newReset.save()
        const redirectUrl = `http://localhost:3000/api/v1/reset/${token}`;
        await mailTransporter.sendMail({
            from: 'admin@example.com',
            to: email,
            subject: 'Reset your Password',
            html: `Click <a href="${redirectUrl}">here</a> to reset Password`
        });
        return res.send(`Send token ${token} to your Email and SMS.`);
    } catch (e) {
        console.log(`Error during forgot: ${e}`);
        return res.status(500).send('Something wrong happened!');
    }
}

// Token not arriving from message body, but as query param.
export async function reset(req: Request, res: Response) {
    // Validation:
    try {
        await resetValidation.validateAsync(req.body);
    } catch (e: any) {
        return res.status(400).send(`Invalid inputs: ${e.message}`)
    }

    // Passwords don't match?
    if (req.body.password !== req.body.password_confirm)
        return res.status(400).send(`Invalid inputs. Passwords and Confirm-Password fields don't match.`);

    // Token stored? { todo : Expire token}
    const foundResetData = await ResetUserModel.findOne({ token: req.body.token });
    if (!foundResetData) {
        return res.status(400).send(`Token ${req.body.token} does not exist.`);
    }

    // Email user found?
    const email = foundResetData.toJSON().email;

    // User found?
    const foundUser = await UserModel.findOne({ email });
    if (!foundUser)
        return res.status(400).send('Cannot find any user with such an email id.');

    // Creating new password:
    const salt = await bcryptjs.genSalt(process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
    const hashedNewPassword = await bcryptjs.hash(req.body.password, salt);

    // Setting new password:
    foundUser.password = hashedNewPassword;
    foundUser.save();

    // Delete token:

    res.send('success');
}
