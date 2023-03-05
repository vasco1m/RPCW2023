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
            <h1>Distribuição por Desporto</h1>
                <table class="w3-table-all" width="100%">
    `

    var items = Object.keys(lista).map(function(key) {
        return [key, lista[key]];
      });
      
      items.sort(function(first, second) {
        return second[1] - first[1];
      });

    
    for (const [key, value] of Object.entries(items)) {
        pagHtml +=
    `
    <tr>
    <td><input type="button" onclick="location.href='/desporto=${value[0]}';" value="${value[0]}"></td>
    <td>${value[1]}</td>
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