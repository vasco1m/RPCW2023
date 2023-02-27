import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup
from lxml import etree

# Read XML file
with open('arq.xml', 'r') as file:
    soup = BeautifulSoup(file, 'xml')

# Create HTML file
html_file = open('index.html', 'w')
html_file.write('<!DOCTYPE htm>\n')
html_file.write('<html>\n<head>\n<meta charset="iso-8859-1">\n<title>Arqueossítios</title>\n</head>\n<body>\n')


registros = soup.find_all('ARQELEM')

for i, registro in enumerate(registros):
    html_file.write("<h1>" + registro.find('IDENTI').text + "</h1>\n")

# Close HTML file
html_file.write('</body>\n</html>')
html_file.close()