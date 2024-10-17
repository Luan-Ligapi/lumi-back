'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Clientes', [
      {
        nome: 'João da Silva',
        email: 'joao@example.com',
        numeroCliente: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Maria Oliveira',
        email: 'maria@example.com',
        numeroCliente: '654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Carlos Santos',
        email: 'carlos@example.com',
        numeroCliente: '789012',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Clientes', null, {});
  }
};
