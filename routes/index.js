var express = require('express');
var router = express.Router();

router.get('/', require('connect-ensure-login').ensureLoggedIn(), async (req, res, next) => {
    res.render('index');
});

module.exports = router;
