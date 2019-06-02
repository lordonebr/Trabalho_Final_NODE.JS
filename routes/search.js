var express = require('express');
var router = express.Router();
const Service = require('../services/api');
const authMiddlewares = require('../middlewares/auth');

  router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    res.render('search');
  });

  router.post('/', function(req, res, next) {

    console.log('name = ' + req.body.name)
    console.log('offset = ' + req.body.offset)
    if(req.body.name){

      let offsetVal = '0';
      if(req.body.offset)
        offsetVal = req.body.offset;

      Service.CharactersByStartName(req.body.name, offsetVal)
      .then(json => {
          json.search = req.body.name;

          // calcula o número de páginas considerando o máximo de itens por página
          if(json.data.total > 0){
            var pages = [];
            var numPages = Math.ceil(json.data.total / Service.GetLimitPage());
            for (i = 0; i < numPages; i++){

              let page = {
                idx : i + 1,
                searchName : req.body.name,
                offset : (i*Service.GetLimitPage())
              };

              if(page.offset == offsetVal)
                page.active = 1;

              pages.push(page);
            }
            json.pages = pages;
          }

          res.render('search', json);
        })
        .catch(error => {
          console.log(error);
          res.end(error)
      })
    }
    else
      res.render('search');

  });

  module.exports = router;