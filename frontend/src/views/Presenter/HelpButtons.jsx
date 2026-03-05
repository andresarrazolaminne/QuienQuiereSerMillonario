export default function HelpButtons({ gameState, emit }) {
  const { ayudasUsadas } = gameState || {};

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <button
        onClick={() => emit('activar_fifty_fifty')}
        disabled={ayudasUsadas?.fiftyFifty}
        style={{
          background: ayudasUsadas?.fiftyFifty ? 'var(--gray)' : 'var(--blue-light)',
          color: 'var(--white)',
          padding: '0.6rem 1rem'
        }}
      >
        50:50 {ayudasUsadas?.fiftyFifty && '(usada)'}
      </button>
      <button
        onClick={() => emit('activar_llamada')}
        disabled={ayudasUsadas?.llamada}
        style={{
          background: ayudasUsadas?.llamada ? 'var(--gray)' : 'var(--blue-light)',
          color: 'var(--white)',
          padding: '0.6rem 1rem'
        }}
      >
        Llamada {ayudasUsadas?.llamada && '(usada)'}
      </button>
      <button
        onClick={() => emit('activar_publico')}
        disabled={ayudasUsadas?.publico}
        style={{
          background: ayudasUsadas?.publico ? 'var(--gray)' : 'var(--blue-light)',
          color: 'var(--white)',
          padding: '0.6rem 1rem'
        }}
      >
        Público {ayudasUsadas?.publico && '(usada)'}
      </button>
      {ayudasUsadas?.publico && gameState?.votacionAbierta && (
        <button
          onClick={() => emit('cerrar_votacion')}
          style={{
            background: 'var(--gold)',
            color: 'var(--blue-dark)',
            padding: '0.6rem 1rem',
            fontWeight: 600
          }}
        >
          Cerrar votación
        </button>
      )}
    </div>
  );
}
