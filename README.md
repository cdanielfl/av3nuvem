# Product CRUD - Sistema Separado

Sistema de CRUD para produtos com **frontend e backend separados**.

## 📁 Estrutura

```
av3nuvem/
├── frontend/          # Interface web
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── README.md
├── backend/           # API REST
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── README.md
└── README.md
```

## 🚀 Como Executar

### 1. Backend (Terminal 1)
```bash
cd backend
npm install
npm start
```

### 2. Frontend (Terminal 2)
```bash
cd frontend
python -m http.server 8080
# ou npx serve .
```

### 3. Acessar
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3000/api/products

## ✅ Vantagens da Separação

- **Deploy independente**: Frontend pode ir para CDN, backend para servidor
- **Escalabilidade**: Cada parte pode escalar separadamente  
- **Manutenção**: Código mais organizado
- **Times**: Frontend e backend podem ser desenvolvidos por equipes diferentes

## 🌐 Deploy Sugerido

- **Frontend:** Netlify, Vercel, S3 + CloudFront
- **Backend:** Heroku, Railway, AWS Lambda