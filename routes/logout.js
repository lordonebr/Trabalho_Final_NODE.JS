const express = require('express');
const router = express.Router();

router.get('/', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;
