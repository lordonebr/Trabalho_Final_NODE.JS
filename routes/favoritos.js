var express = require('express');
var router = express.Router();
const Service = require('../services/api');
const LocalStorage = require('../routes/localStorage');
var listFavoritos = [];

router.get('/', function (req, res) {
    res.send('Favoritos');
});

router.get('/adicionar/:id', function (req, res) {
    var id = req.params.id;
    if (id != undefined && id != null) {
        listFavoritos.push(id);
        LocalStorage.armazenar('favoritos', listFavoritos);
        res.send("Adicionado com sucesso !");
    } else {
        res.end("Erro ao recuperar id");
    }
});

router.get('/listar', function (req, res) {
    var favoritos = LocalStorage.buscar("favoritos");
    res.send(favoritos);
});

router.get('/remover/:id', function (req, res) {
    var id = req.params.id;
    if (id != undefined && id != null) {
        for(var i=0; i<listFavoritos.length; i++){
            if(listFavoritos[i] == id){
                listFavoritos.splice(i,1);
            }
        }
        LocalStorage.armazenar('favoritos', listFavoritos);
        res.send("Removido com sucesso !");
    } else {
        res.end("Erro ao recuperar id");
    }
});

router.get('/isFavorito/:id',function(req,res){
    var result = false;
    var id = req.params.id;
    if (id != undefined && id != null) {
        var favoritos = LocalStorage.buscar("favoritos");
        if(favoritos != undefined && favoritos != null){
            var collectionFavoritos = favoritos.split(',');
            for(var i=0; i<collectionFavoritos.length;i++){
                if(collectionFavoritos[i] == id){
                    result = true;
                    break;
                }
            }
        }
    }
    res.send(result);
})

module.exports = router;