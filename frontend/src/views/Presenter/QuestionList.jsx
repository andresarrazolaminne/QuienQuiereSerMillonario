export default function QuestionList({ preguntas, gameState, onSelect, onCargar }) {
  const idx = gameState?.preguntaIndex ?? -1;
  const usadas = gameState?.preguntasUsadas ?? [];

  return (
    <div>
      <button
        onClick={onCargar}
        disabled={!preguntas.length}
        style={{
          background: 'var(--gold)',
          color: 'var(--blue-dark)',
          marginBottom: '0.75rem',
          fontWeight: 600
        }}
      >
        Cargar preguntas en juego
      </button>
      <div style={{ maxHeight: 280, overflowY: 'auto', border: '1px solid var(--blue-light)', borderRadius: 8 }}>
        {preguntas.length === 0 ? (
          <div style={{ padding: '1rem', color: 'var(--gray)' }}>No hay preguntas. Añádelas en Admin.</div>
        ) : (
          preguntas.map((p, i) => {
            const isUsada = usadas.includes(i);
            return (
              <button
                key={p.id}
                onClick={() => !isUsada && onSelect(i)}
                disabled={isUsada}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.6rem 0.75rem',
                  textAlign: 'left',
                  background: idx === i ? 'rgba(255,215,0,0.2)' : isUsada ? 'rgba(107,114,128,0.2)' : 'transparent',
                  borderBottom: '1px solid var(--blue-light)',
                  borderRadius: 0,
                  color: idx === i ? 'var(--gold)' : isUsada ? 'var(--gray)' : 'var(--white)'
                }}
              >
              <span style={{ marginRight: '0.5rem', color: 'var(--gray)' }}>{i + 1}.</span>
              {p.texto?.slice(0, 45)}{p.texto?.length > 45 ? '...' : ''}
              <span style={{ marginLeft: '0.5rem', color: 'var(--gold)', fontSize: '0.85rem' }}>
                ({p.valor ?? 100 * (p.nivel ?? 1)} pts)
              </span>
                {isUsada && <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', opacity: 0.8 }}>(usada)</span>}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
