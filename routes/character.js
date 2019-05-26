var express = require('express');
var router = express.Router();
const Service = require('../services/api');

  router.get('/:id', function(req, res, next) {
    Service.ChatacterById(req.params.id)
    .then(json => {
        if(json.data.results.length == 1)
          res.render('character', json.data.results[0]);
        else
          res.end('Erro ao obter personagem, o retorno da API não foi o esperado!');
      })
      .catch(error => {
        console.log('Erro ao retornar serviço: ' + error);
        res.status(res.status).end('Erro ao retornar serviço.');
    })
  });

  module.exports = router;