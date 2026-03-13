# Quién Quiere Ser Millonario - Versión Online

Juego online tipo "Who Wants to Be a Millionaire" con sincronización en tiempo real.

## Requisitos

- Node.js 18+

## Instalación

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## Ejecución

1. Iniciar el backend:
```bash
cd backend
npm run dev
```

2. Iniciar el frontend:
```bash
cd frontend
npm run dev
```

3. Abrir http://localhost:5173

## Vistas

- **Público** (`/publico`): Pantalla para el público. Muestra pantallas de espera, preguntas y feedback.
- **Pantalla** (`/pantalla`): Vista de proyección sin menú lateral.
- **Presentador** (`/presentador`): Panel de control del juego.
- **Admin** (`/admin`): Gestión de pantallas de espera, preguntas e historial.

## Configuración

- **Clave de admin**: Por defecto `admin123`. Para cambiarla, define la variable de entorno `ADMIN_KEY` al iniciar el backend.

## Uso

1. En **Admin**: Introducir la clave para acceder al panel.
2. En **Admin > Pantallas de espera**: Crear pantallas con imágenes o videos.
2. En **Admin > Preguntas**: Crear preguntas o importar CSV (formato: texto,opcionA,opcionB,opcionC,opcionD,correcta,nivel).
3. En **Presentador**: Cargar preguntas, seleccionar pantalla de espera, controlar el juego.
4. Abrir **Público** o **Pantalla** en un proyector o segunda pantalla.

## Ayudas

- **50:50**: Elimina 2 opciones incorrectas.
- **Llamada**: Simula llamada a un amigo.
- **Público**: Muestra votación simulada del público.

## Despliegue en servidor

Ver **[DEPLOY.md](DEPLOY.md)** para la guía completa de despliegue en producción (Lightsail/Ubuntu).

Resumen rápido:

```bash
chmod +x scripts/*.sh
./scripts/deploy.sh
sudo ./scripts/install-service.sh
```

Un solo proceso Node por puerto. Si 3001 está ocupado, edita `backend/.env` y cambia `PORT` antes de instalar el servicio.
