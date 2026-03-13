import { useEffect, useState, useRef } from 'react';
import { preguntasApi } from '../../services/api';

export default function AdminQuestions() {
  const [preguntas, setPreguntas] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    texto: '', opcionA: '', opcionB: '', opcionC: '', opcionD: '', correcta: 'A', nivel: 1, valor: 100
  });
  const [error, setError] = useState('');
  const [importText, setImportText] = useState('');
  const fileRef = useRef(null);

  const load = () => preguntasApi.getAll().then(setPreguntas).catch(console.error);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing) {
        await preguntasApi.update(editing.id, form);
      } else {
        await preguntasApi.create(form);
      }
      setEditing(null);
      setForm({ texto: '', opcionA: '', opcionB: '', opcionC: '', opcionD: '', correcta: 'A', nivel: 1, valor: 100 });
      load();
    } catch (err) {
      setError(err.message || 'Error');
    }
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({
      texto: p.texto, opcionA: p.opcionA, opcionB: p.opcionB, opcionC: p.opcionC, opcionD: p.opcionD,
      correcta: p.correcta, nivel: p.nivel, valor: p.valor ?? 100
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta pregunta?')) return;
    try {
      await preguntasApi.delete(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const parseCsv = (text) => {
    const lines = text.trim().split(/\r?\n/);
    const rows = [];
    for (const line of lines) {
      const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      if (parts.length >= 7) {
        rows.push({
          texto: parts[0],
          opcionA: parts[1],
          opcionB: parts[2],
          opcionC: parts[3],
          opcionD: parts[4],
          correcta: parts[5].toUpperCase().charAt(0),
          nivel: parseInt(parts[6]) || 1,
          valor: parseInt(parts[7]) || 100
        });
      }
    }
    return rows;
  };

  const handleImportCsv = async () => {
    setError('');
    const rows = parseCsv(importText);
      if (rows.length === 0) {
      setError('No se encontraron filas válidas. Formato: texto,opcionA,opcionB,opcionC,opcionD,correcta,nivel,valor');
      return;
    }
    try {
      await preguntasApi.importCsv(rows);
      setImportText('');
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFileImport = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setImportText(r.result);
    };
    r.readAsText(f);
    e.target.value = '';
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Preguntas</h2>

      <section style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>Importar CSV</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
          Formato: texto,opcionA,opcionB,opcionC,opcionD,correcta,nivel,valor
        </p>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.txt"
          onChange={handleFileImport}
          style={{ display: 'none' }}
        />
        <button type="button" onClick={() => fileRef.current?.click()} className="btn-game btn-blue" style={{ marginBottom: '0.5rem' }}>
          Seleccionar archivo CSV
        </button>
        <textarea
          value={importText}
          onChange={e => setImportText(e.target.value)}
          placeholder="O pega aquí el contenido CSV..."
          rows={4}
          style={{ width: '100%', maxWidth: 600, display: 'block', marginBottom: '0.5rem' }}
        />
        <button type="button" onClick={handleImportCsv} disabled={!importText.trim()} className="btn-game btn-gold">
          Importar
        </button>
      </section>

      <form onSubmit={handleSubmit} style={{
        background: 'var(--blue-mid)',
        padding: '1.5rem',
        borderRadius: 8,
        marginBottom: '1.5rem',
        maxWidth: 600
      }}>
        {error && <div style={{ color: 'var(--red)', marginBottom: '0.5rem' }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Pregunta</label>
            <textarea
              value={form.texto}
              onChange={e => setForm(f => ({ ...f, texto: e.target.value }))}
              required
              rows={2}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {['A', 'B', 'C', 'D'].map(k => {
              const esCorrecta = form.correcta === k;
              return (
                <div key={k}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.25rem',
                    fontSize: '0.9rem'
                  }}>
                    Opción {k}
                    {esCorrecta && (
                      <span style={{
                        fontSize: '0.75rem',
                        background: 'var(--green)',
                        color: 'var(--white)',
                        padding: '0.1rem 0.4rem',
                        borderRadius: 4,
                        fontWeight: 600
                      }}>
                        ✓ Correcta
                      </span>
                    )}
                  </label>
                  <input
                    value={form['opcion' + k]}
                    onChange={e => setForm(f => ({ ...f, ['opcion' + k]: e.target.value }))}
                    required
                    style={{
                      width: '100%',
                      borderColor: esCorrecta ? 'var(--green)' : undefined,
                      borderWidth: esCorrecta ? 2 : 1,
                      boxShadow: esCorrecta ? '0 0 0 1px var(--green)' : undefined
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Correcta</label>
              <select
                value={form.correcta}
                onChange={e => setForm(f => ({ ...f, correcta: e.target.value }))}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Nivel</label>
              <input
                type="number"
                min={1}
                value={form.nivel}
                onChange={e => setForm(f => ({ ...f, nivel: parseInt(e.target.value) || 1 }))}
                style={{ width: 80 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Valor (pts)</label>
              <input
                type="number"
                min={1}
                value={form.valor}
                onChange={e => setForm(f => ({ ...f, valor: parseInt(e.target.value) || 100 }))}
                style={{ width: 80 }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn-game btn-gold">
              {editing ? 'Guardar' : 'Crear'}
            </button>
            {editing && (
              <button type="button" onClick={() => { setEditing(null); setForm({ texto: '', opcionA: '', opcionB: '', opcionC: '', opcionD: '', correcta: 'A', nivel: 1, valor: 100 }); }} className="btn-game btn-gray">
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {preguntas.map(p => (
          <div
            key={p.id}
            style={{
              padding: '0.75rem 1rem',
              background: 'var(--blue-mid)',
              borderRadius: 8,
              border: '1px solid var(--blue-light)'
            }}
          >
            <div style={{ marginBottom: '0.25rem' }}><strong>{p.texto?.slice(0, 80)}{p.texto?.length > 80 ? '...' : ''}</strong></div>
            <div style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>
              {['A', 'B', 'C', 'D'].map(k => {
                const esCorrecta = String(p.correcta).toUpperCase().charAt(0) === k;
                const texto = p['opcion' + k];
                return (
                  <span key={k}>
                    <span style={{
                      color: esCorrecta ? 'var(--green)' : 'inherit',
                      fontWeight: esCorrecta ? 700 : 400,
                      background: esCorrecta ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                      padding: esCorrecta ? '0.1rem 0.3rem' : 0,
                      borderRadius: 4
                    }}>
                      {k}: {texto}
                    </span>
                    {k !== 'D' && ' | '}
                  </span>
                );
              })}
              {' | '}
              <span style={{ color: 'var(--gold)' }}>Correcta: {p.correcta}</span>
              {' | Nivel: '}{p.nivel}{' | Valor: '}{p.valor ?? 100} pts
            </div>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={() => handleEdit(p)} className="btn-game btn-blue">Editar</button>
              <button type="button" onClick={() => handleDelete(p.id)} className="btn-game btn-red">Eliminar</button>
            </div>
          </div>
        ))}
        {preguntas.length === 0 && (
          <div style={{ color: 'var(--gray)', padding: '1rem' }}>No hay preguntas. Crea una o importa CSV.</div>
        )}
      </div>
    </div>
  );
}
