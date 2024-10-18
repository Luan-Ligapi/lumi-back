'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Faturas', [
      {
        clienteId: 1,
        data_emissao: new Date(),
        valor_total: 100.0,
        numero_fatura: 'fatura1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clienteId: 2,
        data_emissao: new Date(),
        valor_total: 150.0,
        numero_fatura: 'fatura2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Faturas', null, {});
  }
};
