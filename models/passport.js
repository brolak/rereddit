var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/UserModel');
var jwt = require('jsonwebtoken');

passport.use(new Strategy({
    clientID: '203021823534675',
    clientSecret: 'db8b6d77fb30efb94593b0b5ae9e532f',
    callbackURL: 'http://localhost:8000/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({'socialId': profile.id}, function(err,user){
      if(err){
        return done(err);
      }
      if(!user){
        user = new User({
          socialId: profile.id,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : "",
          provider: 'facebook',
          loginCount: 0
        })
      } else {
        user.loginCount++;
      }
      user.save(function(err,newUser){
        if(err){
          return done(err);
        } else {
          var token = jwt.sign({id: newUser.id, name: newUser.name}, 'thisIsTopSecret', { expiresIn: "7d" });
          console.log(newUser.id);
          return done(null,{token:token,name:newUser.name});
        }
      })
    })
  }
));

module.exports = passport;
