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
            <h1>Distribuição por Sexo</h1>
                <table class="w3-table-all">
                    <tr>
    `
    for (const [key, value] of Object.entries(lista)) {
        pagHtml +=
    `
    <td><input type="button" onclick="location.href='/sexo=${key}';" value=${key}></td>    
    `
    }
    pagHtml += `
                </tr>
                <tr>
    `

    for (const [key, value] of Object.entries(lista)) {
        pagHtml += `
                    <td>${value}</td>
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