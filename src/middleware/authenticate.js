const passport = require('passport');

function authenticate(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            return res.status(401).send(err || info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(401).send(err);
            }
            return next();
        });
    })(req, res, next);
}

module.exports = { authenticate };
