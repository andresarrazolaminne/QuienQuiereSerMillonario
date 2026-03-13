import express from 'express';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import preguntasRoutes from './routes/preguntas.js';
import pantallasRoutes from './routes/pantallasEspera.js';
import rondasRoutes from './routes/rondas.js';
import authRoutes from './routes/auth.js';
import configRoutes from './routes/config.js';
import { setupSocket } from './socket/index.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(compression());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/config', configRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/pantallas-espera', pantallasRoutes);
app.use('/api/rondas', rondasRoutes);

setupSocket(io);

// En producción, servir el frontend desde Node (como tus otros proyectos)
const isProd = process.env.NODE_ENV === 'production';
const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
if (isProd && fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
