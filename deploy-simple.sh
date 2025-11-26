#!/bin/bash

echo "🚀 Deploy Simples - Só Node.js"
echo "=============================="

# Instalar Node.js se não existir
if ! command -v node &> /dev/null; then
    echo "⚠️  Instalando Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js instalado!"
fi

# Instalar dependências do backend
echo "📦 Instalando dependências..."
cd backend
npm install

# Rodar backend
echo "🚀 Iniciando backend..."
echo "📊 Backend rodando em: http://$(curl -s ifconfig.me):3000"
echo "🔍 Teste: http://$(curl -s ifconfig.me):3000/api/test"
echo ""
echo "⚠️  Frontend: Você precisa servir a pasta frontend/ separadamente"
echo "   Opções: Live Server, Python, ou outro servidor web"

npm start