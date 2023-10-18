const passport = require('passport')
const mongoose = require('mongoose');

const model = require("../models/loginmodel")

var GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser((user , done) => { 
  done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
  done(null, user); 
}); 


passport.use(new GoogleStrategy({
    client_id:"269957605555-gknefh99vduske632lib6fs5idbl43mu.apps.googleusercontent.com",
    client_secret:"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",
    callbackURL: "http://localhost:9000/auth/google/callback",
    passReqToCallback: true

  },
  function(request,accessToken, refreshToken, profile, cb) {
    model.findOrCreate({ googleId: profile.id }, function (err, user) {

      // if(created) {
      //   user.created = true;
      //   user.profile = profile;
      //   // console.log("Created ",created);
      //   return cb(err, user);
      // } else {
      //   user.created = false;
      //    console.log('Updated "%s"', user.googleId);
         
      //   }
        return cb(err, user);   x
      });
  }
));