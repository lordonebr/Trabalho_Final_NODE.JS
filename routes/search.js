var express = require('express');
var router = express.Router();
const Service = require('../services/api');

  router.get('/', function(req, res, next) {
    res.render('search');
  });
  
  router.post('/findByName', function(req, res){
    
    Service.CharactersByStartName(req.body.name)
    .then(json => {
        json.search = req.body.name;
        res.render('search', json);
      })
      .catch(error => {
        console.log('Erro ao retornar serviço: ' + error);
        res.status(res.status).end('Erro ao retornar serviço.');
    })
  
  });

  module.exports = router;