const request = require('supertest');
const app = require('../server');
const { faker } = require('@faker-js/faker'); // Atualizado para @faker-js/faker
const { sequelize } = require('../models');

beforeAll(async () => {
  await sequelize.sync({ force: false  });
});

test('Criar novo cliente', async () => {
  const novoCliente = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    numeroCliente: faker.number.int({ min: 1000000, max: 9999999 })
  };

  const res = await request(app)
    .post('/clientes')
    .send(novoCliente);

  expect(res.statusCode).toBe(201);
  expect(res.body.nome).toBe(novoCliente.nome);
  expect(res.body.email).toBe(novoCliente.email);
});
