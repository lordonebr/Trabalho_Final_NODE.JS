var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var md5 = require('md5');

var limitPage = 10;
var publicKey = 'badb7eca459bfa1204d894bfed07aa99';
var privateKey = '768abe4345a26a3214483fca33bd5c9bdb5db7dd';

function ServiceBase(serviceName, offset, paramTag, paramValue){

  var ts = Date.now().toString();
  var hash = md5(ts + privateKey + publicKey);

  var apikeyParam = 'apikey=' + publicKey;
  var urlParams = apikeyParam;
  
  var tsParam = 'ts=' + ts;
  var hashParam = 'hash=' + hash;
  urlParams += '&' + tsParam + '&' + hashParam;
  
  if(paramTag != '' && paramTag != undefined){
    var param1 = paramTag + '=' + paramValue;
    urlParams += '&' + param1;
  }

  var limitPageParam = 'limit=' + limitPage.toString();
  urlParams += '&' + limitPageParam;

  var offsetParam = 'offset=' + offset;
  urlParams += '&' + offsetParam;

  var url = 'https://gateway.marvel.com:443/v1/public/' + serviceName + '?' + urlParams;
  console.log('Url = ' + url);

  return new Promise(function(resolve, reject) {
    fetch(url)
    .then(res => res.json())
    .then(json => {

      //console.log(json);
      if(json.code != 200)
        reject('Error ' + json.code + ': ' + json.status);
      else
        resolve(json);
    })
    .catch(() => {
      reject('error');
    });
  });
};

module.exports = {

  CharactersByStartName : function(nameStart, offset){
    
    return new Promise(function(resolve, reject) {

      ServiceBase('characters', offset, 'nameStartsWith', nameStart)
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        console.log('Erro ao obter personagens: ' + error);
        reject(error);
      });
    });

  },
  ChatacterById : function(idChatacter){

    return new Promise(function(resolve, reject) {

      ServiceBase('characters/'+idChatacter.toString(), 0)
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        console.log('Erro ao obter personagem: ' + error);
        reject(error);
      });
    });

  },
  GetLimitPage : function(){
    return limitPage;
  },
  GetComicsByCharacter : function(idChatacter, offset){

    return new Promise(function(resolve, reject) {

      ServiceBase('characters/'+idChatacter.toString()+'/comics', offset)
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        console.log('Erro ao obter revistinhas: ' + error);
        reject(error);
      });
    });

  }

}
