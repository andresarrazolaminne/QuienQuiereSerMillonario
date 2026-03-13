#!/bin/bash
# Instala el servicio systemd para el backend de Millonario
# Ejecutar con: sudo ./scripts/install-service.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"

# Detectar usuario que ejecuta (antes del sudo)
ACTUAL_USER="${SUDO_USER:-$USER}"
if [ "$ACTUAL_USER" = "root" ]; then
    ACTUAL_USER="ubuntu"
fi

NODE_PATH=$(command -v node 2>/dev/null || echo "/usr/bin/node")

SERVICE_FILE="/etc/systemd/system/millonario.service"

log_info() { echo "[INFO] $1"; }

log_info "Instalando servicio systemd..."
log_info "Proyecto: $PROJECT_ROOT"
log_info "Usuario:  $ACTUAL_USER"

cat > "$SERVICE_FILE" << EOF
[Unit]
Description=Quién Quiere Ser Millonario - Backend
After=network.target

[Service]
Type=simple
User=$ACTUAL_USER
WorkingDirectory=$BACKEND_DIR
ExecStart=$NODE_PATH src/server.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=$BACKEND_DIR/.env

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable millonario
systemctl start millonario

log_info "Servicio instalado y arrancado."
echo ""
echo "  Comandos útiles:"
echo "    sudo systemctl status millonario   # Ver estado"
echo "    sudo systemctl restart millonario  # Reiniciar"
echo "    sudo systemctl stop millonario     # Detener"
echo ""
