const { Cliente, Fatura } = require('../models');

test('Cálculo de valor total agregado para um cliente', async () => {
    const cliente = await Cliente.findOne({ where: { numeroCliente: '123456' } });

    if (!cliente) {
        throw new Error('Cliente não encontrado');
    }

    const faturas = await Fatura.sum('valor_total', { where: { clienteId: cliente.id } });

    if (faturas === null) {
        throw new Error('Nenhuma fatura encontrada para este cliente');
    }

    expect(faturas).toBeGreaterThan(0);
});
