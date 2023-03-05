exports.pessoasPage = function (lista) {
    var pagHtml = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <link rel="stylesheet" href="w3.css">
            <title>About People...</title>
        </head>
        <body>
            <h1>Lista de Pessoas</h1>
            <table class="w3-table-all">
                <tr>
                    <th>Id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                </tr>
    `

    for (let i = 0; i < lista.length; i++) {
        pagHtml += `
                <tr>
                    <td>${lista[i].id}</td><td><input type="button" onclick="location.href='/${lista[i].id}';" value=${lista[i].nome}></td><td>${lista[i].idade}</td><td>${lista[i].sexo}</td><td>${lista[i].morada.cidade}</td>
                </tr>
        `
    }

    pagHtml += `
            </table>
        </body>
    </html>
    `

    return pagHtml;
}