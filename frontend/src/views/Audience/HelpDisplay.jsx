export default function HelpDisplay({ ayudasUsadas, publicoVotos }) {
  if (!ayudasUsadas?.publico) return null;

  return (
    <div style={{
      marginTop: '1.5rem',
      width: '100%',
      maxWidth: 800,
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {ayudasUsadas?.publico && publicoVotos && (
        <div style={{
          background: 'var(--blue-mid)',
          padding: '1rem 1.5rem',
          borderRadius: 8,
          border: '2px solid var(--gold)',
          minWidth: 280
        }}>
          <div style={{ color: 'var(--gold)', marginBottom: '0.75rem', fontWeight: 600 }}>Votación del público</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['A', 'B', 'C', 'D'].map(k => {
              const total = (publicoVotos.A || 0) + (publicoVotos.B || 0) + (publicoVotos.C || 0) + (publicoVotos.D || 0);
              const pct = total > 0 ? Math.round(((publicoVotos[k] || 0) / total) * 100) : 0;
              return (
                <div key={k} style={{
                  flex: '1 1 60px',
                  textAlign: 'center',
                  padding: '0.5rem',
                  background: 'var(--blue-light)',
                  borderRadius: 6
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)' }}>{pct}%</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{k}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
