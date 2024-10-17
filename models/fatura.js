'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fatura = sequelize.define('Fatura', {
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_emissao: {
      type: DataTypes.DATE,
      allowNull: false
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    numero_fatura: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    schema: 'lumi', // Define o schema onde a tabela será criada
  });

  Fatura.associate = function(models) {
    Fatura.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
  };
  return Fatura;
};
