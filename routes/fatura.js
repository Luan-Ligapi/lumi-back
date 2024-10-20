const express = require('express');
const router = express.Router();
const { Cliente, Fatura, FaturaDetalhes } = require('../models');
const { Op } = require('sequelize');  // Importa apenas os operadores do Sequelize

// Obter todas as faturas
router.get('/', async (req, res) => {
  const { numeroCliente, ano } = req.query;

  let whereClause = {};

  // Se o cliente for informado, buscar pelo cliente
  if (numeroCliente) {
    const cliente = await Cliente.findOne({ where: { numeroCliente } });
    if (!cliente) {
      console.log('Cliente não encontrado:', numeroCliente);
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    whereClause.clienteId = cliente.id;  // Adicionar clienteId à cláusula de busca
    console.log(`Cliente encontrado: ${cliente.id}`);
  }

  // Se o ano for informado, definir o intervalo de datas para o ano solicitado
  if (ano) {
    const startOfYear = new Date(`${ano}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${ano}-12-31T23:59:59.999Z`);
    
    // Usar 'Op.between' para o intervalo de datas
    whereClause.referencia_mes = {
      [Op.like]: `%${ano}%`
    };
    console.log(`Procurando faturas entre ${startOfYear} e ${endOfYear}`);
  }
  
  try {
    const faturas = await Fatura.findAll({
      where: whereClause  // Usar a cláusula de filtro, vazia se nenhum filtro for informado
    });



    console.log(`Faturas encontradas: ${faturas.length}`);
    res.json(faturas);
  } catch (error) {
    console.error('Erro ao buscar faturas:', error);
    res.status(500).json({ error: 'Erro ao buscar faturas' });
  }
});





// Criar nova fatura
router.post('/', async (req, res) => {
  try {
    const { numeroCliente, data_emissao, valor_total, numero_fatura, pdf_link } = req.body;

    console.log('Dados recebidos para criação de fatura:', req.body);

    // Verificar se o número da fatura já existe
    const faturaExistente = await Fatura.findOne({ where: { numero_fatura } });
    if (faturaExistente) {
      return res.status(400).json({ error: 'Erro ao criar fatura: número duplicado' });
    }

    const cliente = await Cliente.findOne({ where: { numeroCliente } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const novaFatura = await Fatura.upsert({
      clienteId: cliente.id,
      data_emissao,
      valor_total,
      numero_fatura,
      pdf_link  // Adicionar o link do PDF
    });
    await FaturaDetalhes.upsert({
      faturaId: novaFatura.id,
      energiaEletrica_valor: parseFloat(dadosFatura.valoreFaturados.energiaEletrica.valor),
      energiaEletrica_unidade: dadosFatura.valoreFaturados.energiaEletrica.unidade,
      energiaEletrica_precoUnit: parseFloat(dadosFatura.valoreFaturados.energiaEletrica.precoUnit),
      energiaEletrica_quantidade: parseFloat(dadosFatura.valoreFaturados.energiaEletrica.quantidade),
      energiaEletrica_tarifaUnit: parseFloat(dadosFatura.valoreFaturados.energiaEletrica.tarifaUnit),
      energiaSCEESICMS_valor: parseFloat(dadosFatura.valoreFaturados.energiaSCEESICMS.valor),
      energiaSCEESICMS_unidade: dadosFatura.valoreFaturados.energiaSCEESICMS.unidade,
      energiaSCEESICMS_precoUnit: parseFloat(dadosFatura.valoreFaturados.energiaSCEESICMS.precoUnit),
      energiaSCEESICMS_quantidade: parseFloat(dadosFatura.valoreFaturados.energiaSCEESICMS.quantidade),
      energiaSCEESICMS_tarifaUnit: parseFloat(dadosFatura.valoreFaturados.energiaSCEESICMS.tarifaUnit),
      energiaCompensadaGD_valor: parseFloat(dadosFatura.valoreFaturados.energiaCompensadaGD.valor),
      energiaCompensadaGD_unidade: dadosFatura.valoreFaturados.energiaCompensadaGD.unidade,
      energiaCompensadaGD_precoUnit: parseFloat(dadosFatura.valoreFaturados.energiaCompensadaGD.precoUnit),
      energiaCompensadaGD_quantidade: parseFloat(dadosFatura.valoreFaturados.energiaCompensadaGD.quantidade),
      energiaCompensadaGD_tarifaUnit: parseFloat(dadosFatura.valoreFaturados.energiaCompensadaGD.tarifaUnit),
      contribuicaoIluminacao: parseFloat(dadosFatura.valoreFaturados.contribuicaoIluminacao)
    });
    

    console.log('Fatura criada com sucesso:', novaFatura);
    return res.status(201).json(novaFatura);
  } catch (error) {
    console.error('Erro ao criar fatura:', error.message);
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

