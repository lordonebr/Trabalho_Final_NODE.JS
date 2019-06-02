const express = require('express');
const router = express.Router();
const facebookRouter = require('./facebook');
const localRouter = require('./local.js');

router.use('/facebook', facebookRouter);
router.use('/local', localRouter);

module.exports = router;