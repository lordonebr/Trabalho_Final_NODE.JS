var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
var md5 = require('md5');

module.exports = {
  ServiceBase : function(serviceName, paramTag, paramValue){

    var publicKey = 'badb7eca459bfa1204d894bfed07aa99';
    var privateKey = '768abe4345a26a3214483fca33bd5c9bdb5db7dd';
    var ts = Date.now().toString();
    var hash = md5(ts + privateKey + publicKey);

    var param1 = paramTag + '=' + paramValue;
    var apikeyParam = 'apikey=' + publicKey;
    var tsParam = 'ts=' + ts;
    var hashParam = 'hash=' + hash;
    var urlParams = param1 + '&' + tsParam + '&' + apikeyParam + '&' + hashParam;

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
        reject('err');
      });
    });
  }
}
