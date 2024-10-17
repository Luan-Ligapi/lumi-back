const express = require('express');
const multer = require('multer');
const pdfParser = require('../pdfParser');  // Certifique-se de que o pdfParser esteja configurado para salvar no banco
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Endpoint para upload de PDF
router.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;

    try {
        await pdfParser(filePath);
        res.status(200).json({ message: 'PDF processado e dados salvos com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o PDF.' });
    }
});

module.exports = router;
