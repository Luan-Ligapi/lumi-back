const express = require('express');
const app = express();
const clienteRoutes = require('./routes/cliente');
const faturaRoutes = require('./routes/fatura');
const uploadRoutes = require('./routes/upload');  // Adicione aqui

// Middleware para processar JSON
app.use(express.json());

// Rotas
app.use('/clientes', clienteRoutes);
app.use('/faturas', faturaRoutes);
app.use('/upload', uploadRoutes);  // Rota para upload de PDFs

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
