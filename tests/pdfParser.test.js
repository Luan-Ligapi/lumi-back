const fs = require('fs');
const path = require('path');

test('Extração de número do cliente do PDF', async () => {
  const validPdfPath = path.resolve(__dirname, '../assets/Faturas/Instalação_ 3001116735/3001116735-01-2024.pdf');
  // Verificar se o arquivo existe
  if (!fs.existsSync(validPdfPath)) {
    throw new Error(`File not found: ${validPdfPath}`);
  }

  const dataBuffer = fs.readFileSync(validPdfPath);
  // Continuar o teste de extração normalmente...
});

test('Erro ao tentar extrair dados de um PDF inválido', async () => {
  const invalidPdfPath = path.resolve(__dirname, '../assets/imagem.png');
  
  if (!fs.existsSync(invalidPdfPath)) {
    throw new Error(`File not found: ${invalidPdfPath}`);
  }

  const dataBuffer = fs.readFileSync(invalidPdfPath);
  // Continuar o teste com o PDF inválido...
});
