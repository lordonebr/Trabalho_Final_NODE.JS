const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '2026214964174993',
    clientSecret: 'f6cd887046108c0a75b7633e0fd2d832',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  
  function(accessToken, refreshToken, profile, cb) {
    return cb(undefined, profile);

    /*
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
     */
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});