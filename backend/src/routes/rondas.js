import { Router } from 'express';
import * as rondasModel from '../models/rondas.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const rondas = rondasModel.getAllRondas();
    const parsed = rondas.map(r => ({
      ...r,
      preguntas_usadas: r.preguntas_usadas ? JSON.parse(r.preguntas_usadas) : [],
      historial_acciones: r.historial_acciones ? JSON.parse(r.historial_acciones) : []
    }));
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const ronda = rondasModel.getRondaById(req.params.id);
    if (!ronda) return res.status(404).json({ error: 'Ronda no encontrada' });
    res.json({
      ...ronda,
      preguntas_usadas: ronda.preguntas_usadas ? JSON.parse(ronda.preguntas_usadas) : [],
      historial_acciones: ronda.historial_acciones ? JSON.parse(ronda.historial_acciones) : []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const ronda = rondasModel.createRonda(req.body);
    res.status(201).json(ronda);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const existing = rondasModel.getRondaById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Ronda no encontrada' });
    const ronda = rondasModel.updateRonda(req.params.id, req.body);
    res.json(ronda);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
