export default function ScoreDisplayFull({ puntaje }) {
  const valor = typeof puntaje === 'number' ? puntaje.toLocaleString('es-ES') : '0';

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      boxSizing: 'border-box',
      zIndex: 30
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        textAlign: 'center',
        zIndex: 1,
        animation: 'fadeIn 0.6s ease'
      }}>
        <div style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'var(--gold)',
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          textShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
        }}>
          Puntaje final
        </div>
        <div style={{
          fontSize: 'clamp(5rem, 20vw, 12rem)',
          fontWeight: 900,
          color: 'var(--gold)',
          lineHeight: 1,
          textShadow: `
            0 0 40px rgba(255, 215, 0, 0.4),
            0 0 80px rgba(255, 215, 0, 0.2),
            0 4px 20px rgba(0, 0, 0, 0.5)
          `,
          marginBottom: '0.5rem',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {valor}
        </div>
        <div style={{
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: 'var(--gray)',
          fontWeight: 500
        }}>
          puntos
        </div>
        <div style={{
          marginTop: '3rem',
          padding: '1rem 2rem',
          background: 'rgba(255, 215, 0, 0.1)',
          borderRadius: 12,
          border: '2px solid rgba(255, 215, 0, 0.3)',
          display: 'inline-block'
        }}>
          <span style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--gold)',
            fontWeight: 600
          }}>
            ¡Gracias por jugar!
          </span>
        </div>
      </div>
    </div>
  );
}
