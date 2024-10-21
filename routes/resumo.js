const express = require('express');
const router = express.Router();
const { Fatura, FaturaDetalhes, Cliente } = require('../models');
const { Op } = require('sequelize');

// Rota unificada para obter dados financeiros e de energia
router.get('/', async (req, res) => {
  const { numeroCliente, unidadeConsumidora, ano } = req.query;

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
    if (ano) {
      whereClause.referencia_mes = { [Op.like]: `%${ano}%` };
    }

    // Buscar todas as faturas com base nos filtros
    const faturas = await Fatura.findAll({
      where: {
        ...whereClause,
        valor_a_pagar: { [Op.not]: null } // Ignora faturas com valor_a_pagar null
      },
      include: [{
        model: FaturaDetalhes,
        as: 'faturaDetalhes',
        attributes: ['energiaEletrica_valor', 'energiaCompensadaGD_valor', 'energiaEletrica_quantidade', 'energiaCompensadaGD_quantidade']
      }]
    });

    // Inicializa os totais
    let totalValorSemGDR = 0;
    let totalEconomiaGDR = 0;
    let totalEnergiaConsumida = 0;
    let totalEnergiaCompensada = 0;
    let totalFaturas = faturas.length;
    let totalEnergiaFaturada = 0;
    let totalContribuicaoIluminacao = 0;

    // Itera sobre as faturas e soma os valores
    const faturasResumidas = faturas.map(fatura => {
      const detalhes = fatura.faturaDetalhes?.[0]; // Acessa o primeiro item de faturaDetalhes

      if (detalhes) {
        const valorEletrica = parseFloat(detalhes?.energiaEletrica_valor?.replace(',', '.') || 0);
        const valorCompensada = parseFloat(detalhes?.energiaCompensadaGD_valor?.replace(',', '.') || 0);
        const quantidadeEletrica = parseFloat(detalhes?.energiaEletrica_quantidade || 0);
        const quantidadeCompensada = parseFloat(detalhes?.energiaCompensadaGD_quantidade || 0);

        // Atualiza os totais
        totalValorSemGDR += parseFloat(fatura.valor_total || 0);
        totalEconomiaGDR += valorCompensada;
        totalEnergiaConsumida += quantidadeEletrica;
        totalEnergiaCompensada += quantidadeCompensada;
        totalEnergiaFaturada += quantidadeEletrica;
      }

      totalContribuicaoIluminacao += parseFloat(fatura.itens_faturados?.contribuicaoIluminacao?.replace(',', '.') || 0);

      return {
        id: fatura.id,
        clienteId: fatura.clienteId,
        data_emissao: fatura.data_emissao,
        valor_total: fatura.valor_total,
        numero_fatura: fatura.numero_fatura,
        referencia_mes: fatura.referencia_mes,
        vencimento: fatura.vencimento,
        valor_a_pagar: fatura.valor_a_pagar,
        consumo_kwh: fatura.consumo_kwh,
        itens_faturados: {
          energiaEletrica: {
            valor: detalhes?.energiaEletrica_valor,
            quantidade: detalhes?.energiaEletrica_quantidade,
          },
          energiaCompensadaGD: {
            valor: detalhes?.energiaCompensadaGD_valor,
            quantidade: detalhes?.energiaCompensadaGD_quantidade,
          }
        }
      };
    });

    // Retornar resposta com os totais
    res.json({
      totalValorSemGDR,
      totalEconomiaGDR,
      totalEnergiaConsumida,
      totalEnergiaCompensada,
      totalFaturas,
      totalEnergiaFaturada,
      totalContribuicaoIluminacao,
      faturas: faturasResumidas
    });

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

module.exports = router;
