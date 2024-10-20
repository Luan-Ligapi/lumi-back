const express = require('express');
const router = express.Router();
const { Fatura, FaturaDetalhes, Cliente } = require('../models');
const { Op } = require('sequelize');

// Rota unificada para obter dados financeiros e de energia
router.get('/', async (req, res) => {
  const { numeroCliente, unidadeConsumidora, mes, ano } = req.query;

  try {
    let whereClause = {
      valor_a_pagar: { [Op.ne]: null }  // Filtrar apenas faturas com valor_a_pagar não nulo
    };
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

    // Buscar todas as faturas com base nos filtros (ou sem filtros)
    const faturas = await Fatura.findAll({
      where: whereClause,
      include: [{
        model: FaturaDetalhes,
        attributes: ['energiaEletrica_valor', 'energiaCompensadaGD_valor', 'energiaEletrica_quantidade', 'energiaCompensadaGD_quantidade']
      }]
    });

    let totalValorSemGDR = 0;
    let totalEconomiaGDR = 0;
    let totalEnergiaConsumida = 0;
    let totalEnergiaCompensada = 0;

    faturas.forEach(fatura => {
      if (fatura.FaturaDetalhe) {
        // Processando valores financeiros
        const energiaEletricaValor = parseFloat(fatura.FaturaDetalhe.energiaEletrica_valor?.replace(',', '.') || 0);
        const energiaCompensadaGDValor = parseFloat(fatura.FaturaDetalhe.energiaCompensadaGD_valor?.replace(',', '.') || 0);

        totalValorSemGDR += energiaEletricaValor;
        totalEconomiaGDR += energiaCompensadaGDValor;

        // Processando quantidades de energia
        totalEnergiaConsumida += parseFloat(fatura.FaturaDetalhe.energiaEletrica_quantidade || 0);
        totalEnergiaCompensada += parseFloat(fatura.FaturaDetalhe.energiaCompensadaGD_quantidade || 0);
      }
    });

    // Retornar resposta combinada
    res.json({
      totalValorSemGDR,
      totalEconomiaGDR,
      totalEnergiaConsumida,
      totalEnergiaCompensada,
      faturas
    });
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

module.exports = router;
