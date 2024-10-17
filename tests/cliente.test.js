const request = require('supertest');
const app = require('../server');
const { faker } = require('@faker-js/faker');

const { sequelize } = require('../models'); // Ajuste para o caminho correto dos seus modelos

async function clearDatabase() {
  await sequelize.sync({ force: true }); // Isso recria o banco de dados, limpando todos os dados
}

beforeEach(async () => {
  await clearDatabase(); // Limpa o banco antes de cada teste
});

afterEach(async () => {
  await clearDatabase(); // Limpa o banco após cada teste
});

test('Criar novo cliente', async () => {
  const randomEmail = faker.internet.email();
  const randomName = faker.person.fullName();  // Updated method
  const randomNumeroCliente = faker.number.int({ min: 1000000, max: 9999999 });

  console.log('Criando cliente:', { nome: randomName, email: randomEmail, numeroCliente: randomNumeroCliente });

  const res = await request(app)
    .post('/clientes')
    .send({
      nome: randomName,
      email: randomEmail,
      numeroCliente: randomNumeroCliente
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.nome).toBe(randomName);
});

test('Erro ao criar cliente com e-mail duplicado', async () => {
  const duplicatedEmail = faker.internet.email();
  const randomNumeroCliente = faker.number.int({ min: 1000000, max: 9999999 });

  // Create an initial client
  await request(app)
    .post('/clientes')
    .send({
      nome: 'Cliente Original',
      email: duplicatedEmail,
      numeroCliente: randomNumeroCliente
    });

  // Try to create a client with the same email
  const res = await request(app)
    .post('/clientes')
    .send({
      nome: 'Cliente Duplicado',
      email: duplicatedEmail,
      numeroCliente: faker.number.int({ min: 1000000, max: 9999999 })
    });

  expect(res.statusCode).toBe(500);
  expect(res.body.error).toBe('Erro ao criar cliente');
});
