const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

// Obter todos os clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// Obter cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

// Criar novo cliente
// Criar novo cliente
router.post('/', async (req, res) => {
    const { nome, email, numeroCliente } = req.body;
    if (!nome || !email || !numeroCliente) {
      console.log('Erro: Campos obrigatórios ausentes ao criar cliente.');
      return res.status(400).json({ error: 'Campos nome, email e numeroCliente são obrigatórios' });
    }
  
    try {
      console.log('Criando cliente:', req.body);
      const novoCliente = await Cliente.create({ nome, email, numeroCliente });
      res.status(201).json(novoCliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      res.status(500).json({ error: 'Erro ao criar cliente' });
    }
  });
  

// Atualizar cliente
router.put('/:id', async (req, res) => {
  const { nome, email } = req.body;

  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await cliente.update({ nome, email });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// Deletar cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await cliente.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
});

module.exports = router;
