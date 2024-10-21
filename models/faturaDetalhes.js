'use strict';
module.exports = (sequelize, DataTypes) => {

  const FaturaDetalhes = sequelize.define('FaturaDetalhes', {
    energiaEletrica_valor: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    energiaEletrica_unidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    energiaEletrica_precoUnit: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    energiaEletrica_quantidade: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    energiaEletrica_tarifaUnit: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    energiaSCEESICMS_valor: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    energiaCompensadaGD_valor: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    energiaCompensadaGD_quantidade: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'FaturaDetalhes',
    schema: 'lumi', // Verifique se este schema é correto
    timestamps: true
  });

  // Associações
  FaturaDetalhes.associate = function(models) {
    FaturaDetalhes.belongsTo(models.Fatura, { foreignKey: 'faturaId', as: 'fatura' });
  };

  return FaturaDetalhes;
};
