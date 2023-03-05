var http = require('http');
var url = require('url');
var axios = require('axios');
var mypages = require('./mypages');
var singlePerson = require('./singlePerson');
var sexDistribution = require('./sexDistribution');
var sportsDistribution = require('./sportsDistribution');
jobsDistribution = require('./jobsDistribution');
var fs = require('fs');

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16);
    console.log("Recebi um pedido: " + req.method + " " + req.url + " às " + d);
    var dicURL = url.parse(req.url, true);
    if (dicURL.pathname == "/"){
        axios.get('http://localhost:3000/pessoas').then(function (response) {
            var pessoas = response.data;
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname.startsWith("/p")){
        var id = dicURL.pathname.substring(1);
        axios.get('http://localhost:3000/pessoas?id=' + id).then(function (response) {
            var pessoa = response.data;
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(singlePerson.pessoasPage(pessoa[0]));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname == "/sexo"){
        var id = dicURL.pathname.substring(1);
        axios.get('http://localhost:3000/pessoas').then(function (response) {
            var pessoas = {};
            for (let i = 0; i < response.data.length; i++) {
                if (pessoas.hasOwnProperty(response.data[i].sexo)) {
                    pessoas[response.data[i].sexo] += 1;
                } else {
                    pessoas[response.data[i].sexo] = 1;
                }
            }
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(sexDistribution.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname.startsWith("/sexo=")){
        var sexo = dicURL.pathname.substring(6);
        axios.get('http://localhost:3000/pessoas?sexo=' + sexo).then(function (response) {
            var pessoas = response.data;
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname == "/desporto"){
        var id = dicURL.pathname.substring(1);
        axios.get('http://localhost:3000/pessoas').then(function (response) {
            var pessoas = {};
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].desportos.forEach(element => {
                    if (pessoas.hasOwnProperty(element)) {
                        pessoas[element] += 1;
                    } else {
                        pessoas[element] = 1;
                    }
                });
            }
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(sportsDistribution.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname.startsWith("/desporto=")){
        var desporto = dicURL.pathname.substring(10);
        desporto = desporto.replaceAll('%20', ' ');
        axios.get('http://localhost:3000/pessoas').then(function (response) {
            var pessoas = [];
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].desportos.forEach(element => {
                    if (element == desporto) {
                        pessoas.push(response.data[i]);
                    }
                });
            }
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname == "/jobs"){
        axios.get('http://localhost:3000/pessoas').then(function (response) {
            var pessoas = {};
            for (let i = 0; i < response.data.length; i++) {
                if (pessoas.hasOwnProperty(response.data[i].profissao)) {
                    pessoas[response.data[i].profissao] += 1;
                } else {
                    pessoas[response.data[i].profissao] = 1;
                }
            }
            var items = Object.keys(pessoas).map(function(key) {
                return [key, pessoas[key]];
              });
              
            items.sort(function(first, second) {
                return second[1] - first[1];
            });
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(jobsDistribution.pessoasPage(items.slice(0, 10)));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname.startsWith("/job=")){
        var profissao = dicURL.pathname.substring(5);
        profissao = profissao.replaceAll('%20', ' ');
        axios.get('http://localhost:3000/pessoas?profissao=' + profissao).then(function (response) {
            var pessoas = response.data;
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname == "/ordenada"){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc').then(function (response) {
            var pessoas = response.data;
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname == "/ordenadav2"){
        axios.get('http://localhost:3000/pessoas').then(function (response) {
            var pessoas = response.data;
            let pessoasOrdenadas = pessoas.sort((p1, p2) => (p1.nome < p2.nome)? -1 : 1);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        }).catch( error => {
            console.log(error);
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf-8'});
            res.end("Erro: " + error);
        });
    } else if (dicURL.pathname == "/w3.css"){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                console.log("Erro na leitura da stylesheet.")
                res.write("Erro: " + err)
            }
            else
                res.write(data)
            res.end()
        })
    } else {
        res.writeHead(404, {'Content-Type': 'text/html', 'charset': 'utf-8'});
        res.end("Erro: Operação não suportada!");
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...");
