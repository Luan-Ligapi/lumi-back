'use strict';
module.exports = (sequelize, DataTypes) => {
  const FaturaDetalhes = sequelize.define('FaturaDetalhes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    faturaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Fatura', // Verifique se o nome da tabela de fatura está correto
        key: 'id'
      }
    },
    energiaEletrica_valor: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaEletrica_unidade: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    energiaEletrica_precoUnit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaEletrica_quantidade: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaEletrica_tarifaUnit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaSCEESICMS_valor: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaSCEESICMS_unidade: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    energiaSCEESICMS_precoUnit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaSCEESICMS_quantidade: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaSCEESICMS_tarifaUnit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaCompensadaGD_valor: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaCompensadaGD_unidade: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    energiaCompensadaGD_precoUnit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaCompensadaGD_quantidade: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    energiaCompensadaGD_tarifaUnit: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    contribuicaoIluminacao: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
      allowNull: false,
    },
  }, {
    tableName: 'FaturaDetalhes',
    schema: 'lumi', // Verifique se este schema está correto
    timestamps: true
  });

  // Associações
  FaturaDetalhes.associate = function(models) {
    FaturaDetalhes.belongsTo(models.Fatura, { foreignKey: 'faturaId', as: 'fatura' });
  };

  return FaturaDetalhes;
};
