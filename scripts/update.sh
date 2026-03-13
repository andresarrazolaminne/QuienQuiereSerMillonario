#!/bin/bash
# Actualización rápida: git pull, rebuild, restart
# Ejecutar en el directorio del proyecto

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "[INFO] Actualizando desde git..."
git pull

echo "[INFO] Instalando dependencias y construyendo..."
cd "$PROJECT_ROOT/backend"
npm ci --omit=dev

cd "$PROJECT_ROOT/frontend"
npm ci
npm run build

echo "[INFO] Reiniciando servicio..."
sudo systemctl restart millonario

echo "[INFO] Actualización completada."
