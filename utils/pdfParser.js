const pdfParse = require('pdf-parse');
const fs = require('fs');

const parsePdf = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    console.log('Dados extraídos com sucesso', data.text);
    return data.text;
  } catch (error) {
    console.error('Erro ao processar o PDF', error);
    throw error;
  }
};

module.exports = parsePdf;
