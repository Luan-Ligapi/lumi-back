const express = require('express');
const router = express.Router();
const { Fatura } = require('../models');

// Obter todas as faturas
router.get('/', async (req, res) => {
    const { numeroCliente, mesReferencia } = req.query;

    const cliente = await Cliente.findOne({ where: { numeroCliente } });
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const faturas = await Fatura.findAll({
        where: { 
            clienteId: cliente.id,
            mesReferencia 
        }
    });

    res.json(faturas);
});

// Obter fatura por ID
router.get('/:id', async (req, res) => {
  const fatura = await Fatura.findByPk(req.params.id);
  if (fatura) {
    res.json(fatura);
  } else {
    res.status(404).json({ error: 'Fatura não encontrada' });
  }
});

// Criar nova fatura
router.post('/', async (req, res) => {
  const { clienteId, data_emissao, valor_total, numero_fatura } = req.body;
  const novaFatura = await Fatura.create({ clienteId, data_emissao, valor_total, numero_fatura });
  res.status(201).json(novaFatura);
});

// Atualizar fatura
router.put('/:id', async (req, res) => {
  const fatura = await Fatura.findByPk(req.params.id);
  if (fatura) {
    const { data_emissao, valor_total, numero_fatura } = req.body;
    await fatura.update({ data_emissao, valor_total, numero_fatura });
    res.json(fatura);
  } else {
    res.status(404).json({ error: 'Fatura não encontrada' });
  }
});

// Deletar fatura
router.delete('/:id', async (req, res) => {
  const fatura = await Fatura.findByPk(req.params.id);
  if (fatura) {
    await fatura.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Fatura não encontrada' });
  }
});

module.exports = router;
