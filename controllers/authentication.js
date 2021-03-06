const User   = require('../models/user');
const jwt    = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
    const timeStamp = new Date().getTime();
    // Subject property and iat(time property) and secret key is given for encode
    // CHECK : https://jwt.io/
    return jwt.encode({ sub: user.id, iat: timeStamp}, config.secret);
}

exports.signup = function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        return res.status(422).send({error: 'You must provide an email and a password'});
    }

    console.log('Email    : ', email);
    console.log('Password : ', password);

    // See if a user with the given email exists
    User.findOne({email: email}, function(err, existingUser) {
        if(err) {
            return next(err);
        }

        // If a user with given email does exist, return an error
        if(existingUser) {
            return res.status(422).send({error: 'Email is in use'}); // 422: not processable entity
        }

        // If a user with given email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        }); // Create a new user

        // And save the database
        user.save(function (err) {
            if(err) {
                return next(err);
            }

            // Respond to request indicating user was created
            return res.json({token: tokenForUser(user)});
        });
    });
};

exports.signin = function (req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    res.send({token: tokenForUser(req.user)})
};