import { useEffect, useState } from 'react';
import { configApi } from '../../services/api';
import { getBackgroundStyle } from '../../utils/backgroundStyle';

const VISTAS = [
  { key: 'fondo_publico', label: 'Vista público' },
  { key: 'fondo_presentador', label: 'Vista presentador' },
  { key: 'fondo_espera', label: 'Pantallas de espera' }
];

function FondoForm({ config, onChange, label }) {
  const c = config || { tipo: 'gradiente', color1: '#0a1628', color2: '#1a2d4a', angulo: 180 };
  const [uploading, setUploading] = useState(false);

  return (
    <div style={{
      background: 'var(--blue-mid)',
      padding: '1.25rem',
      borderRadius: 8,
      marginBottom: '1rem',
      border: '1px solid var(--blue-light)'
    }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>{label}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Tipo</label>
          <select
            value={c.tipo || 'gradiente'}
            onChange={e => onChange({ ...c, tipo: e.target.value })}
            style={{ width: '100%', maxWidth: 200 }}
          >
            <option value="color">Color sólido</option>
            <option value="gradiente">Gradiente</option>
            <option value="imagen">Imagen</option>
          </select>
        </div>

        {c.tipo === 'color' && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Color</label>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="color"
                value={c.color || '#0a1628'}
                onChange={e => onChange({ ...c, color: e.target.value })}
                style={{ width: 48, height: 36, padding: 2, cursor: 'pointer' }}
              />
              <input
                type="text"
                value={c.color || '#0a1628'}
                onChange={e => onChange({ ...c, color: e.target.value })}
                style={{ flex: 1, maxWidth: 120 }}
              />
            </div>
          </div>
        )}

        {c.tipo === 'gradiente' && (
          <>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Color 1</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={c.color1 || '#0a1628'}
                  onChange={e => onChange({ ...c, color1: e.target.value })}
                  style={{ width: 48, height: 36, padding: 2, cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={c.color1 || '#0a1628'}
                  onChange={e => onChange({ ...c, color1: e.target.value })}
                  style={{ flex: 1, maxWidth: 120 }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Color 2</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={c.color2 || '#1a2d4a'}
                  onChange={e => onChange({ ...c, color2: e.target.value })}
                  style={{ width: 48, height: 36, padding: 2, cursor: 'pointer' }}
                />
                <input
                  type="text"
                  value={c.color2 || '#1a2d4a'}
                  onChange={e => onChange({ ...c, color2: e.target.value })}
                  style={{ flex: 1, maxWidth: 120 }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Ángulo (grados)</label>
              <input
                type="number"
                min={0}
                max={360}
                value={c.angulo ?? 180}
                onChange={e => onChange({ ...c, angulo: parseInt(e.target.value) || 180 })}
                style={{ width: 80 }}
              />
            </div>
          </>
        )}

        {c.tipo === 'imagen' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Subir imagen (PNG/JPG)</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={async e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setUploading(true);
                  try {
                    const { url } = await configApi.uploadBackground(file);
                    onChange({ ...c, url });
                  } catch (err) {
                    alert(err.message || 'Error al subir');
                  } finally {
                    setUploading(false);
                    e.target.value = '';
                  }
                }}
                disabled={uploading}
                style={{ fontSize: '0.9rem' }}
              />
              {uploading && <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', color: 'var(--gray)' }}>Subiendo...</span>}
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>O URL de la imagen</label>
              <input
                type="text"
                placeholder="https://... o /uploads/..."
                value={c.url || ''}
                onChange={e => onChange({ ...c, url: e.target.value })}
                style={{ width: '100%', maxWidth: 400 }}
              />
            </div>
          </div>
        )}

        <div style={{
          marginTop: '0.5rem',
          padding: '0.75rem',
          borderRadius: 6,
          background: 'var(--blue-dark)',
          minHeight: 60,
          backgroundImage: getBackgroundStyle(c),
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          Vista previa
        </div>
      </div>
    </div>
  );
}

export default function AdminConfig() {
  const [config, setConfig] = useState(null);
  const [local, setLocal] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    configApi.get().then(c => {
      setConfig(c);
      setLocal(c || {});
    }).catch(() => setLocal({}));
  }, []);

  const handleChange = (key, value) => {
    setLocal(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await configApi.update(local);
      setConfig(local);
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Configuración</h2>

      <div style={{
        background: 'var(--blue-mid)',
        padding: '1.25rem',
        borderRadius: 8,
        marginBottom: '1.5rem',
        border: '1px solid var(--blue-light)'
      }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>Título de la aplicación</h3>
        <p style={{ marginBottom: '0.5rem', color: 'var(--gray)', fontSize: '0.9rem' }}>
          Aparece en el menú lateral y en el encabezado.
        </p>
        <input
          type="text"
          value={local.titulo_app ?? 'Millonario'}
          onChange={e => handleChange('titulo_app', e.target.value)}
          placeholder="Millonario"
          style={{ width: '100%', maxWidth: 300 }}
        />
      </div>

      <h3 style={{ marginBottom: '0.75rem' }}>Fondos por vista</h3>
      <p style={{ marginBottom: '1rem', color: 'var(--gray)', fontSize: '0.9rem' }}>
        Personaliza el fondo de cada vista. Los cambios se aplican al guardar.
      </p>

      {VISTAS.map(({ key, label }) => (
        <FondoForm
          key={key}
          label={label}
          config={local[key]}
          onChange={v => handleChange(key, v)}
        />
      ))}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="btn-game btn-gold"
        style={{ padding: '0.75rem 1.5rem' }}
      >
        {saving ? 'Guardando...' : 'Guardar configuración'}
      </button>
      {saved && (
        <span style={{ marginLeft: '1rem', color: 'var(--green)' }}>Guardado</span>
      )}
    </div>
  );
}
