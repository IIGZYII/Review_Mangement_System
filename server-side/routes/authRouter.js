import passport from 'passport';
import LocalStrategy from 'passport-local';

import express from 'express';
import AuthController from '../controllers/authController.js';

const authRouter = express.Router();

// Configure passport to use the local strategy
passport.use(new LocalStrategy((email, pwd, done) => {
    // verify the user
    UserModel.getUserByemail((email)).then((user) => {
        bcrypt.compare(pwd, user.pwd, (err, result) => {
            if (result) {
                done(null, user);
            }
        });
        return done(null, false);
    }).catch((err) => {
        return done(null, false);
    });
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
authRouter.post('/register', AuthController.signupUser);


// login logout
authRouter.post('/login', AuthController.loginUser);
authRouter.delete('/logout', AuthController.logoutUser);

authRouter.get('/secreate', (req, res, next) => {
    if ( req.isAuthenticated() ) res.send("Success!");
    res.send("Fail");
})


export default authRouter;
