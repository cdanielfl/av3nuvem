#!/bin/bash

echo "🚀 Deploy Automático - Product CRUD"
echo "=================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para logs coloridos
log_info() { echo -e "${GREEN}✅ $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    log_warn "Node.js não encontrado. Instalando..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    log_info "Node.js instalado!"
fi

# Verificar se Python3 está instalado
if ! command -v python3 &> /dev/null; then
    log_warn "Python3 não encontrado. Instalando..."
    sudo apt update
    sudo apt install python3 -y
    log_info "Python3 instalado!"
fi

# Instalar PM2 globalmente (para manter processos rodando)
if ! command -v pm2 &> /dev/null; then
    log_warn "PM2 não encontrado. Instalando..."
    sudo npm install -g pm2
    log_info "PM2 instalado!"
fi

# Parar processos anteriores se existirem
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Instalar dependências do backend
log_info "Instalando dependências do backend..."
cd backend
npm install

# Iniciar backend com PM2
log_info "Iniciando backend na porta 3000..."
pm2 start server.js --name "product-backend"

# Voltar para raiz e iniciar frontend
cd ..
log_info "Iniciando frontend na porta 8080..."
pm2 start --name "product-frontend" --interpreter python3 -- -m http.server 8080

# Configurar PM2 para iniciar automaticamente
pm2 startup
pm2 save

# Mostrar status
echo ""
log_info "🎉 Deploy concluído!"
echo "=================================="
echo "📊 Backend API: http://$(curl -s ifconfig.me):3000/api/products"
echo "🌐 Frontend:    http://$(curl -s ifconfig.me):8080"
echo "🔍 Teste API:   http://$(curl -s ifconfig.me):3000/api/test"
echo ""
echo "📋 Comandos úteis:"
echo "   pm2 status          - Ver status dos processos"
echo "   pm2 logs            - Ver logs em tempo real"
echo "   pm2 restart all     - Reiniciar tudo"
echo "   pm2 stop all        - Parar tudo"
echo ""

# Mostrar status do PM2
pm2 status