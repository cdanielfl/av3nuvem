# 🚀 Deploy Automático no EC2

## Comandos para usar no EC2:

### 1. **Conectar no EC2:**
```bash
ssh -i sua-chave.pem ubuntu@SEU_IP_EC2
```

### 2. **Clonar e rodar (só 2 comandos!):**
```bash
git clone https://github.com/cdanielfl/av3nuvem.git
cd av3nuvem && ./deploy.sh
```

### 3. **Acessar:**
- **Frontend:** `http://SEU_IP_EC2:8080`
- **Backend API:** `http://SEU_IP_EC2:3000/api/products`
- **Teste:** `http://SEU_IP_EC2:3000/api/test`

## ⚠️ Lembrete importante:
**Liberar portas no Security Group:**
- **3000** (Backend)
- **8080** (Frontend)

## 🔄 Para atualizar código:
```bash
cd av3nuvem
git pull
./deploy.sh
```

## 📊 Comandos úteis:
```bash
pm2 status          # Ver status
pm2 logs            # Ver logs
pm2 restart all     # Reiniciar
pm2 stop all        # Parar tudo
```

## 🤖 Deploy 100% automático:
Cole o conteúdo de `user-data.sh` no User Data ao criar o EC2!