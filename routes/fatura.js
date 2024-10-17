const express = require('express');
const router = express.Router();
const { Cliente, Fatura } = require('../models');

// Obter todas as faturas
router.get('/', async (req, res) => {
  const { numeroCliente, mesReferencia } = req.query;

  if (!numeroCliente) {
    return res.status(400).json({ error: 'numeroCliente é obrigatório' });
  }

  try {
    const cliente = await Cliente.findOne({ where: { numeroCliente } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const whereCondition = { clienteId: cliente.id };
    if (mesReferencia) {
      whereCondition.mesReferencia = mesReferencia;
    }

    const faturas = await Fatura.findAll({ where: whereCondition });
    if (faturas.length === 0) {
      return res.status(404).json({ error: 'Nenhuma fatura encontrada' });
    }

    res.json(faturas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar faturas' });
  }
});

// Obter fatura por ID
router.get('/:id', async (req, res) => {
  try {
    const fatura = await Fatura.findByPk(req.params.id);
    if (!fatura) {
      return res.status(404).json({ error: 'Fatura não encontrada' });
    }
    res.json(fatura);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar fatura' });
  }
});

// Criar nova fatura
// Criar nova fatura
router.post('/', async (req, res) => {
    const { numeroCliente, data_emissao, valor_total, numero_fatura } = req.body;
  
    if (!numeroCliente || !data_emissao || !valor_total || !numero_fatura) {
      console.log('Erro: Campos obrigatórios ausentes ao criar fatura.');
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' });
    }
  
    try {
      console.log('Buscando cliente com numeroCliente:', numeroCliente);
      const cliente = await Cliente.findOne({ where: { numeroCliente } });
      if (!cliente) {
        console.log('Erro: Cliente não encontrado.');
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
  
      console.log('Criando fatura para cliente ID:', cliente.id);
      const fatura = await Fatura.create({
        clienteId: cliente.id,
        data_emissao,
        valor_total,
        numero_fatura
      });
  
      res.status(201).json(fatura);
    } catch (error) {
      console.error('Erro ao criar fatura:', error);
      res.status(500).json({ error: 'Erro ao criar fatura' });
    }
  });
  
module.exports = router;
