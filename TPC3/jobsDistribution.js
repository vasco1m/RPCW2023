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
            <h1>Distribuição por Profissão</h1>
            <h2>Top 10</h2>
                <table class="w3-table-all">
    `
    for (const [key, value] of Object.entries(lista)) {
        pagHtml +=
    `
    <tr>
    <td><input type="button" onclick="location.href='/job=${value[0]}';" value="${value[0]}"></td>
    <td>${value[1]}</td>
    </tr>
    `
    }

    pagHtml += `
                </tr>
            </table>
        </body>
    </html>
    `

    return pagHtml;
}