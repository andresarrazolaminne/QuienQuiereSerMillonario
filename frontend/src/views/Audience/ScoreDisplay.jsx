export default function ScoreDisplay({ puntaje }) {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      background: 'rgba(0,0,0,0.6)',
      padding: '0.75rem 1.25rem',
      borderRadius: 12,
      border: '2px solid var(--gold)',
      zIndex: 40
    }}>
      <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.25rem' }}>Puntaje</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gold)' }}>
        {typeof puntaje === 'number' ? puntaje.toLocaleString() : '0'}
      </div>
    </div>
  );
}
