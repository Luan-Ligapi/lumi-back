const pdf = require('pdf-parse');
const fs = require('fs');

const pdfParser = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);

        // Extração de exemplo (modifique de acordo com seu caso)
        const numeroCliente = data.text.match(/Nº DO CLIENTE\s+(\d+)/);
        const mesReferencia = data.text.match(/Mês de referência\s+([A-Za-z]+\/\d{2})/);
        const energiaEletrica = data.text.match(/Energia Elétrica.*?(\d+)\s+kWh\s+R\$\s+([\d,]+)/);

        if (numeroCliente && mesReferencia && energiaEletrica) {
            console.log('Dados extraídos com sucesso!');
            return {
                numeroCliente: numeroCliente[1],
                mesReferencia: mesReferencia[1],
                energiaEletrica: energiaEletrica[1],
                valor: energiaEletrica[2]
            };
        } else {
            console.log('Erro na extração de dados');
            throw new Error('Erro ao extrair os dados do PDF');
        }
    } catch (error) {
        console.error('Erro ao processar o PDF:', error);
        throw error;
    }
};

module.exports = pdfParser;
