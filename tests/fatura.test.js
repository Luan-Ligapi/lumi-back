const request = require('supertest');
const app = require('../server');

test('Criar nova fatura', async () => {
    const res = await request(app)
        .post('/faturas')
        .send({
            clienteId: 1,
            data_emissao: '2024-10-16',
            valor_total: 500.00,
            numero_fatura: '12345678'
        });

    expect(res.statusCode).toBe(201);
    expect(res.body.numero_fatura).toBe('12345678');
});

test('Listar faturas', async () => {
    const res = await request(app).get('/faturas');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});
