# Documentação para Setup Local GEOMAP

Este projeto está utilizando Vite com shadcn + tailwind para estilização, e uma API em Node.js escrita em TS, com banco de dados SQLite com PrismaORM.
Importante: A biblioteca de mapas selecionada para este projeto foi a `Mapbox GL`, caso não tenha uma conta no site oficial, crie em: `https://www.mapbox.com/`.

---

## 📁 Estrutura do Projeto

```
raiz/
├── api/        # API (Node.js + TS + Express + Prisma + SQLite)
├── front/      # Frontend (Vite)
├── files/      # Arquivos utilizados como base de dados para pontos no mapa
└── README.md
```

---

## ✅ Pré-requisitos

Para iniciar o projeto, é necessário se ter instalado:

### 1. Node.js

* Versão **Node.js 20** ou superior

---

### 2. Sistema Operacional Recomendado

* Linux (testado)
* macOS ou Windows também funcionam (com Node + npm)

* *Este projeto foi desenvolvido dentro do ambiente linux.*
---

## 🔧 Backend (API)

### 📂 Acessar a pasta da API

Abra um novo terminal na raiz do projeto e digite:

```bash
cd api
```

---

### 📦 Instalar dependências

```bash
npm install
```

Este comando irá instalar todas as dependências, incluindo:

* Express
* Prisma
* SQLite (better-sqlite3)
* Jest (testes)

---

### 🗄️ Banco de Dados (SQLite + Prisma)

O projeto usa **SQLite** com Prisma.

* O arquivo do banco local é:

```
api/dev.db
```

---

### ⚙️ Variáveis de Ambiente

1. Crie um arquivo `.env` na raiz da pasta `api`:

```bash
touch .env
```

2. Copie o arquivo `.env.example` para dentro do novo arquivo `.env`, e terá algo como:

```env
PORT=5000
JWT_SECRET="supersecret"
DATABASE_URL="file:./dev.db"
```

> ⚠️ Ajuste os valores conforme sua necessidade.

---

### 📁 Prisma

É necessário gerar o client do Prisma manualmente:

```bash
npx prisma generate
```

---

### ▶️ Rodar a API em modo desenvolvimento

```bash
npm run dev
```

A API ficará disponível em:

```
http://localhost:5000
```

---

### 🧪 Testes (Jest)

Rodar testes:

```bash
npm test
```

Modo watch:

```bash
npm run test:watch
```

---

## 🎨 Frontend (Vite)

### 📂 Acessar a pasta do frontend

Abra um novo terminal na raiz do projeto e digite:

```bash
cd front
```

---

### 📦 Instalar dependências

```bash
npm install
```

Este comando irá instalar todas as dependências, incluindo:

* React
* Vite
* Mapbox GL + Draw
* TailwindCSS + shadcn/ui

---

### ⚙️ Variáveis de Ambiente (Frontend)

1. Crie um arquivo `.env` na raiz da pasta `front`:

```bash
touch .env
```

2. Copie o arquivo `.env.example` para dentro do novo arquivo `.env`, e terá algo como:

```env
VITE_MAPBOX_API_TOKEN=''
VITE_API_URL='http://localhost:5000'
```

> ⚠️ É obrigatório que o campo VITE_MAPBOX_API_TOKEN seja preenchido com seu token MAPBOX.

---

### ▶️ Rodar o frontend em modo desenvolvimento

Com o arquivo `.env` configurado, rode:

```bash
npm run dev
```

O Vite irá abrir por padrão em:

```
Local: http://localhost:5173/
```

---

### 🏗️ Build do projeto (FRONTEND)

```bash
npm run build
```

Preview do build:

```bash
npm run preview
```

O build irá abrir por padrão em:

```
Local: http://localhost:4173/
```

---

## 🚀 Pronto!

Com esses passos, o projeto **GEOMAP** estará rodando completamente em ambiente local.
Um usuário para teste já está criado, as credenciais de acesso são:

```bash

email: guest@email.com

password: guest@password

```