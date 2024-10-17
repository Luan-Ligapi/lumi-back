const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Definir as opções para o swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Processamento de Faturas',
      version: '1.0.0',
      description: 'API para manipulação de clientes, faturas e upload de PDFs',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rota que terão as anotações
};

// Gerar a especificação do swagger
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
