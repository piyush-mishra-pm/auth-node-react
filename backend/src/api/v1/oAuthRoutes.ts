import { Router } from 'express';
import { sign } from 'jsonwebtoken';
import passport from 'passport';

const oAuthRouter = Router();

oAuthRouter.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

oAuthRouter.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    async (req: any, res) => {
        console.log('callback google:', req.user);
        const token = sign({ _id: req.user._id }, process.env.JWT_SECRET || 'secret_key');
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1day expiry
        res.redirect(process.env.AUTH_SUCCESS_REDIRECT + '/' + token || '/');
    }
);

// todo: Not currently used:
oAuthRouter.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
});


oAuthRouter.get(
    '/profile',
    passport.authenticate('jwt', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        res.render('profile', { user: req.user });
    }
);

export default oAuthRouter;