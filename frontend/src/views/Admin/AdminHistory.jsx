import { useEffect, useState } from 'react';
import { rondasApi } from '../../services/api';

export default function AdminHistory() {
  const [rondas, setRondas] = useState([]);

  useEffect(() => {
    rondasApi.getAll().then(setRondas).catch(console.error);
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Historial de rondas</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {rondas.map(r => (
          <div
            key={r.id}
            style={{
              padding: '1rem',
              background: 'var(--blue-mid)',
              borderRadius: 8,
              border: '1px solid var(--blue-light)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong>Ronda #{r.id}</strong>
              <span style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
                {new Date(r.fecha).toLocaleString()}
              </span>
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              Resultado: {r.resultado_final || '—'}
            </div>
            {r.preguntas_usadas?.length > 0 && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--gray)' }}>
                Preguntas: {r.preguntas_usadas.length}
              </div>
            )}
          </div>
        ))}
        {rondas.length === 0 && (
          <div style={{ color: 'var(--gray)', padding: '1rem' }}>No hay rondas registradas.</div>
        )}
      </div>
    </div>
  );
}
