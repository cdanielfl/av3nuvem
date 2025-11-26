# Backend - Product CRUD API

API REST para gerenciamento de produtos usando Node.js + Express + Supabase.

## 🚀 Como Executar

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar .env:**
```
SUPABASE_URL=sua_url_do_supabase
SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
PORT=3000
```

3. **Executar:**
```bash
npm start
```

## 📡 Endpoints

- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Buscar por ID
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

## 🛠️ Tecnologias

- Node.js
- Express.js
- Supabase
- CORS