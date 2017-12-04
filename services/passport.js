const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for JWT Strategy
const jwtOptions = {};


// Crate JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // See if the user ID in tha payload exists in our database
    // if it does, call 'done' with that other -> They are allowed to access
    // otherwise, call 'done' without a user object -> That is not valid and don't let them in.

    User.findById(payload.sub, function (err, user) {
       if(err) {
           return done(err, false);
       }

       if(user)
           return done(null, user);     // If founded a user
       else
           return done(null, false);    // It means searching process is ok but can't found a valid user.
    });
});


// Tell passport to use this strategy
