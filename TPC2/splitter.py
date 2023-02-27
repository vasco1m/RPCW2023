from bs4 import BeautifulSoup
from lxml import etree

with open('arq.xml', 'r') as file:
    soup = BeautifulSoup(file, 'xml')

registros = soup.find_all('ARQELEM')

for i, registro in enumerate(registros):
    with open(f'arqs/arq{i+1}.xml', 'wb') as file:
        file.write(b'<?xml version="1.0" encoding="iso-8859-1"?>')
        file.write("\n".encode('iso-8859-1'))
        file.write(registro.encode('iso-8859-1'))