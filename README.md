# Product CRUD - Sistema de Gerenciamento de Produtos

Sistema completo de CRUD (Create, Read, Update, Delete) para produtos com frontend e backend integrados.

## 📋 Funcionalidades Implementadas

### ✅ Etapa 1: Campo de Descrição
- **Adicionado campo "description"** no formulário de adicionar produto
- **Atualizado frontend** para exibir descrição na lista de produtos
- **Modificado backend** para salvar descrição no banco de dados

### ✅ Etapa 2: Botão de Update
- **Implementado botão "Update"** para cada produto na lista
- **Funcionalidade via prompt**: ao clicar, abre prompts para inserir novos valores
- **Valores pré-preenchidos** com dados atuais do produto
- **Atualização automática** da lista após modificação

### ✅ Etapa 3: Consulta por ID
- **Seção dedicada** para busca de produto por ID
- **Exibição detalhada** do produto encontrado
- **Tratamento de erros** para produtos não encontrados

### ✅ Etapa 4: Backend Node.js + Supabase
- **API REST completa** com Express.js
- **Integração com Supabase** para persistência de dados
- **Endpoints implementados**:
  - `GET /api/products` - Listar todos os produtos
  - `GET /api/products/:id` - Buscar produto por ID
  - `POST /api/products` - Criar novo produto
  - `PUT /api/products/:id` - Atualizar produto
  - `DELETE /api/products/:id` - Deletar produto

## 🗂️ Estrutura do Projeto

```
av3nuvem/
├── index.html          # Frontend da aplicação
├── app.js             # JavaScript do frontend
├── style.css          # Estilos CSS
├── server.js          # Servidor Express + API REST
├── package.json       # Dependências Node.js
├── .env              # Variáveis de ambiente (Supabase)
└── README.md         # Este arquivo
```

## 🚀 Como Executar

### 1. Configurar Supabase
```sql
-- Criar tabela no Supabase
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Configurar Variáveis de Ambiente
Edite o arquivo `.env`:
```
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
PORT=3000
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Executar Aplicação
```bash
npm start
```

### 5. Acessar
Abra o navegador em: `http://localhost:3000`

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Banco de Dados**: Supabase (PostgreSQL)
- **Deploy**: Preparado para AWS (Elastic Beanstalk, EC2, Lambda)

## 📦 Dependências

```json
{
  "express": "^4.18.2",
  "@supabase/supabase-js": "^2.38.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

## 🌐 Deploy na AWS

### Opção 1: Elastic Beanstalk
1. Criar arquivo zip do projeto
2. Fazer upload no Elastic Beanstalk
3. Configurar variáveis de ambiente

### Opção 2: EC2
1. Conectar na instância EC2
2. Clonar repositório
3. Instalar Node.js e dependências
4. Executar aplicação

### Opção 3: Lambda + API Gateway
1. Usar Serverless Framework
2. Configurar endpoints
3. Deploy automático

## 🔧 Alterações Realizadas

### Frontend (index.html)
- ✅ Adicionado campo de descrição no formulário
- ✅ Removido formulário de update (substituído por botão)
- ✅ Adicionada seção de busca por ID
- ✅ Removidas dependências do Supabase CDN

### JavaScript (app.js)
- ✅ Implementadas funções CRUD completas
- ✅ Substituído Supabase client por fetch API
- ✅ Adicionada funcionalidade de update via prompt
- ✅ Implementada busca por ID
- ✅ Traduzidos todos os comentários para português

### Backend (server.js)
- ✅ Criado servidor Express completo
- ✅ Implementados todos os endpoints REST
- ✅ Integração com Supabase
- ✅ Middleware de CORS e JSON
- ✅ Servir arquivos estáticos
- ✅ Comentários em português

### Configuração
- ✅ Criado package.json com dependências
- ✅ Arquivo .env para variáveis de ambiente
- ✅ Scripts npm para desenvolvimento e produção