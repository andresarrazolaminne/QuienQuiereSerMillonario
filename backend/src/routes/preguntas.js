import { Router } from 'express';
import * as preguntasModel from '../models/preguntas.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const preguntas = preguntasModel.getAllPreguntas();
    res.json(preguntas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const pregunta = preguntasModel.getPreguntaById(req.params.id);
    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { texto, opcionA, opcionB, opcionC, opcionD, correcta, nivel, valor } = req.body;
    if (!texto || !opcionA || !opcionB || !opcionC || !opcionD || !correcta) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    const pregunta = preguntasModel.createPregunta({
      texto, opcionA, opcionB, opcionC, opcionD, correcta, nivel, valor
    });
    res.status(201).json(pregunta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const { texto, opcionA, opcionB, opcionC, opcionD, correcta, nivel, valor } = req.body;
    const existing = preguntasModel.getPreguntaById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Pregunta no encontrada' });
    const pregunta = preguntasModel.updatePregunta(req.params.id, {
      texto, opcionA, opcionB, opcionC, opcionD, correcta, nivel, valor
    });
    res.json(pregunta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const existing = preguntasModel.getPreguntaById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Pregunta no encontrada' });
    preguntasModel.deletePregunta(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/import-csv', (req, res) => {
  try {
    const { rows } = req.body;
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de filas' });
    }
    const created = [];
    for (const row of rows) {
      const { texto, opcionA, opcionB, opcionC, opcionD, correcta, nivel, valor } = row;
      if (texto && opcionA && opcionB && opcionC && opcionD && correcta) {
        const p = preguntasModel.createPregunta({
          texto, opcionA, opcionB, opcionC, opcionD,
          correcta: String(correcta).toUpperCase().charAt(0),
          nivel: parseInt(nivel) || 1,
          valor: parseInt(valor) || 100
        });
        created.push(p);
      }
    }
    res.status(201).json({ imported: created.length, preguntas: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
