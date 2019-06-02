const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('facebook'));

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        console.log(req.user);
        res.status(200).redirect('/');

        /*
        User.findOne({ 'facebook.id': profile.id }, function (err, user) {
            if (err) return done(err);
            if (user) return done(null, user);
            else {
                // if there is no user found with that facebook id, create them
                var newUser = new User();

                // set all of the facebook information in our user model
                newUser.facebook.id = profile.id;
                newUser.facebook.token = accessToken;
                newUser.facebook.name = profile.displayName;
                if (typeof profile.emails != 'undefined' && profile.emails.length > 0)
                    newUser.facebook.email = profile.emails[0].value;

                // save our user to the database
                newUser.save(function (err) {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });
         */
    });

module.exports = router;