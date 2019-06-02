const express = require('express');
const router = express.Router();
const passport = require('passport');
const Usuario = require('../../store/user');
const bcrypt = require('bcrypt');


var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    async (email, password, done) => {
        const user = await Usuario.User.findOne({ email }).select('+password');

        if (!user)
            return done(null, false, { message: 'Usuário desconhecido' });

        if (!await bcrypt.compare(password, user.password))
            return done(null, false, { message: 'Senha inválida' });

        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

router.post('/callback',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        console.log(req.user);
        res.redirect('/');
    }
);

module.exports = router;