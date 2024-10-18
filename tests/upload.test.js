const request = require('supertest');
const app = require('../server');
const path = require('path');

describe('Upload de PDF e processamento de dados', () => {
    it('Deve fazer upload de um arquivo PDF e processá-lo', async () => {
        const filePath = path.join(__dirname, '3001116735-01-2024.pdf');
        const res = await request(app)
            .post('/upload')
            .attach('file', filePath);
        console.log('Resultado do upload:', res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('PDF processado com sucesso');
    });
    
        });
