const { Cliente, Fatura } = require('../models');

// Suponha que os dados foram extraídos com sucesso
const dadosFatura = {
    numeroCliente: '123456',
    mesReferencia: 'Abril/24',
    energiaEletrica: 526,
    energiaCompensada: 100,
    valorTotal: 250.00,
    economiaGD: 50.00
};

// Verificar se o cliente já existe
let cliente = await Cliente.findOne({ where: { numeroCliente: dadosFatura.numeroCliente } });
if (!cliente) {
    cliente = await Cliente.create({ numeroCliente: dadosFatura.numeroCliente });
}

// Criar a fatura para o cliente
await Fatura.create({
    clienteId: cliente.id,
    mesReferencia: dadosFatura.mesReferencia,
    energiaEletrica: dadosFatura.energiaEletrica,
    energiaCompensada: dadosFatura.energiaCompensada,
    valorTotal: dadosFatura.valorTotal,
    economiaGD: dadosFatura.economiaGD
});
