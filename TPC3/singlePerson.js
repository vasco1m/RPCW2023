exports.pessoasPage = function (pessoa) {
    var pagHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="w3.css">
            <title>About People...</title>
        </head>
        <body>
            <div class="w3-card">
                <h1><b>Nome: </b>${pessoa.nome}</h1>
                <p><b>Idade: </b>${pessoa.idade}</p>
                <p><b>Sexo: </b>${pessoa.sexo}</p>
                <p><b>Morada: </b>${pessoa.morada.cidade}</p>
                <p><b>BI: </b>${pessoa.BI}</p>
                <p><b>Profissão: </b>${pessoa.profissão}</p>
                <p><b>Partido Político: </b>${pessoa.partido_politico.party_name}</p>
                <p><b>Religião: </b>${pessoa.religiao}</p>
            </div>
        </body>
    </html>
    `
    return pagHtml;
}