const { Storage } = require('@google-cloud/storage');
const path = require('path');
const express = require('express');
const router = express.Router();
const pdfParser = require('../services/pdfParser');
const { Fatura, Cliente } = require('../models');
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
// Rota para upload de faturas
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Extrair dados do PDF
    const dadosFatura = await pdfParser.extractData(file.path);
    //console.log('Dados extraídos do PDF:', dadosFatura);

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

    // Criar nova fatura no banco de dados
    const novaFatura = await Fatura.create({
      clienteId: cliente.id,
      numero_fatura: dadosFatura.numInstalacao,
      valor_total: parseFloat(dadosFatura.totalPagar) || 0, // Certifica-se que valor é um número
      referencia_mes: dadosFatura.mesReferencia,
      vencimento: new Date(dadosFatura.vencimento), // Converte vencimento para um objeto Date
      valor_a_pagar: parseFloat(dadosFatura.totalPagar) || 0, // Certifica-se que valor é um número
      consumo_kwh: dadosFatura.consumo || 0, // Define um valor padrão para evitar null ou NaN
      itens_faturados: {
        energiaEletrica: dadosFatura.valoreFaturados.energiaEletrica,
        energiaSCEESICMS: dadosFatura.valoreFaturados.energiaSCEESICMS,
        energiaCompensadaGD: dadosFatura.valoreFaturados.energiaCompensadaGD,
        contribuicaoIluminacao: dadosFatura.valoreFaturados.contribuicaoIluminacao
      }
    });
    


    console.log('Fatura criada com sucesso');

    res.status(201).json({ message: 'Fatura criada com sucesso', fatura: novaFatura });
  } catch (error) {
    console.error('Erro ao fazer upload da fatura:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da fatura' });
  }
});

module.exports = router;
