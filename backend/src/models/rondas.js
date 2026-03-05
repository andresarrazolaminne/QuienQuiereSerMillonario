import db from '../db.js';

export function getAllRondas() {
  return db.prepare('SELECT * FROM rondas ORDER BY fecha DESC').all();
}

export function getRondaById(id) {
  return db.prepare('SELECT * FROM rondas WHERE id = ?').get(id);
}

export function createRonda(data) {
  const stmt = db.prepare(`
    INSERT INTO rondas (resultado_final, preguntas_usadas, historial_acciones)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(
    data.resultado_final ?? null,
    JSON.stringify(data.preguntas_usadas ?? []),
    JSON.stringify(data.historial_acciones ?? [])
  );
  return getRondaById(result.lastInsertRowid);
}

export function updateRonda(id, data) {
  const stmt = db.prepare(`
    UPDATE rondas SET
      resultado_final = ?,
      preguntas_usadas = ?,
      historial_acciones = ?
    WHERE id = ?
  `);
  stmt.run(
    data.resultado_final ?? null,
    typeof data.preguntas_usadas === 'string' ? data.preguntas_usadas : JSON.stringify(data.preguntas_usadas ?? []),
    typeof data.historial_acciones === 'string' ? data.historial_acciones : JSON.stringify(data.historial_acciones ?? []),
    id
  );
  return getRondaById(id);
}
