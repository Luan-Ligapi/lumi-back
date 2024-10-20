const { Storage } = require('@google-cloud/storage');
const path = require('path');
const express = require('express');
const router = express.Router();
const pdfParser = require('../services/pdfParser');
const { Fatura, Cliente, FaturaDetalhes } = require('../models');
const multer = require('multer');
const fs = require('fs');

// Configuração do Google Cloud Storage
const bucket = new Storage({
  keyFilename: path.join(__dirname, '../config/gcp-key.json'),
  projectId: 'noted-feat-437112-m5',
});
const bucketName = 'lumi-luan';

// Verifique se o diretório 'uploads/' existe, se não, cria-o
const ensureUploadsDir = () => {
  const uploadsDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
};

// Configurar o multer para armazenar o arquivo em uma pasta temporária
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadsDir(); // Verificar e criar o diretório antes de armazenar o arquivo
    cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados temporariamente
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

async function uploadToGCP(file) {
  const destination = `faturas/${file.originalname}`;
  await bucket.bucket(bucketName).upload(file.path, {
    destination: destination,
  });
  console.log(`Arquivo enviado para o bucket: ${destination}`);
  return `https://storage.googleapis.com/${bucketName}/${destination}`;
}

// Rota para upload de faturas
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Extrair dados do PDF
    const dadosFatura = await pdfParser.extractData(file.path);

    // Enviar o arquivo PDF para o bucket no GCP
    const pdfUrl = await uploadToGCP(file);

    // Verificar se o cliente existe com base no número do cliente extraído
    if (!dadosFatura.numCliente) {
      return res.status(400).json({ error: 'Número do cliente não encontrado no PDF' });
    }

    const cliente = await Cliente.findOne({ where: { numeroCliente: dadosFatura.numCliente } });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar se já existe uma fatura com o mesmo 'numero_fatura', 'referencia_mes' e 'valor_a_pagar'
    const faturaExistente = await Fatura.findOne({
      where: {
        numero_fatura: dadosFatura.numInstalacao,
        referencia_mes: dadosFatura.mesReferencia,
        valor_a_pagar: parseFloat(dadosFatura.totalPagar) || 0
      }
    });

    let novaFatura;

    if (faturaExistente) {
      // Atualizar a fatura existente
      await faturaExistente.update({
        file_name: file.originalname,
        valor_total: parseFloat(dadosFatura.totalPagar) || 0,
        referencia_mes: dadosFatura.mesReferencia,
        vencimento: new Date(dadosFatura.vencimento),
        valor_a_pagar: parseFloat(dadosFatura.totalPagar) || 0,
        consumo_kwh: dadosFatura.consumo || 0,
        itens_faturados: {
          energiaEletrica: dadosFatura.valoreFaturados.energiaEletrica,
          energiaSCEESICMS: dadosFatura.valoreFaturados.energiaSCEESICMS,
          energiaCompensadaGD: dadosFatura.valoreFaturados.energiaCompensadaGD,
          contribuicaoIluminacao: dadosFatura.valoreFaturados.contribuicaoIluminacao
        }
      });
      novaFatura = faturaExistente;  // Usar a fatura existente
    } else {
      // Criar nova fatura
      novaFatura = await Fatura.create({
        clienteId: cliente.id,
        file_name: file.originalname,
        numero_fatura: dadosFatura.numInstalacao,
        valor_total: parseFloat(dadosFatura.totalPagar) || 0,
        referencia_mes: dadosFatura.mesReferencia,
        vencimento: new Date(dadosFatura.vencimento),
        valor_a_pagar: parseFloat(dadosFatura.totalPagar) || 0,
        consumo_kwh: dadosFatura.consumo || 0,
        itens_faturados: {
          energiaEletrica: dadosFatura.valoreFaturados.energiaEletrica,
          energiaSCEESICMS: dadosFatura.valoreFaturados.energiaSCEESICMS,
          energiaCompensadaGD: dadosFatura.valoreFaturados.energiaCompensadaGD,
          contribuicaoIluminacao: dadosFatura.valoreFaturados.contribuicaoIluminacao
        }
      });
    }

    // Preencher a tabela FaturaDetalhes
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

    console.log('Fatura criada ou atualizada com sucesso');
    res.status(201).json({ message: 'Fatura criada ou atualizada com sucesso', fatura: novaFatura });
  } catch (error) {
    console.error('Erro ao fazer upload da fatura:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da fatura' });
  }
});

module.exports = router;
