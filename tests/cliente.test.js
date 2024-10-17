const request = require('supertest');
const app = require('../server');

test('Criar novo cliente', async () => {
    const res = await request(app)
        .post('/clientes')
        .send({
            nome: 'João Silva',
            email: 'joao@example.com'
        });

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe('João Silva');
});

test('Listar todos os clientes', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});
