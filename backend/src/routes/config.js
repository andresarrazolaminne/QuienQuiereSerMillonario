import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';
import * as configModel from '../models/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'fondos');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || '.png';
    cb(null, unique + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowed = ['.png', '.jpg', '.jpeg'];
  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PNG o JPG'));
  }
};

const upload = multer({ storage, fileFilter });

const router = Router();

router.get('/', (req, res) => {
  try {
    const config = configModel.getConfig();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/upload-background', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || 'Error al subir' });
    next();
  });
}, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Se requiere un archivo PNG o JPG' });
    }
    const url = '/uploads/fondos/' + req.file.filename;
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', (req, res) => {
  try {
    const { fondo_publico, fondo_presentador, fondo_espera, titulo_app, tipografia } = req.body;
    if (fondo_publico !== undefined) configModel.setConfig('fondo_publico', fondo_publico);
    if (fondo_presentador !== undefined) configModel.setConfig('fondo_presentador', fondo_presentador);
    if (fondo_espera !== undefined) configModel.setConfig('fondo_espera', fondo_espera);
    if (titulo_app !== undefined) configModel.setConfig('titulo_app', String(titulo_app));
    if (tipografia !== undefined) configModel.setConfig('tipografia', tipografia);
    const config = configModel.getConfig();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
