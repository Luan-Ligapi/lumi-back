<p align="center">
  <img src="https://img.icons8.com/?size=512&id=55494&format=png" width="20%" alt="LUMI-BACK-logo">
</p>
<p align="center">
    <h1 align="center">LUMI-BACK</h1>
</p>
<p align="center">
    <em><code>❯ Projeto teste seletivo Lumi</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Luan-Ligapi/lumi-back?style=flat&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Luan-Ligapi/lumi-back?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Luan-Ligapi/lumi-back?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Luan-Ligapi/lumi-back?style=flat&color=0080ff" alt="repo-language-count">
</p>
<p align="center">
		<em>feito usando as seguintes tecnologias:</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">
	<img src="https://img.shields.io/badge/Sequelize-52B0E7.svg?style=flat&logo=Sequelize&logoColor=white" alt="Sequelize">
	<img src="https://img.shields.io/badge/Prisma-2D3748.svg?style=flat&logo=Prisma&logoColor=white" alt="Prisma">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>

<br>

#####  Indices

- [Overview](#overview)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Modules](#modules)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
- [Project Roadmap](#project-roadmap)

---

##  Overview

<code>❯ Projeto focado em interpretar faturas em pdf e disponibilizar o os dados</code>

---

##  Features

<code>❯ 
- CRUD simples para cadastrar usuários e faturas
- Parser que interpreta o pdf para salvar a fatura no banco Postgres
- Pagina de Dashboard com graficos que exibe os consumos medios e totais dos clientes totais e individualmente
- Pagina com listagem de clientes e faturas onde é possível ter acesso aos arquivos disponibilizados em um bucket google
</code>

---

##  Repository Structure

```sh
└── lumi-back/
    ├── Dockerfile
    ├── README.md
    ├── api-collection.json
    ├── assets
    │   ├── Faturas
    │   ├── imagem.png
    │   └── sample.txt
    ├── config
    │   ├── config.json
    │   └── jest.config.js
    ├── docker-compose.yml
    ├── migrations
    ├── models
    │   ├── cliente.js
    │   ├── fatura.js
    │   └── index.js
    ├── package-lock.json
    ├── package.json
    ├── pdfParser.js
    ├── routes
    │   ├── cliente.js
    │   ├── fatura.js
    │   └── upload.js
    ├── seeders
    ├── server.js
    ├── tests
    ├── upload
    └── utils
        └── pdfParser.js
```

---

##  Modules

<details closed><summary>.</summary>

| File | Summary |
| --- | --- |
| [api-collection.json](https://github.com/Luan-Ligapi/lumi-back/blob/main/api-collection.json) | <code>❯ Coleção com exemplo de uso de rotas de rotas</code> |
| [server.js](https://github.com/Luan-Ligapi/lumi-back/blob/main/server.js) | <code>❯ Arquivo motor</code> |
| [pdfParser.js](https://github.com/Luan-Ligapi/lumi-back/blob/main/pdfParser.js) | <code>❯ Conversor de pdf para array de strings</code> |

</details>




<details closed><summary>models</summary>
![alt text](image.png)
</details>

<details closed><summary>routes</summary>

| File | Summary |
| --- | --- |
| [upload.js](https://github.com/Luan-Ligapi/lumi-back/blob/main/routes/upload.js) | <code>❯ Upload de faturas</code> |
| [cliente.js](https://github.com/Luan-Ligapi/lumi-back/blob/main/routes/cliente.js) | <code>❯ crud clientes</code> |
| [fatura.js](https://github.com/Luan-Ligapi/lumi-back/blob/main/routes/fatura.js) | <code>❯ crud faturas</code> |

</details>

---

##  Getting Started


###  Installation

Build the project from source:

1. Clone the lumi-back repository:
```sh
❯ git clone https://github.com/Luan-Ligapi/lumi-back
```

2. Navigate to the project directory:
```sh
❯ cd lumi-back
```

3. Install the required dependencies:
```sh
❯ npm install
```

###  Usage

To run the project, execute the following command:

```sh
❯ npm start
```

###  Tests

Execute the test suite using the following command:

```sh
❯ npm test
```

---

##  Project Roadmap

- [X] **`Task 1`**: <strike>Protótipo</strike>
- [ ] **`Task 2`**: Ajustar parser para interpretar melhor e com mais dados, tem um bug de conversão em quem usa mais de 1000 kwh/mes.
- [ ] **`Task 3`**: novas rotas, novos graficos, autenticação.

---

