'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Faturas', [
      {
        clienteId: 1, // Referência ao cliente "João da Silva"
        data_emissao: '2024-09-30',
        valor_total: 500.00,
        numero_fatura: '12345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clienteId: 2, // Referência ao cliente "Maria Oliveira"
        data_emissao: '2024-10-04',
        valor_total: 300.00,
        numero_fatura: '87654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        clienteId: 3, // Referência ao cliente "Carlos Santos"
        data_emissao: '2024-10-10',
        valor_total: 450.00,
        numero_fatura: '78901234',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Faturas', null, {});
  }
};
