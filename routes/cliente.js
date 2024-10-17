const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

// Obter todos os clientes
router.get('/', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

// Obter cliente por ID
router.get('/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// Criar novo cliente
router.post('/', async (req, res) => {
  const { nome, email } = req.body;
  const novoCliente = await Cliente.create({ nome, email });
  res.status(201).json(novoCliente);
});

// Atualizar cliente
router.put('/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    const { nome, email } = req.body;
    await cliente.update({ nome, email });
    res.json(cliente);
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// Deletar cliente
router.delete('/:id', async (req, res) => {
  const cliente = await Cliente.findByPk(req.params.id);
  if (cliente) {
    await cliente.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});
