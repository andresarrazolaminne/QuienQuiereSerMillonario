import db from '../db.js';

export function getAllPantallasEspera() {
  return db.prepare('SELECT * FROM pantallas_espera ORDER BY orden, id').all();
}

export function getPantallaEsperaById(id) {
  return db.prepare('SELECT * FROM pantallas_espera WHERE id = ?').get(id);
}

export function createPantallaEspera(data) {
  const stmt = db.prepare(`
    INSERT INTO pantallas_espera (nombre, tipo, url, orden, duracion)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    data.nombre,
    data.tipo,
    data.url,
    data.orden ?? 0,
    data.duracion ?? 0
  );
  return getPantallaEsperaById(result.lastInsertRowid);
}

export function updatePantallaEspera(id, data) {
  const stmt = db.prepare(`
    UPDATE pantallas_espera SET
      nombre = ?, tipo = ?, url = ?, orden = ?, duracion = ?
    WHERE id = ?
  `);
  stmt.run(
    data.nombre,
    data.tipo,
    data.url,
    data.orden ?? 0,
    data.duracion ?? 0,
    id
  );
  return getPantallaEsperaById(id);
}

export function deletePantallaEspera(id) {
  return db.prepare('DELETE FROM pantallas_espera WHERE id = ?').run(id);
}
