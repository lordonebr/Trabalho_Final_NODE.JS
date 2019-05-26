var express = require('express');
var router = express.Router();
const Service = require('../services/api');

  router.get('/:id/:numPageComics', function(req, res, next) {

    Service.ChatacterById(req.params.id)
    .then(json => {
        if(json.data.results.length == 1){

          if(json.data.results[0].comics.available > 0){

            let numPageComics = parseInt(req.params.numPageComics);
            let offsetVal = (numPageComics-1) * Service.GetLimitPage();

            Service.GetComicsByCharacter(req.params.id, offsetVal)
            .then(jsonComics =>{

                json.data.results[0].lstComics = jsonComics.data.results;

                var pages = [];
                let firstPage = {
                  labelButton : '1',
                  numPage : 1,
                  idCharacter : req.params.id
                };
                if(numPageComics == 1)
                  firstPage.active = 1;

                pages.push(firstPage);

                let maxshowNumPages = 10;
                let pageShow = 2;
                if(numPageComics > maxshowNumPages){
                  pageShow = numPageComics - (maxshowNumPages/2);
                  let Previous = {
                    labelButton : 'Previous',
                    numPage : pageShow,
                    idCharacter : req.params.id
                  };

                  pages.push(Previous);
                  pageShow++;
                }

                var numPages = Math.ceil(json.data.results[0].comics.available / Service.GetLimitPage());
                for (i = pageShow; i < numPages; i++){

                  let page = {
                    labelButton : i.toString(),
                    numPage : i,
                    idCharacter : req.params.id
                  };

                  if(numPageComics == i)
                    page.active = 1;

                  pages.push(page);
                  if(
                    (numPageComics > maxshowNumPages && (i == (numPageComics + (maxshowNumPages/2) - 1))) ||
                    (numPageComics <= maxshowNumPages && i == maxshowNumPages)){

                      if(i+1 != numPages){
                        let Next = {
                          labelButton : 'Next',
                          numPage : i + 1,
                          idCharacter : req.params.id
                        };
                        pages.push(Next);
                      }

                      break;
                    }
                }

                let lastPage = {
                  labelButton : numPages.toString(),
                  numPage : numPages,
                  idCharacter : req.params.id
                };
                if(numPageComics == numPages)
                  lastPage.active = 1;

                pages.push(lastPage);

                json.data.results[0].pagesComics = pages;

                res.render('character', json.data.results[0]);
            })
            .catch(error => {
              console.log(error);
              res.end(error)
            });
          }
          else
            res.render('character', json.data.results[0]);
        }
        else
          res.end('Erro ao obter personagem, o retorno da API não foi o esperado!');
      })
      .catch(error => {
        console.log(error);
        res.end(error)
    })
  });

  module.exports = router;