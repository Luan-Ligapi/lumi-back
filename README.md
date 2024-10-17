
# Projeto de Processamento de Faturas

Este projeto processa faturas em PDF e salva os dados extraídos em um banco de dados PostgreSQL, além de expor rotas para manipulação de clientes e faturas.


## Instalação

Instale lumi-back com npm

```bash
  npm install lumi-back
  cd lumi-back
  npm install
```
Configure o banco de dados no arquivo .env:
```bash
DATABASE_URL=postgres://user:password@localhost:5432/database
```
Rode as migrações:
```bash
npx sequelize-cli db:migrate
```
Inicie o servidor:
```bash
npm start
```
Para rodar os testes:
```bash
npm test
```
Documentação da API
Clientes
Retorna todos os clientes
http
Copiar código
  GET /clientes
Parâmetro	Tipo	Descrição
Nenhum	N/A	Nenhum parâmetro necessário.
Retorna um cliente específico
http
Copiar código
  GET /clientes/${id}
Parâmetro	Tipo	Descrição
id	integer	Obrigatório. O ID do cliente que você quer.
Cria um novo cliente
http
Copiar código
  POST /clientes
Parâmetro	Tipo	Descrição
nome	string	Obrigatório. O nome do cliente.
email	string	Obrigatório. O e-mail do cliente.
Atualiza um cliente
http
Copiar código
  PUT /clientes/${id}
Parâmetro	Tipo	Descrição
id	integer	Obrigatório. O ID do cliente a ser atualizado.
nome	string	Opcional. O novo nome do cliente.
email	string	Opcional. O novo e-mail do cliente.
Deleta um cliente
http
Copiar código
  DELETE /clientes/${id}
Parâmetro	Tipo	Descrição
id	integer	Obrigatório. O ID do cliente a ser deletado.
Faturas
Retorna todas as faturas
http
Copiar código
  GET /faturas
Parâmetro	Tipo	Descrição
numeroCliente	string	Opcional. Número do cliente para filtrar.
mesReferencia	string	Opcional. Mês de referência para filtrar (MM/AAAA).
Retorna uma fatura específica
http
Copiar código
  GET /faturas/${id}
Parâmetro	Tipo	Descrição
id	integer	Obrigatório. O ID da fatura que você quer.
Cria uma nova fatura
http
Copiar código
  POST /faturas
Parâmetro	Tipo	Descrição
clienteId	integer	Obrigatório. ID do cliente relacionado à fatura.
data_emissao	date	Obrigatório. Data de emissão da fatura.
valor_total	float	Obrigatório. Valor total da fatura.
numero_fatura	string	Obrigatório. Número da fatura.
Atualiza uma fatura
http
Copiar código
  PUT /faturas/${id}
Parâmetro	Tipo	Descrição
id	integer	Obrigatório. O ID da fatura a ser atualizada.
data_emissao	date	Opcional. A nova data de emissão da fatura.
valor_total	float	Opcional. O novo valor total da fatura.
numero_fatura	string	Opcional. O novo número da fatura.
Deleta uma fatura
http
Copiar código
  DELETE /faturas/${id}
Parâmetro	Tipo	Descrição
id	integer	Obrigatório. O ID da fatura a ser deletada.
Upload de PDF
Faz o upload de um arquivo PDF e processa as faturas
http
Copiar código
  POST /upload
Parâmetro	Tipo	Descrição
file	file	Obrigatório. O arquivo PDF a ser processado.
Exemplo de Uso
Upload de PDF
Use uma ferramenta como Postman ou cURL para fazer o upload de um PDF:

bash
Copiar código
curl -X POST http://localhost:3000/upload -F 'file=@/caminho/para/o/arquivo.pdf'
Isso processará o PDF e salvará os dados extraídos no banco de dados.

Funcionalidades do Projeto
Upload de PDFs e processamento automático dos dados extraídos.
Testes automatizados para a extração de PDFs, rotas de clientes e faturas, além do upload de PDF.
