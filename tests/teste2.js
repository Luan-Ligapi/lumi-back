const pdf = require('pdf-parse');
const fs = require('fs');

test('Extração de número do cliente', async () => {
    const dataBuffer = fs.readFileSync('path-to-your-pdf-file.pdf');
    const data = await pdf(dataBuffer);
    
    const numeroCliente = data.text.match(/Nº DO CLIENTE\s+(\d+)/);
    
    expect(numeroCliente[1]).toBe('123456');
});
