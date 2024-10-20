const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());  // Isso permite que qualquer origem acesse a API

// Certifique-se de que os caminhos estão corretos
const clienteRoutes = require('./routes/cliente');  // Caminho correto
const faturaRoutes = require('./routes/fatura');    // Caminho correto
const uploadRoutes = require('./routes/upload');    // Caminho correto
const resumoRoutes = require('./routes/resumo');    // Caminho correto


// Middleware para processar JSON
app.use(express.json());

// Adicionar as rotas
app.use('/clientes', clienteRoutes);
app.use('/faturas', faturaRoutes);
app.use('/resumo', resumoRoutes);
app.use('/upload', uploadRoutes);


// Iniciar o servidor somente se o arquivo não for importado em testes
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
