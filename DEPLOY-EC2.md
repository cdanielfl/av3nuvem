# Deploy no EC2

## 🚀 Passos para rodar no EC2

### 1. Preparar EC2
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Python (para frontend)
sudo apt update
sudo apt install python3 -y
```

### 2. Configurar Security Group
**Liberar portas:**
- **3000** (Backend API)
- **8080** (Frontend)
- **22** (SSH)

### 3. Upload do código
```bash
# Via SCP ou Git
scp -r av3nuvem/ ubuntu@SEU_IP_EC2:~/
# ou
git clone seu-repositorio
```

### 4. Rodar Backend
```bash
cd av3nuvem/backend
npm install
npm start
```

### 5. Rodar Frontend (novo terminal)
```bash
cd av3nuvem/frontend
python3 -m http.server 8080
```

### 6. Acessar
- **Frontend:** `http://SEU_IP_EC2:8080`
- **API:** `http://SEU_IP_EC2:3000/api/products`

## 🔧 Configurações importantes

- ✅ Backend escuta em `0.0.0.0:3000` (todas interfaces)
- ✅ Frontend detecta automaticamente o IP
- ✅ CORS configurado para aceitar qualquer origem

## 🛡️ Security Group EC2
```
Type: Custom TCP
Port: 3000
Source: 0.0.0.0/0

Type: Custom TCP  
Port: 8080
Source: 0.0.0.0/0
```