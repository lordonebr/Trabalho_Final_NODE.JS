var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var md5 = require('md5');
const Service = require('../routes/api');

  router.get('/', function(req, res, next) {
    res.render('search');
  });
  
  router.post('/findByName', function(req, res){
    
    Service.ServiceBase('characters', 'nameStartsWith', req.body.name)
    .then(json => {
        //console.log(json);
        res.render('search', json);
        //res.json(json);
      });

    /*var publicKey = 'badb7eca459bfa1204d894bfed07aa99';
    var privateKey = '768abe4345a26a3214483fca33bd5c9bdb5db7dd';
    var ts = Date.now().toString();
    var hash = md5(ts + privateKey + publicKey);
  
    var nameParam = 'nameStartsWith=' + req.body.name;
    var apikeyParam = 'apikey=' + publicKey;
    var tsParam = 'ts=' + ts;
    var hashParam = 'hash=' + hash;
    var urlParams = nameParam + '&' + tsParam + '&' + apikeyParam + '&' + hashParam;
  
    var url = 'https://gateway.marvel.com:443/v1/public/characters?' + urlParams;
    console.log('Url = ' + url);
    fetch(url)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      res.render('search', json);
      //res.json(json);
    });*/
  
  });

  module.exports = router;