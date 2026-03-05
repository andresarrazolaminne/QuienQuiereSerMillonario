export default function WaitingScreenSelector({ pantallas, emit, pantallaEsperaId }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <button
        onClick={() => emit('set_mode', 'espera')}
        style={{ background: 'var(--blue-light)', color: 'var(--white)' }}
      >
        Ir a pantalla de espera
      </button>
      {pantallas.length === 0 ? (
        <div style={{ fontSize: '0.9rem', color: 'var(--gray)' }}>Sin pantallas. Crea en Admin.</div>
      ) : (
        pantallas.map(p => {
          const isSelected = pantallaEsperaId != null && String(p.id) === String(pantallaEsperaId);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => emit('set_pantalla_espera', Number(p.id))}
              style={{
                background: isSelected ? 'var(--gold)' : 'var(--blue-light)',
                color: isSelected ? 'var(--blue-dark)' : 'var(--white)',
                padding: '0.5rem',
                textAlign: 'left',
                fontWeight: isSelected ? 600 : 400,
                border: isSelected ? '2px solid var(--gold)' : '2px solid transparent'
              }}
            >
              {p.nombre}
            </button>
          );
        })
      )}
    </div>
  );
}
