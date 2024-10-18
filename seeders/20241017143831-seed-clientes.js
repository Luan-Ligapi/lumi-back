'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Clientes', [
      {
        nome: 'Cliente 1',
        email: 'cliente1@example.com',
        numeroCliente: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cliente 2',
        email: 'cliente2@example.com',
        numeroCliente: '654321',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Clientes', null, {});
  }
};
