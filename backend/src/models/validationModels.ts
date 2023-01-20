import { Joi } from "express-validation";

export const registerValidation = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
    captcha: Joi.string().optional
});

