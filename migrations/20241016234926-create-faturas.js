'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Faturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes', // Nome da tabela de clientes
          key: 'id'
        },
        allowNull: false
      },
      data_emissao: {
        type: Sequelize.DATE,
        allowNull: false
      },
      valor_total: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      numero_fatura: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Faturas');
  }
};
