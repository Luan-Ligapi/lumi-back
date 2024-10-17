const { Cliente, Fatura } = require('./models');
const pdf = require('pdf-parse');
const fs = require('fs');

const dataBuffer = fs.readFileSync('path-to-your-pdf-file.pdf');

pdf(dataBuffer).then(async function(data) {
    const numeroCliente = data.text.match(/Nº DO CLIENTE\s+(\d+)/);
    const mesReferencia = data.text.match(/Mês de referência\s+([A-Za-z]+\/\d{2})/);
    const energiaEletrica = data.text.match(/Energia Elétrica.*?(\d+)\s+kWh\s+R\$\s+([\d,]+)/);

    if (numeroCliente && mesReferencia && energiaEletrica) {
        let cliente = await Cliente.findOne({ where: { numeroCliente: numeroCliente[1] } });
        if (!cliente) {
            cliente = await Cliente.create({ numeroCliente: numeroCliente[1] });
        }

        await Fatura.create({
            clienteId: cliente.id,
            mesReferencia: mesReferencia[1],
            energiaEletrica: parseFloat(energiaEletrica[1].replace(',', '.')),
            valorTotal: parseFloat(energiaEletrica[2].replace(',', '.')),
            economiaGD: 50.00 // Exemplo, ajuste conforme necessário
        });
        console.log('Dados inseridos no banco de dados');
    } else {
        console.log('Erro na extração de dados');
    }
});
