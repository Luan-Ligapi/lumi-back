const express = require('express');
const router = express.Router();
const { Fatura, FaturaDetalhes, Cliente } = require('../models');
const { Op } = require('sequelize');

// Rota para obter os dados financeiros
router.get('/', async (req, res) => {
  const { numeroCliente, unidadeConsumidora, mes, ano } = req.query;

  try {
    let whereClause = {};

    // Se cliente for informado, buscar pelo cliente
    if (numeroCliente) {
      const cliente = await Cliente.findOne({ where: { numeroCliente } });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      whereClause.clienteId = cliente.id;
    }

    // Se unidade consumidora for informada, adicionar ao filtro
    if (unidadeConsumidora) {
      whereClause.unidadeConsumidora = unidadeConsumidora;
    }

    // Se mes e ano forem informados, adicionar intervalo de datas ao filtro
    if (mes && ano) {
      const startDate = new Date(`${ano}-${mes}-01`);
      const endDate = new Date(`${ano}-${mes}-31`);
      whereClause.data_emissao = { [Op.between]: [startDate, endDate] };
    }

    // Buscar todas as faturas caso nenhum parâmetro seja passado
    const faturas = await Fatura.findAll({
      where: whereClause,
      include: [{
        model: FaturaDetalhes,
        attributes: ['energiaEletrica_quantidade', 'energiaCompensadaGD_quantidade', 'energiaEletrica_valor', 'energiaCompensadaGD_valor']
      }]
    });

    let totalEnergiaConsumida = 0;
    let totalValorPago = 0;
    let totalEconomiaGDR = 0;

    faturas.forEach(fatura => {
      const detalhes = fatura.FaturaDetalhe;
      
      // Verificar se há detalhes da fatura
      if (detalhes) {
        totalEnergiaConsumida += parseFloat(detalhes.energiaEletrica_quantidade || 0);
        totalValorPago += parseFloat(detalhes.energiaEletrica_valor || 0);
        totalEconomiaGDR += Math.abs(parseFloat(detalhes.energiaCompensadaGD_valor || 0));
      }
    });

    res.json({
      totalEnergiaConsumida,
      totalValorPago,
      totalEconomiaGDR,
      faturas
    });
  } catch (error) {
    console.error('Erro ao buscar dados financeiros:', error);
    res.status(500).json({ error: 'Erro ao buscar dados financeiros' });
  }
});

module.exports = router;
