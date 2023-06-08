import passport from 'passport';
import LocalStrategy from 'passport-local';

import express from 'express';
import AuthController from '../controllers/authController.js';

const authRouter = express.Router();

// Configure passport to use the local strategy
passport.use(new LocalStrategy((username, password, done) => {
    // verify the user
    UserModel.xxxx
}));

passport.serializeUser((user, callback) => {
    process.nextTick(function () {
        return callback(null, user.id);
    });
});

passport.deserializeUser((id, callback) => {
    // Call the user retrieval logic from the UserController
    UserModel.getUserById(id)
        .then(user => callback(null, user))
        .catch(err => callback(err));
});

// register
authRouter.post('/register', (req, res) => {

});


// 
authRouter.post('/login', AuthController.loginUser);
authRouter.delete('/logout', AuthController.logoutUser);


export default authRouter;
