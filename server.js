const express = require('express');
const app = express();

// Certifique-se de que os caminhos estão corretos
const clienteRoutes = require('./routes/cliente');  // Caminho correto
const faturaRoutes = require('./routes/fatura');    // Caminho correto
const uploadRoutes = require('./routes/upload');    // Caminho correto

// Importar Swagger (se necessário)
const { swaggerUi, swaggerSpec } = require('./swagger');

// Middleware para processar JSON
app.use(express.json());

// Adicionar as rotas
app.use('/clientes', clienteRoutes);
app.use('/faturas', faturaRoutes);
app.use('/upload', uploadRoutes);

// Rota para documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


module.exports = app;
