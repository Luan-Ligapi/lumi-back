'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fatura = sequelize.define('Fatura', {
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_emissao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    numero_fatura: {
      type: DataTypes.STRING,
      allowNull: true
    },
    referencia_mes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vencimento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valor_a_pagar: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    classe: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subclasse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    modalidade_tarifaria: {
      type: DataTypes.STRING,
      allowNull: true
    },
    consumo_kwh: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    leitura_anterior: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    leitura_atual: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    link_pdf: {
      type: DataTypes.STRING,
      allowNull: true
    },
    historico_consumo: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    itens_faturados: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    schema: 'lumi',
  });
  Fatura.associate = function(models) {
    Fatura.hasMany(models.FaturaDetalhes, { foreignKey: 'faturaId', as: 'faturaDetalhes' });
    Fatura.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
  };

  return Fatura;
};
