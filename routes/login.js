const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else
        res.status(401).render('login', { title: 'Marvel', style: 'login.css' });
});

module.exports = router;