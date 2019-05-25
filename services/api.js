var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var md5 = require('md5');

function ServiceBase(serviceName, paramTag, paramValue){

  var publicKey = 'badb7eca459bfa1204d894bfed07aa99';
  var privateKey = '768abe4345a26a3214483fca33bd5c9bdb5db7dd';
  var ts = Date.now().toString();
  var hash = md5(ts + privateKey + publicKey);

  var apikeyParam = 'apikey=' + publicKey;
  var urlParams = apikeyParam;
  
  var tsParam = 'ts=' + ts;
  var hashParam = 'hash=' + hash;
  urlParams += '&' + tsParam + '&' + hashParam;
  
  console.log('paramTag: ' + paramTag);
  if(paramTag != '' && paramTag != undefined){
    var param1 = paramTag + '=' + paramValue;
    urlParams += '&' + param1;
  }

  var url = 'https://gateway.marvel.com:443/v1/public/' + serviceName + '?' + urlParams;
  console.log('Url = ' + url);

  return new Promise(function(resolve, reject) {
    fetch(url)
    .then(res => res.json())
    .then(json => {
      //console.log(json);
      resolve(json);
    })
    .catch(() => {
      reject('error');
    });
  });
};

module.exports = {

  CharactersByStartName : function(nameStart){
    
    return new Promise(function(resolve, reject) {

      ServiceBase('characters', 'nameStartsWith', nameStart)
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject('Erro ao obter personagens: ' + error);
      });
    });

  },
  ChatacterById : function(idChatacter){

    return new Promise(function(resolve, reject) {

      ServiceBase('characters/'+idChatacter.toString())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        reject('Erro ao obter personagem: ' + error);
      });
    });

  }

}
