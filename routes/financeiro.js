const express = require('express');
const router = express.Router();
const { Fatura, FaturaDetalhes, Cliente } = require('../models');
const { Op } = require('sequelize');

// Rota para obter dados financeiros
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

    // Buscar todas as faturas com base nos filtros (ou sem filtros)
    const faturas = await Fatura.findAll({
        where: whereClause,
        include: [{
          model: FaturaDetalhes,
          attributes: ['energiaEletrica_valor', 'energiaCompensadaGD_valor']
        }]
      });
      
      let totalValorSemGDR = 0;
      let totalEconomiaGDR = 0;
      
      // Corrigir o loop para somar adequadamente os valores de energia elétrica e compensada
      faturas.forEach(fatura => {
        if (fatura.FaturaDetalhe) {
          const energiaEletricaValor = parseFloat(fatura.FaturaDetalhe.energiaEletrica_valor?.replace(',', '.') || 0);
          const energiaCompensadaGDValor = parseFloat(fatura.FaturaDetalhe.energiaCompensadaGD_valor?.replace(',', '.') || 0);
      
          // Acumulando os valores
          totalValorSemGDR += energiaEletricaValor;
          totalEconomiaGDR += energiaCompensadaGDValor;
        }
      });
      
      // Retornar a resposta com os totais e as faturas
      res.json({
        totalValorSemGDR,
        totalEconomiaGDR,
        faturas
      });
        } catch (error) {
    console.error('Erro ao buscar dados financeiros:', error);
    res.status(500).json({ error: 'Erro ao buscar dados financeiros' });
  }
});

module.exports = router;
