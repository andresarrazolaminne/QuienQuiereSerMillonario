import db from '../db.js';

export function getAllPreguntas() {
  return db.prepare('SELECT * FROM preguntas ORDER BY nivel, id').all();
}

export function getPreguntaById(id) {
  return db.prepare('SELECT * FROM preguntas WHERE id = ?').get(id);
}

export function createPregunta(data) {
  const stmt = db.prepare(`
    INSERT INTO preguntas (texto, opcionA, opcionB, opcionC, opcionD, correcta, nivel, valor)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.texto,
    data.opcionA,
    data.opcionB,
    data.opcionC,
    data.opcionD,
    data.correcta,
    data.nivel ?? 1,
    data.valor ?? 100
  );
  return getPreguntaById(result.lastInsertRowid);
}

export function updatePregunta(id, data) {
  const stmt = db.prepare(`
    UPDATE preguntas SET
      texto = ?, opcionA = ?, opcionB = ?, opcionC = ?, opcionD = ?,
      correcta = ?, nivel = ?, valor = ?
    WHERE id = ?
  `);
  stmt.run(
    data.texto,
    data.opcionA,
    data.opcionB,
    data.opcionC,
    data.opcionD,
    data.correcta,
    data.nivel ?? 1,
    data.valor ?? 100,
    id
  );
  return getPreguntaById(id);
}

export function deletePregunta(id) {
  return db.prepare('DELETE FROM preguntas WHERE id = ?').run(id);
}
