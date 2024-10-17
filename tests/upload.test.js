const request = require('supertest');
const app = require('../server');  // Certifique-se de exportar o app do server.js

test('Upload de PDF e processamento de dados', async () => {
    const res = await request(app)
        .post('/upload')
        .attach('file', 'path/to/test-fatura.pdf');  // Substitua pelo caminho real do PDF de teste

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('PDF processado e dados salvos com sucesso.');
});
