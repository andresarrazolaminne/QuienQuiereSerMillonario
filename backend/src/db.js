import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, '..', 'data', 'millonario.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS preguntas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    opcionA TEXT NOT NULL,
    opcionB TEXT NOT NULL,
    opcionC TEXT NOT NULL,
    opcionD TEXT NOT NULL,
    correcta TEXT NOT NULL CHECK(correcta IN ('A', 'B', 'C', 'D')),
    nivel INTEGER DEFAULT 1,
    valor INTEGER DEFAULT 100,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pantallas_espera (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK(tipo IN ('imagen', 'video', 'animacion')),
    url TEXT NOT NULL,
    orden INTEGER DEFAULT 0,
    duracion INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS config (
    clave TEXT PRIMARY KEY,
    valor TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS rondas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    resultado_final TEXT,
    preguntas_usadas TEXT,
    historial_acciones TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

try {
  db.exec('ALTER TABLE preguntas ADD COLUMN valor INTEGER DEFAULT 100');
} catch (_) {}

export default db;
