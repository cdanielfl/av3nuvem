#!/bin/bash

echo "🚀 Deploy Node.js - Frontend + Backend"
echo "====================================="

# Instalar Node.js se não existir
if ! command -v node &> /dev/null; then
    echo "⚠️  Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js instalado!"
fi

# Instalar PM2 se não existir
if ! command -v pm2 &> /dev/null; then
    echo "⚠️  Instalando PM2..."
    sudo npm install -g pm2
    echo "✅ PM2 instalado!"
fi

# Parar processos anteriores
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Instalar dependências
echo "📦 Instalando dependências..."
cd backend
npm install

# Iniciar com PM2
echo "🚀 Iniciando aplicação..."
pm2 start server.js --name "product-app"

# Configurar auto-start
pm2 startup
pm2 save

echo ""
echo "✅ Deploy concluído!"
echo "=================================="
echo "🌐 Aplicação: http://$(curl -s ifconfig.me):3000"
echo "📊 API:       http://$(curl -s ifconfig.me):3000/api/products"
echo "🔍 Teste:     http://$(curl -s ifconfig.me):3000/api/test"
echo ""
echo "📋 Comandos úteis:"
echo "   pm2 status     - Ver status"
echo "   pm2 logs       - Ver logs"
echo "   pm2 restart all - Reiniciar"

pm2 status