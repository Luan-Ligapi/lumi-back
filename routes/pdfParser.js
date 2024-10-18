const fs = require('fs');
const pdf = require('pdf-parse');

module.exports = async (filePath) => {
  try {
    console.log('Iniciando extração de dados do PDF:', filePath);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);

    console.log('Dados extraídos com sucesso:', data.text);
    return data.text;
  } catch (error) {
    console.error('Erro ao extrair os dados do PDF:', error.message);
    throw error;
  }
};

