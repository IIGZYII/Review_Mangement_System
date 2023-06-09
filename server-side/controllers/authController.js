import passport from 'passport';
import userModel from '../models/userModel.js';

class AuthController {
    static signupUser(req, res, next) {
        userModel.createUser(req.email, req.pwd);
    }

    static loginUser(req, res, next) {
        passport.authenticate('local', {
            failureRedirect: '/login',
            successRedirect: '/secret',
        }),
        (req, res, next) => {
            console.log(req.user);
        };
    }

    static logoutUser(req, res) {
        req.logout();
        res.json({ message: 'Logout successful' });
    }
}

export default AuthController;