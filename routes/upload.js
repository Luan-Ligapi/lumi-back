const express = require('express');
const multer = require('multer');
const pdfParser = require('../utils/pdfParser');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (fileExtension !== '.pdf') {
            return cb(new Error('Arquivo inválido. Por favor, envie um arquivo PDF.'));
        }
        cb(null, true);
    }
});

router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file || req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Arquivo inválido. Por favor, envie um arquivo PDF.' });
    }
    
    try {
        const filePath = req.file.path;
        console.log(`Processando arquivo PDF: ${filePath}`);
        
        // Processa o PDF
        const dadosPdf = await pdfParser(filePath);
        
        return res.status(200).json({
            message: 'PDF processado com sucesso',
            filePath,
            dados: dadosPdf
        });
    } catch (error) {
        console.error('Erro ao processar o PDF:', error.message);
        return res.status(500).json({ error: 'Erro ao processar o PDF' });
    }
});

module.exports = router;
