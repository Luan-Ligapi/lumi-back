const express = require('express');
const multer = require('multer');
const pdfParser = require('../pdfParser');
const router = express.Router();

const upload = multer({ dest: 'upload/' });

// Endpoint para upload de PDF
router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
      console.log('Erro: Arquivo PDF ausente no upload.');
      return res.status(400).json({ error: 'Arquivo PDF é obrigatório' });
    }
  
    const filePath = req.file.path;
    console.log('Processando arquivo PDF:', filePath);
  
    try {
      await pdfParser(filePath);
      console.log('PDF processado com sucesso.');
      res.status(200).json({ message: 'PDF processado com sucesso' });
    } catch (error) {
      console.error('Erro ao processar o PDF:', error);
      res.status(500).json({ error: 'Erro ao processar o PDF' });
    }
  });
  

module.exports = router;
