test('Extração de dados de fatura PDF', async () => {
    const dataBuffer = fs.readFileSync('test-fatura.pdf');
    const data = await pdf(dataBuffer);

    const numeroCliente = data.text.match(/Nº DO CLIENTE\s+(\d+)/);
    expect(numeroCliente[1]).toBe('123456');
});
