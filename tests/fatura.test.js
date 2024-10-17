const request = require('supertest');
const app = require('../server');
const { faker } = require('@faker-js/faker');

const { sequelize } = require('../models'); // Ajuste para o caminho correto dos seus modelos

async function clearDatabase() {
    await sequelize.sync({ force: true }); // Isso recria o banco de dados, limpando todos os dados
  }
  
beforeEach(async () => {
    await clearDatabase(); // Limpa o banco de dados antes de cada teste
  });
  
test('Criar nova fatura', async () => {
    const randomNumeroFatura = faker.random.numeric(9);
    const randomValorTotal = faker.commerce.price();
  
    // Primeiro, criar um cliente para associar à fatura
    const cliente = await request(app)
      .post('/clientes')
      .send({
        nome: faker.name.fullName(),
        email: faker.internet.email(),
        numeroCliente: faker.random.numeric(7)
      });
  
    const res = await request(app)
      .post('/faturas')
      .send({
        clienteId: cliente.body.id, // ID do cliente criado
        numero_fatura: randomNumeroFatura,
        valor_total: randomValorTotal,
        data_emissao: new Date().toISOString() // Enviar data em um formato válido
      });
  
    expect(res.statusCode).toBe(201);
    expect(res.body.numero_fatura).toBe(randomNumeroFatura);
  });
  
test('Erro ao criar fatura com número duplicado', async () => {
  const duplicatedNumeroFatura = faker.number.int({ min: 100000000, max: 999999999 });  // Correção

  // Cria a primeira fatura
  const cliente = await request(app)
    .post('/clientes')
    .send({
      nome: faker.person.fullName(),  // Atualizado
      email: faker.internet.email(),
      numeroCliente: faker.number.int({ min: 1000000, max: 9999999 })  // Gera número de cliente com 7 dígitos
    });

  await request(app)
    .post('/faturas')
    .send({
      clienteId: cliente.body.id,
      numero_fatura: duplicatedNumeroFatura,
      valor_total: faker.commerce.price(),
      data_emissao: faker.date.past()
    });

  // Tenta criar outra fatura com o mesmo número
  const res = await request(app)
    .post('/faturas')
    .send({
      clienteId: cliente.body.id,
      numero_fatura: duplicatedNumeroFatura, // Número de fatura duplicado
      valor_total: faker.commerce.price(),
      data_emissao: faker.date.past()
    });

  expect(res.statusCode).toBe(500);
  expect(res.body.error).toBe('Erro ao criar fatura');
});
