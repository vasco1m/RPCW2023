from bs4 import BeautifulSoup
import lxml


with open("arq.xml", "r") as file:
    content = file.read()

soup = BeautifulSoup(content, "xml")
registros = soup.find_all("ARQELEM")

for i, registro in enumerate(registros):
    with open(f'arqsHTML/arq{i+1}.html', 'wb') as file:
        file.write('<!DOCTYPE htm>\n'.encode('iso-8859-1'))
        file.write(('<html>\n<head>\n<meta charset="iso-8859-1">\n<title>' + registro.find('IDENTI').text + '</title>\n</head>\n<body>\n').encode('iso-8859-1'))
        file.write("\n".encode('iso-8859-1'))
        if registro.find('IDENTI') is not None:
            file.write(("<h1>" + registro.find('IDENTI').text + "</h1>\n").encode('iso-8859-1'))
        if registro.find('IMAGEM') is not None:
            file.write(("<img src=\"" + registro.find('IMAGEM').text + "\">\n").encode('iso-8859-1'))
        if registro.find('DESCRI') is not None:
            file.write(("<h2>" + registro.find('DESCRI').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('LUGAR') is not None:
            file.write(("<h2>" + registro.find('LUGAR').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('FREGUE') is not None:
            file.write(("<h2>" + registro.find('FREGUE').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('CONCEL') is not None:
            file.write(("<h2>" + registro.find('CONCEL').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('CODADM') is not None:
            file.write(("<h2>" + registro.find('CODADM').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('LATITU') is not None:
            file.write(("<h2>" + registro.find('LATITU').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('LONGIT') is not None:
            file.write(("<h2>" + registro.find('LONGIT').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('ALTITU') is not None:
            file.write(("<h2>" + registro.find('ALTITU').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('ACESSO') is not None:
            file.write(("<h2>" + registro.find('ACESSO').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('QUADRO') is not None:
            file.write(("<h2>" + registro.find('QUADRO').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('DESARQ') is not None:
            file.write(("<h2>" + registro.find('DESARQ').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('INTERP') is not None:
            file.write(("<h2>" + registro.find('INTERP').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('DEPOSI') is not None:
            file.write(("<h2>" + registro.find('DEPOSI').text + "</h2>\n").encode('iso-8859-1'))
        biblio = registro.find_all('BIBLIO')
        for bib in biblio:
            file.write(("<h2>" + bib.text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('AUTOR') is not None:
            file.write(("<h2>" + registro.find('AUTOR').text + "</h2>\n").encode('iso-8859-1'))
        if registro.find('DATA') is not None:
            file.write(("<h2>" + registro.find('DATA').text + "</h2>\n").encode('iso-8859-1'))
        #file.write(registro.encode('iso-8859-1'))
        file.write('</body>\n</html>'.encode('iso-8859-1'))
        file.close()
