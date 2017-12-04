const authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function (app) {
    app.get('/dummy', requireAuth, function (req, res) {
        res.send({hi: "there"});
    });

    app.post('/signup', authentication.signup);
};
