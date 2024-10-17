const request = require('supertest');
const app = require('../server');  // Certifique-se de exportar o app do server.js

test('Upload de PDF e processamento de dados', async () => {
    const res = await request(app)
        .post('/upload')
        .attach('file', '../assets/Faturas/Instalação_ 3001116735/3001116735-02-2024.pdf');  // Substitua pelo caminho real do PDF de teste

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('PDF processado e dados salvos com sucesso.');
});
test('Erro ao tentar fazer upload de um arquivo não-PDF', async () => {
    const res = await request(app)
        .post('/upload')
        .attach('file',  '../assets/Faturas/imagem.png');  // Arquivo inválido

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Arquivo inválido. Apenas PDFs são permitidos.');
});
