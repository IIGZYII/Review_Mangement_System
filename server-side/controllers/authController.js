import passport from 'passport';

class AuthController {
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