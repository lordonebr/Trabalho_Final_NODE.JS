var express = require('express');
var router = express.Router();
const config = require('../config');

var email = require('../services/email-services');

/* GET home page. */
router.get('/', function(req, res, next) {
  //email.send('hugovinicius94@yahoo.com.br', 'Sejá bem vindo API Marvel', config.emailTemplate.replace('{0}', 'Hugo'));
  res.render('login', { title: 'Marvel', style: 'login.css' });

});


//index  style

module.exports = router;
