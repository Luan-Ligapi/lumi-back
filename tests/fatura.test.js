const request = require('supertest');
const app = require('../server');

describe('Faturas', () => {
    it('Deve criar nova fatura', async () => {
        const randomNumeroFatura = Math.floor(100000000 + Math.random() * 900000000).toString();
        const res = await request(app)
            .post('/faturas')
            .send({
                numeroCliente: '123456',
                data_emissao: new Date().toISOString(),
                valor_total: '500.00',
                numero_fatura: randomNumeroFatura
            });
        console.log('Resultado da criação de fatura:', res.body);
        expect(res.statusCode).toBe(201);
        expect(res.body.numero_fatura).toBe(randomNumeroFatura);
    });
    
    it('Deve retornar erro ao criar fatura com número duplicado', async () => {
        const res = await request(app)
            .post('/faturas')
            .send({
                numeroCliente: '123456',
                data_emissao: new Date().toISOString(),
                valor_total: '500.00',
                numero_fatura: 'duplicated_fatura_number'
            });
        console.log('Erro esperado - Número duplicado:', res.body);
        expect(res.statusCode).toBe(400); // Espera-se erro de duplicidade
        expect(res.body.error).toBe('Erro ao criar fatura: número duplicado');
    });
    });
