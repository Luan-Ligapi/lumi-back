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

// Iniciar o servidor somente se o arquivo não for importado em testes
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
