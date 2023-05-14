import json

cidades = {}
cidadesJson = []
ligacoes = []

with open('mapa.json', 'r') as f:
    res = json.load(f)
    cidadesJson = res['cidades']
    ligacoes = res['ligações']

for cidade in cidadesJson:
    cidades[cidade['id']] = cidade

for ligacao in ligacoes:
    if 'ligacoes' not in cidades[ligacao['origem']]:
        cidades[ligacao['origem']]['ligacoes'] = []
    if 'ligacoes' not in cidades[ligacao['destino']]:
        cidades[ligacao['destino']]['ligacoes'] = []
    cidades[ligacao['origem']]['ligacoes'].append((ligacao['destino'], ligacao['distância']))
    cidades[ligacao['destino']]['ligacoes'].append((ligacao['origem'], ligacao['distância']))

html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <td width="30%">
                    <h3>Índice</h3>
                    <!-- Lista com o índice -->
                    <ul>
"""


for cidade_id, cidade in cidades.items():
    html += f"""
                        <li>
                            <a href="#{cidade['id']}">{cidade['nome']}</a> 
                        </li>
    """

html += """
                    </ul>
                </td>
                <td width="70%">
                    <!-- Informação das Cidades -->
"""

i = 0

for cidade_id, cidade in cidades.items():
    html += f"""
                    <a name="{cidade['id']}"/>
                    <h3>{cidade['nome']}</h3>
                    <p><b>população:</b> {cidade['população']}</p>
                    <p><b>descrição:</b> {cidade['descrição']}</p>
                    <p><b>distrito:</b> {cidade['distrito']}</p>
"""
    for ligacao in cidade['ligacoes']:
        html += f"""
                    <p>
                        <a href="#{cidades[ligacao[0]]['id']}">{cidades[ligacao[0]]['nome']}: {ligacao[1]}</a>
                    </p>"""
                    
    html += f"""
                    <center>
                        <hr width="80%"/>
                    </center> 
"""

html += """     
                </td>
            </tr>
        </table>
    </body>
</html>
"""

with open('cidades.html', 'w') as f:
    f.write(html)
    