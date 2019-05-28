var localStorage;

if(typeof localStorage === "undefined" || localStorage === null){
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports ={
    armazenar(key,value){
        localStorage.setItem(key,value);
    },
    buscar(key){
        return localStorage.getItem(key);
    },
    deletar(key){
        localStorage.removeItem(key);
    }
}
