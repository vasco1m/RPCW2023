const axios = require('axios');

axios.get('http://localhost:3000/pessoas')
    .then(function (response) {
        var pessoas = response.data;
        console.log(typeof pessoas);
        console.dir(pessoas[3].nome);
        console.log("Recuperei: " + pessoas.length);
    }).catch( error => {
        console.log(error);
    });