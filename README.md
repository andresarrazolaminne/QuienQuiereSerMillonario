# Quién Quiere Ser Millonario - Versión Online

Juego online tipo "Who Wants to Be a Millionaire" con sincronización en tiempo real vía WebSocket.

**Stack:** React + Vite (frontend) · Express + Socket.io (backend) · SQLite (datos)

---

## Requisitos

- Node.js 18+

## Desarrollo local

```bash
# Instalar dependencias
cd backend && npm install
cd ../frontend && npm install

# Ejecutar (dos terminales)
cd backend && npm run dev    # puerto 3001
cd frontend && npm run dev   # puerto 5173
```

Abrir **http://localhost:5173**

## Vistas

| Ruta | Descripción |
|------|-------------|
| `/publico` | Pantalla para el público (preguntas, feedback, pantallas de espera) |
| `/pantalla` | Proyección fullscreen sin menú |
| `/votacion` | Votación del público (con menú) |
| `/votar` | Votación en pantalla limpia |
| `/presentador` | Panel de control del juego |
| `/admin` | Gestión de preguntas, pantallas de espera e historial |

## Configuración

- **Clave admin:** Por defecto `admin123`. Variable de entorno `ADMIN_KEY`.
- **Puerto backend:** `PORT` (por defecto 3001).

## Uso

1. **Admin** → Introducir clave → Crear pantallas de espera y preguntas (o importar CSV).
2. **Presentador** → Cargar preguntas → Seleccionar pantalla de espera → Controlar el juego.
3. **Público / Pantalla** → Abrir en proyector o segunda pantalla.
4. **Pantalla de cierre** → Botón en Presentador para mostrar puntaje final fullscreen.

Formato CSV preguntas: `texto,opcionA,opcionB,opcionC,opcionD,correcta,nivel,valor`

## Ayudas

- **50:50** — Elimina 2 opciones incorrectas.
- **Llamada** — Simula llamada a un amigo.
- **Público** — Votación simulada del público.

## Despliegue en producción

Ver **[DEPLOY.md](DEPLOY.md)** para la guía completa (Lightsail/Ubuntu).

```bash
chmod +x scripts/*.sh
./scripts/deploy.sh
sudo ./scripts/install-service.sh
```

Un solo proceso Node sirve API + frontend. Si el puerto 3001 está ocupado, edita `backend/.env` antes de instalar el servicio.
