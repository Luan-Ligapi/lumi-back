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

// Criar nova fatura
router.post('/', async (req, res) => {
    const { numeroCliente, data_emissao, valor_total, numero_fatura } = req.body;
    
    // Verifica se a fatura já existe
    const faturaExistente = await Fatura.findOne({ where: { numero_fatura } });
    if (faturaExistente) {
        return res.status(400).json({ error: 'Erro ao criar fatura: número duplicado' });
    }
    
    try {
        const cliente = await Cliente.findOne({ where: { numeroCliente } });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        const fatura = await Fatura.create({
            clienteId: cliente.id,
            data_emissao,
            valor_total,
            numero_fatura
        });
        
        return res.status(201).json(fatura);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar fatura' });
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
  
module.exports = router;

