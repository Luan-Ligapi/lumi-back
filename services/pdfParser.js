const fs = require('fs');
const pdfParse = require('pdf-parse'); // Certifique-se de que pdf-parse esteja importado
const extractData = async (pdfPath) => {
  try {
    const dataBuffer = fs.readFileSync(pdfPath); // Read the PDF as buffer
    const data = await pdfParse(dataBuffer); 
    const extractedText = data.text; 
    const result = {};
    const lines = extractedText.split('\n'); // Split text by lines

    lines.forEach((line, index) => {
      // Extract customer number and installation number
      if (line.includes('Nº DO CLIENTE')) {
        const nextLine = lines[index + 1] || ''; // Safe fallback
        
        // Usar uma expressão regular para capturar os dois valores
        const match = nextLine.match(/(\d+)\s+(\d+)/);
      
        if (match) {
          result.numCliente = match[1] || '';    // Captura o número do cliente "7204076116"
          result.numInstalacao = match[2] || ''; // Captura o número da instalação "3001116735"
        }
      }
      
      if (line.includes('Valor a pagar (R$)')) {
        const nextLine = lines[index + 1] || '';
  
        const match = nextLine.match(/(\w+\/\d{4})\s+(\d{2}\/\d{2}\/\d{4})\s+([\d,.]+)/);
        
        if (match) {
          result.mesReferencia = match[1] || ''; // Captura "JAN/2024"
          result.vencimento = match[2] || '';    // Captura "12/02/2024"
          result.totalPagar = match[3] || '';    // Captura "107,38"
        }      
      }
      
      if (line.includes('Valores Faturados')) {
        result.valoreFaturados = {}; // Inicializa o objeto
    
        // Energia Elétrica
        const energiaEletricaLine = lines.find(l => l.includes('Energia Elétrica'));
        if (energiaEletricaLine) {
            const energiaEletricaSplit = energiaEletricaLine.trim().split(/\s+/);
            result.valoreFaturados.energiaEletrica = {
                unidade: 'kWh',
                quantidade: energiaEletricaSplit[2],
                precoUnit: energiaEletricaSplit[3],
                valor: energiaEletricaSplit[4],
                tarifaUnit: energiaEletricaSplit[5]
            };
        }
    
        // Energia SCEE s/ ICMS
        const energiaSCEEICMSLine = lines.find(l => l.includes('Energia SCEE s/ ICMS'));
        if (energiaSCEEICMSLine) {
            const energiaSCEEICMSSplit = energiaSCEEICMSLine.trim().split(/\s+/);
            result.valoreFaturados.energiaSCEESICMS = {
                unidade: 'kWh',
                quantidade: energiaSCEEICMSSplit[4],
                precoUnit: energiaSCEEICMSSplit[5],
                valor: energiaSCEEICMSSplit[6],
                tarifaUnit: energiaSCEEICMSSplit[7]
            };
        }
    
        // Energia Compensada GD
        const energiaCompensadaLine = lines.find(l => l.includes('Energia compensada GD'));
        if (energiaCompensadaLine) {
            const energiaCompensadaSplit = energiaCompensadaLine.trim().split(/\s+/);
            result.valoreFaturados.energiaCompensadaGD = {
                unidade: 'kWh',
                quantidade: energiaCompensadaSplit[4],
                precoUnit: energiaCompensadaSplit[5],
                valor: energiaCompensadaSplit[6],
                tarifaUnit: energiaCompensadaSplit[7]
            };
        }
    
        // Contribuição Iluminação Pública Municipal
        const contribuicaoIluminacaoLine = lines.find(l => l.includes('Contrib Ilum Publica Municipal'));
        if (contribuicaoIluminacaoLine) {
            const contribuicaoIluminacaoSplit = contribuicaoIluminacaoLine.trim().split(/\s+/);
            result.valoreFaturados.contribuicaoIluminacao =  contribuicaoIluminacaoSplit[contribuicaoIluminacaoSplit.length - 1]
        }
    
        // Total
        const totalLine = lines.find(l => l.includes('TOTAL'));
        if (totalLine) {
            const totalSplit = totalLine.trim().split(/\s+/);
            result.valoreFaturados.total = totalSplit[totalSplit.length - 1];
        }
    }


  })
  if(result?.valoreFaturados){
    result.consumo = parseFloat(result?.valoreFaturados?.energiaEletrica?.quantidade) + parseFloat(result?.valoreFaturados?.energiaSCEESICMS?.quantidade)
  }
    return result;

  } catch (error) {
    console.error('Erro ao extrair dados do PDF:', error);
    throw error;
  }
};


// Exemplo de uso
//(async () => {
//  const pdfPath = '../assets/Faturas/Instalação_ 3001116735/3001116735-01-2024.pdf';
//  const extractedData = await extractData(pdfPath);
//  console.log('Dados extraídos:', extractedData);
//})();

module.exports = { extractData };
