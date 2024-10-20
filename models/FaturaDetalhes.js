'use strict';

module.exports = (sequelize, DataTypes) => {
  const FaturaDetalhes = sequelize.define('FaturaDetalhes', {
    faturaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,  // Definir faturaId como único
        references: {
          model: 'Faturas',
          key: 'id'
        },
      },
        energiaEletrica_valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaEletrica_unidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    energiaEletrica_precoUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaEletrica_quantidade: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaEletrica_tarifaUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaSCEESICMS_valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaSCEESICMS_unidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    energiaSCEESICMS_precoUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaSCEESICMS_quantidade: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaSCEESICMS_tarifaUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaCompensadaGD_valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaCompensadaGD_unidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    energiaCompensadaGD_precoUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaCompensadaGD_quantidade: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    energiaCompensadaGD_tarifaUnit: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    contribuicaoIluminacao: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    schema: 'lumi',
    tableName: 'FaturaDetalhes',
    timestamps: true
  });

  // Associating FaturaDetalhes with Fatura
  FaturaDetalhes.associate = function (models) {
    FaturaDetalhes.belongsTo(models.Fatura, { foreignKey: 'faturaId' });
  };

  return FaturaDetalhes;
};
