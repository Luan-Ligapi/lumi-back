'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    numeroCliente: {  // Adicione este campo
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    schema: 'lumi', // Define o schema onde a tabela será criada
  });

  Cliente.associate = function(models) {
    Cliente.hasMany(models.Fatura, { foreignKey: 'clienteId' });
  };
  return Cliente;
};
