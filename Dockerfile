# Usa a versão 16 do Node.js
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de pacotes para o container
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Expõe a porta da aplicação
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "start"]
