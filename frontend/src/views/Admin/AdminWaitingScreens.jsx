import { useEffect, useState } from 'react';
import { pantallasApi } from '../../services/api';

export default function AdminWaitingScreens() {
  const [pantallas, setPantallas] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ nombre: '', tipo: 'imagen', url: '', orden: 0, duracion: 0 });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const load = () => pantallasApi.getAll().then(setPantallas).catch(console.error);

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const fd = new FormData();
      fd.append('nombre', form.nombre);
      fd.append('tipo', form.tipo);
      fd.append('orden', form.orden);
      fd.append('duracion', form.duracion);
      if (file) fd.append('file', file);
      else if (form.url) fd.append('url', form.url);

      if (editing) {
        await pantallasApi.update(editing.id, fd);
      } else {
        await pantallasApi.create(fd);
      }
      setEditing(null);
      setForm({ nombre: '', tipo: 'imagen', url: '', orden: 0, duracion: 0 });
      setFile(null);
      load();
    } catch (err) {
      setError(err.message || 'Error');
    }
  };

  const handleEdit = (p) => {
    setEditing(p);
    setForm({ nombre: p.nombre, tipo: p.tipo, url: p.url, orden: p.orden, duracion: p.duracion });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar esta pantalla?')) return;
    try {
      await pantallasApi.delete(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Pantallas de espera</h2>

      <form onSubmit={handleSubmit} style={{
        background: 'var(--blue-mid)',
        padding: '1.5rem',
        borderRadius: 8,
        marginBottom: '1.5rem',
        maxWidth: 500
      }}>
        {error && <div style={{ color: 'var(--red)', marginBottom: '0.5rem' }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Nombre</label>
            <input
              value={form.nombre}
              onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Tipo</label>
            <select
              value={form.tipo}
              onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
              style={{ width: '100%' }}
            >
              <option value="imagen">Imagen</option>
              <option value="video">Video</option>
              <option value="animacion">Animación</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Archivo (o URL si no subes archivo)</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={e => { setFile(e.target.files[0]); setForm(f => ({ ...f, url: '' })); }}
              style={{ marginBottom: '0.5rem' }}
            />
            <input
              placeholder="URL (si no subes archivo)"
              value={form.url}
              onChange={e => { setForm(f => ({ ...f, url: e.target.value })); setFile(null); }}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Orden</label>
              <input
                type="number"
                value={form.orden}
                onChange={e => setForm(f => ({ ...f, orden: parseInt(e.target.value) || 0 }))}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Duración (seg)</label>
              <input
                type="number"
                value={form.duracion}
                onChange={e => setForm(f => ({ ...f, duracion: parseInt(e.target.value) || 0 }))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" style={{ background: 'var(--gold)', color: 'var(--blue-dark)', fontWeight: 600 }}>
              {editing ? 'Guardar' : 'Crear'}
            </button>
            {editing && (
              <button type="button" onClick={() => { setEditing(null); setForm({ nombre: '', tipo: 'imagen', url: '', orden: 0, duracion: 0 }); setFile(null); }} style={{ background: 'var(--gray)' }}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {pantallas.map(p => (
          <div
            key={p.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              background: 'var(--blue-mid)',
              borderRadius: 8,
              border: '1px solid var(--blue-light)'
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{p.nombre}</strong>
              <span style={{ marginLeft: '0.5rem', color: 'var(--gray)', fontSize: '0.9rem' }}>{p.tipo}</span>
            </div>
            <button onClick={() => handleEdit(p)} style={{ background: 'var(--blue-light)' }}>Editar</button>
            <button onClick={() => handleDelete(p.id)} style={{ background: 'var(--red)' }}>Eliminar</button>
          </div>
        ))}
        {pantallas.length === 0 && (
          <div style={{ color: 'var(--gray)', padding: '1rem' }}>No hay pantallas. Crea una arriba.</div>
        )}
      </div>
    </div>
  );
}
