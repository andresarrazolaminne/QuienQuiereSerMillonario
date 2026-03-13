# Despliegue en producción (Lightsail Ubuntu)

## Requisitos previos

- Ubuntu (Lightsail)
- Node.js 18+ (`node -v`)
- Git
- Puerto libre para la app (ej. 3010 si 3001 está ocupado)

## Pasos

### 1. Clonar en el servidor

```bash
cd /var/www   # o tu directorio de proyectos
sudo mkdir -p millonario
sudo chown $USER:$USER millonario
git clone https://github.com/TU_USUARIO/QuienQuiereSerMillonario.git millonario
cd millonario
```

### 2. Configurar puerto (si 3001 está ocupado)

Edita `backend/.env` después del deploy, o créalo antes:

```bash
# backend/.env
PORT=3010
ADMIN_KEY=tu_clave_segura_aqui
NODE_ENV=production
```

### 3. Ejecutar despliegue

```bash
chmod +x scripts/*.sh
./scripts/deploy.sh
```

### 4. Instalar servicio systemd

```bash
sudo ./scripts/install-service.sh
```

### 5. Configurar Nginx (optimizado para rendimiento)

La config sirve imágenes y frontend directamente desde Nginx (más rápido). Solo API y Socket.io pasan por Node.

```bash
sudo cp scripts/nginx.conf.example /etc/nginx/sites-available/millonario
sudo nano /etc/nginx/sites-available/millonario
# Ajustar: server_name, puerto, rutas (/var/www/millonario si clonaste en otro sitio)
sudo ln -s /etc/nginx/sites-available/millonario /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. DNS y SSL

- Añadir registro A: `millonario.tudominio.com` → IP del servidor
- `sudo certbot --nginx -d millonario.tudominio.com`

## Actualizaciones futuras

```bash
cd /var/www/millonario
./scripts/update.sh
```

## Verificación

- `sudo systemctl status millonario` → activo
- `curl http://localhost:3010` → HTML de la app
- Abrir `https://millonario.tudominio.com` en el navegador
