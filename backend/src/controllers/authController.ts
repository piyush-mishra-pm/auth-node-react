import {Request, Response} from 'express';
import {Joi} from 'express-validation';
import bcryptjs from 'bcryptjs';
import {sign, verify} from 'jsonwebtoken';

import {UserModel} from '../models/UserModel';

const registerValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  password_confirm: Joi.string().required(),
  captcha: Joi.string().optional
});

const loginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export async function register(req: Request, res: Response) {
  try {
    // Validation errors:
    const {error} = await registerValidation.validateAsync(req.body);
    if (error) {
      return res.status(400).send(`Invalid inputs: ${error.message}`);
    }
    if (req.body.password !== req.body.password_confirm) {
      return res.status(400).send(`Invalid inputs: passwords don't match`);
    }
    // Does user Already Exists?
    const existingUser = await UserModel.findOne({email: req.body.email});

    if (existingUser) {
      return res.status(400).send('Email already exists. Could not Signup the user!');
    }
    const salt = await bcryptjs.genSalt(process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10);
    const encryptedPassword = await bcryptjs.hash(req.body.password, salt);

    const newUser = new UserModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: encryptedPassword,
    });

    const saveDbResult = await newUser.save();
    const {password, ...savedDbResultWithoutPassword} = saveDbResult.toJSON();

    return res.send(savedDbResultWithoutPassword);
  } catch (e) {
    console.log('SignUp failed: ', e);
    return res.status(500).send(`Something went wrong in signUp!${e}`);
  }
}

export async function login(req: Request, res: Response) {
  // Validation
  try {
    await loginValidation.validateAsync(req.body);
  } catch (e: any) {
    return res.status(400).send(`Invalid inputs: ${e.message}`);
  }

  try {
    // Whether User Found:
    const foundUser = await UserModel.findOne({email: req.body.email});
    if (!foundUser) {
      return res.status(400).send('Invalid Credentials!');
    }

    // Whether Password matched:
    const isPasswordMatching = await bcryptjs.compare(req.body.password, foundUser.password);
    if (!isPasswordMatching) {
      return res.status(400).send('Invalid Credentials!');
    }

    // Create JWT and send Cookies:
    const token = sign({_id: foundUser._id}, process.env.JWT_SECRET || 'secret_key');
    res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}); // 1day expiry
    res.send({message: 'success'});
  } catch (e: any) {
    console.log('Error in Login: ', e);
    return res.status(500).send(`Something went wrong during Login! ${e}`);
  }
}

// todo: token refresh when expired: Redirect to login or refresh token?
export async function user(req: Request, res: Response) {
  let jwtPayload: any;
  try {
    const jwtCookie = req.cookies['jwt'];
    jwtPayload = verify(jwtCookie, process.env.JWT_SECRET || 'secret_key');
    if (!jwtPayload) {
      return res.status(400).send('unauthenticated');
    }
  } catch (e) {
    // refresh token or redirect
    return res.status(400).send('Token expired. Logged out.');
  }

  try {
    const userFound = await UserModel.findOne({_id: jwtPayload._id});
    if (!userFound) {
      return res.status(400).send('unauthenticated');
    }
    const {password, ...restUserDataWithoutPassword} = await userFound.toJSON();
    res.send(restUserDataWithoutPassword);
  } catch (e) {
    return res.status(500).send('Something wrong happened while getting user.');
  }
}

export async function logout(req: Request, res: Response) {
  // deleting the JWT cookie.
  res.cookie('jwt', '', { maxAge: 0 });
  res.send({ message: 'success' });
}