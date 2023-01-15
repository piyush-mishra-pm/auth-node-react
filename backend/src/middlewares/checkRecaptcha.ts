
import axios from "axios";
import { NextFunction, Request, Response } from "express";

export default async function checkRecaptcha(req: Request, res: Response, next: NextFunction) {
    if (!req.body.captcha) {
        return res.status(400).send('Recaptcha failed');
    }

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCA_SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.socket.remoteAddress}`;
    try {
        const verificationReponse = await axios.post(verificationUrl);
        if (!verificationReponse.data.success) {
            return res.status(400).send('Error during Captcha.');
        }
        req.body.captcha = undefined;
        return next();
    } catch (err) {
        return res.status(500).send('Error during Captcha.');
    }
}