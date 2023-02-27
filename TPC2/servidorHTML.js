var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    var numPag = req.url.substring(1,4);
    console.log(numPag)
    if(numPag == '')
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            if(err) {
                res.write('Erro: ' + err);
            }
            else
                res.write(data);
            res.end();
        });
    else
        fs.readFile('arqsHTML/arq' + numPag + '.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            if(err) {
                res.write('Erro: ' + err);
            }
            else
                res.write(data);
            res.end();
    });
}).listen(7777);

console.log('Servidor à escuta na porta 7777...');