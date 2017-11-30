const User = require('../models/user');

exports.signup = function (req, res, next) {


    const email = req.body.email;
    const password = req.body.password;
    console.log('Email    : ', email);
    console.log('Password : ', password);

    // See if a user with the given email exists
    User.findOne({email: email}, function(error, existingUser) {

    });

    // If a user with given email does exist, return an error


    // If a user with given email does NOT exist, create and save user record


    // Respond to request indicating user was created

};