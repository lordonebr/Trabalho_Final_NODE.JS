var express = require('express');
var router = express.Router();
const Service = require('../services/api');
const LocalStorage = require('../routes/localStorage');
var listIdFavoritos = [];
var listMyFavorites =
{
    Title: "My favorites",
    Items: []
};

router.get('/', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
    res.send('Favoritos');
});

router.get('/adicionar/:id', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    if (id != undefined && id != null) {
        listIdFavoritos.push(id);
        LocalStorage.armazenar('favoritos', listIdFavoritos);
        res.send("Adicionado com sucesso !");
    } else {
        res.end("Erro ao recuperar id");
    }
});

router.get('/listar', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
    var count = 0;
    listMyFavorites.Items = [];
    var favoritos = LocalStorage.buscar("favoritos");
    var arraryFavoritos = favoritos.split(',');
    if (arraryFavoritos.length > 0) {
        arraryFavoritos.forEach(element => {
            Service.ChatacterById(element)
                .then(json => {
                    count++;
                    if (json.data.results.length == 1) {
                        listMyFavorites.Items.push(json.data.results[0]);
                    }
                    else
                        res.end('Erro ao obter personagem, o retorno da API não foi o esperado!');

                    if (count === arraryFavoritos.length) {
                        res.render('favoritos', listMyFavorites);
                    }
                })
                .catch(error => {
                    console.log(error);
                    res.end("Favorites list empty");
                })
        });
    }
});

router.get('/remover/:id', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
    var id = req.params.id;
    if (id != undefined && id != null) {
        for (var i = 0; i < listIdFavoritos.length; i++) {
            if (listIdFavoritos[i] == id) {
                listIdFavoritos.splice(i, 1);
            }
        }
        LocalStorage.armazenar('favoritos', listIdFavoritos);
        res.send("Removido com sucesso !");
    } else {
        res.end("Erro ao recuperar id");
    }
});

router.get('/isFavorito/:id', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
    var result = false;
    var id = req.params.id;
    if (id != undefined && id != null) {
        var favoritos = LocalStorage.buscar("favoritos");
        if (favoritos != undefined && favoritos != null) {
            var collectionFavoritos = favoritos.split(',');
            for (var i = 0; i < collectionFavoritos.length; i++) {
                if (collectionFavoritos[i] == id) {
                    result = true;
                    break;
                }
            }
        }
    }
    res.send(result);
})

module.exports = router;