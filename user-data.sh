#!/bin/bash

# Script User Data para EC2 - Deploy Automático
# Cole este script no User Data ao criar a instância EC2

# Atualizar sistema
apt update -y

# Instalar Git
apt install git -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Instalar Python3
apt install python3 -y

# Instalar PM2
npm install -g pm2

# Clonar repositório
cd /home/ubuntu
git clone https://github.com/cdanielfl/av3nuvem.git
chown -R ubuntu:ubuntu av3nuvem

# Executar como usuário ubuntu
sudo -u ubuntu bash << 'EOF'
cd /home/ubuntu/av3nuvem

# Instalar dependências do backend
cd backend
npm install

# Iniciar backend
pm2 start server.js --name "product-backend"

# Iniciar frontend
cd ..
pm2 start --name "product-frontend" --interpreter python3 -- -m http.server 8080

# Configurar PM2 para auto-start
pm2 startup
pm2 save

EOF

# Log de conclusão
echo "🚀 Deploy automático concluído!" > /var/log/deploy.log
echo "Backend: porta 3000" >> /var/log/deploy.log
echo "Frontend: porta 8080" >> /var/log/deploy.log