const { Cliente, Fatura } = require('../models');

test('Cálculo de valor total agregado para um cliente', async () => {
    const cliente = await Cliente.findOne({ where: { numeroCliente: '123456' } });
    const faturas = await Fatura.sum('valor_total', { where: { clienteId: cliente.id } });
    
    expect(faturas).toBeGreaterThan(0);
});
