import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import * as pantallasModel from '../models/pantallasEspera.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '.bin';
    cb(null, unique + ext);
  }
});

const upload = multer({ storage });

const router = Router();

router.get('/', (req, res) => {
  try {
    const pantallas = pantallasModel.getAllPantallasEspera();
    res.json(pantallas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const pantalla = pantallasModel.getPantallaEsperaById(req.params.id);
    if (!pantalla) return res.status(404).json({ error: 'Pantalla no encontrada' });
    res.json(pantalla);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', upload.single('file'), (req, res) => {
  try {
    const { nombre, tipo, orden, duracion } = req.body;
    if (!nombre || !tipo) {
      return res.status(400).json({ error: 'Faltan nombre y tipo' });
    }
    let url = '';
    if (req.file) {
      url = '/uploads/' + req.file.filename;
    } else if (req.body.url) {
      url = req.body.url;
    } else {
      return res.status(400).json({ error: 'Se requiere archivo o URL' });
    }
    const pantalla = pantallasModel.createPantallaEspera({
      nombre, tipo, url, orden: parseInt(orden) || 0, duracion: parseInt(duracion) || 0
    });
    res.status(201).json(pantalla);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', upload.single('file'), (req, res) => {
  try {
    const existing = pantallasModel.getPantallaEsperaById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Pantalla no encontrada' });

    const { nombre, tipo, orden, duracion } = req.body;
    let url = existing.url;
    if (req.file) {
      url = '/uploads/' + req.file.filename;
    } else if (req.body.url) {
      url = req.body.url;
    }

    const pantalla = pantallasModel.updatePantallaEspera(req.params.id, {
      nombre: nombre ?? existing.nombre,
      tipo: tipo ?? existing.tipo,
      url,
      orden: orden !== undefined ? parseInt(orden) : existing.orden,
      duracion: duracion !== undefined ? parseInt(duracion) : existing.duracion
    });
    res.json(pantalla);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const existing = pantallasModel.getPantallaEsperaById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Pantalla no encontrada' });
    pantallasModel.deletePantallaEspera(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
