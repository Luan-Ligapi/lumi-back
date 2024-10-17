const pdf = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const validPdfPath = path.resolve(__dirname, '../assets/Faturas/3001116735-01-2024.pdf');
const invalidPdfPath = path.resolve(__dirname, '../assets/Faturas/test-pdf-invalido.pdf');

test('Extração de número do cliente do PDF', async () => {
    if (!fs.existsSync(validPdfPath)) {
        throw new Error(`File not found: ${validPdfPath}`);
    }

    const dataBuffer = fs.readFileSync(validPdfPath);
    const data = await pdf(dataBuffer);

    const numeroCliente = data.text.match(/Nº DO CLIENTE\s+(\d+)/);
    expect(numeroCliente[1]).toBe('7204076116');  // Substitua pelo número do cliente esperado
});

test('Erro ao tentar extrair dados de um PDF inválido', async () => {
    if (!fs.existsSync(invalidPdfPath)) {
        throw new Error(`File not found: ${invalidPdfPath}`);
    }

    const dataBuffer = fs.readFileSync(invalidPdfPath);
    try {
        await pdf(dataBuffer);
    } catch (error) {
        expect(error.message).toBeDefined();
    }
});
