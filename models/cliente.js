'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    numeroCliente: DataTypes.STRING,
    cpf_cnpj: DataTypes.STRING,
    endereco: DataTypes.STRING,
    telefone: DataTypes.STRING,
    inscricao_estadual: DataTypes.STRING,
    classe_consumidor: DataTypes.STRING
  }, {
    schema: 'lumi', // Define o schema onde a tabela será criada
  });

  Cliente.associate = function(models) {
    Cliente.hasMany(models.Fatura, { foreignKey: 'clienteId' });
  };
  return Cliente;
};
