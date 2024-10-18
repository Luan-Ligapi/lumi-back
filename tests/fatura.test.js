const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.authenticate();
  console.log('Conexão com banco de dados estabelecida com sucesso.');
});

afterAll(async () => {
  await sequelize.close();
  console.log('Conexão com banco de dados encerrada.');
});

describe('Faturas', () => {
    it('Deve retornar todas as faturas quando nenhum parâmetro for informado', async () => {
        const res = await request(app)
            .get('/faturas');
        console.log('Resultado da busca de todas as faturas:', res.body);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);  // Espera que tenha ao menos uma fatura
    });

    it('Deve retornar faturas por cliente e ano', async () => {
        const res = await request(app)
            .get('/faturas')
            .query({
                numeroCliente: '123456',
                ano: '2024'
            });
        console.log('Resultado da busca de faturas por cliente e ano:', res.body);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('Deve retornar faturas apenas por cliente', async () => {
        const res = await request(app)
            .get('/faturas')
            .query({
                numeroCliente: '123456'
            });
        console.log('Resultado da busca de faturas por cliente:', res.body);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('Deve retornar faturas apenas por ano', async () => {
        const res = await request(app)
            .get('/faturas')
            .query({
                ano: '2024'
            });
        console.log('Resultado da busca de faturas por ano:', res.body);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('Deve retornar erro se nenhum cliente for encontrado', async () => {
        const res = await request(app)
            .get('/faturas')
            .query({
                numeroCliente: '999999'
            });
        console.log('Cliente não encontrado:', res.body);
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Cliente não encontrado');
    });
});
