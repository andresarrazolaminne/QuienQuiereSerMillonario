import db from '../db.js';

const DEFAULTS = {
  titulo_app: 'Millonario',
  fondo_publico: JSON.stringify({ tipo: 'gradiente', color1: '#0a1628', color2: '#1a2d4a', angulo: 180 }),
  fondo_presentador: JSON.stringify({ tipo: 'gradiente', color1: '#0a1628', color2: '#1a2d4a', angulo: 180 }),
  fondo_espera: JSON.stringify({ tipo: 'gradiente', color1: '#0a1628', color2: '#1a2d4a', angulo: 180 })
};

function get(clave) {
  const row = db.prepare('SELECT valor FROM config WHERE clave = ?').get(clave);
  if (row) return row.valor;
  return DEFAULTS[clave] ?? null;
}

function set(clave, valor) {
  db.prepare('INSERT INTO config (clave, valor) VALUES (?, ?) ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor')
    .run(clave, typeof valor === 'string' ? valor : JSON.stringify(valor));
  return get(clave);
}

export function getConfig() {
  const result = {};
  const jsonKeys = ['fondo_publico', 'fondo_presentador', 'fondo_espera'];
  const strKeys = ['titulo_app'];
  for (const k of jsonKeys) {
    const v = get(k);
    result[k] = v ? JSON.parse(v) : (DEFAULTS[k] ? JSON.parse(DEFAULTS[k]) : null);
  }
  for (const k of strKeys) {
    const v = get(k);
    result[k] = v ?? DEFAULTS[k] ?? '';
  }
  return result;
}

export function setConfig(clave, valor) {
  set(clave, typeof valor === 'object' ? JSON.stringify(valor) : valor);
  return getConfig();
}
