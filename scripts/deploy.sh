#!/bin/bash
# Script de despliegue - Quién Quiere Ser Millonario
# Ejecutar en el servidor después de clonar el repositorio

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_err() { echo -e "${RED}[ERROR]${NC} $1"; }

cd "$PROJECT_ROOT"

# 1. Verificar Node.js
log_info "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    log_err "Node.js no está instalado. Instálalo con: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install -y nodejs"
    exit 1
fi
NODE_VERSION=$(node -v)
log_info "Node.js $NODE_VERSION encontrado"

# 2. Instalar dependencias del backend
log_info "Instalando dependencias del backend..."
cd "$BACKEND_DIR"
npm ci --omit=dev

# 3. Instalar dependencias del frontend y construir
log_info "Instalando dependencias del frontend..."
cd "$FRONTEND_DIR"
npm ci
log_info "Construyendo frontend..."
npm run build

# 4. Crear directorios necesarios
log_info "Creando directorios..."
mkdir -p "$BACKEND_DIR/data"
mkdir -p "$BACKEND_DIR/uploads"
touch "$BACKEND_DIR/uploads/.gitkeep" 2>/dev/null || true

# 5. Configurar .env
ENV_FILE="$BACKEND_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
    log_info "Creando .env (usa valores por defecto o edita después)..."
    cat > "$ENV_FILE" << 'ENVEOF'
PORT=3001
ADMIN_KEY=admin123
NODE_ENV=production
ENVEOF
    log_warn "Archivo .env creado. ¡Cambia ADMIN_KEY en producción!"
    log_warn "Si el puerto 3001 está ocupado, edita PORT en $ENV_FILE"
else
    log_info "Archivo .env ya existe"
fi

# 6. Resumen
echo ""
log_info "=== Despliegue completado ==="
echo ""
echo "  La app se sirve íntegramente desde Node (API + frontend estático)."
echo ""
echo "  Backend:  $BACKEND_DIR"
echo "  Frontend: $FRONTEND_DIR/dist (servido por el backend)"
echo "  Puerto:   $(grep -E '^PORT=' "$ENV_FILE" 2>/dev/null | cut -d= -f2 || echo '3001')"
echo ""
echo "  Para iniciar (NODE_ENV=production para servir el frontend):"
echo "    cd $BACKEND_DIR && NODE_ENV=production node src/server.js"
echo ""
echo "  Para usar con systemd, ejecuta:"
echo "    sudo ./scripts/install-service.sh"
echo ""
