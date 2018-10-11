const passport = require('passport');
const config = require('../config');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const localStrategy = require('passport-local');


// Create localStrategy
const localOptions = {usernameField: 'email'};
const localLogin = new localStrategy(localOptions, function(email, password, done){
  //Verify that it is the correct username and Password
  //if it is call done with user
  //otherwise call done with false
  User.findOne({email:email}, function(err, user){
    if (err) { done(err);}
    if (!user) { return done(null, false);}

    //compare passwords
    user.comparePasswords(password, function(err, isMatch){
      if (err) { return done(err);}
      if (!isMatch) { return done(null, false);}
      return done(null, user);
    });
  })
});

// Setup JwtStrategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JwtStrategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  //See if the userId in the payload exists in our database
  //If it does, call done with a user Object
  //If it doesn't call done without a user Object
  User.findById(payload.sub, function(err, user){
    if (err) {return done(err, false);}
    if (user) {
       done(null, user);
     }else{
       done(null, false);
     }
  });
});


// Tell Passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
