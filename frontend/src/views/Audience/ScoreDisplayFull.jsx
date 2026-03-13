export default function ScoreDisplayFull({ puntaje, historial = [], tipografia }) {
  const t = tipografia || {};
  const colorPuntaje = t.colorPuntaje ?? '#ffd700';
  const colorTitulo = t.colorTitulo ?? '#ffd700';
  const colorCorrecto = t.colorCorrecto ?? '#22c55e';
  const colorIncorrecto = t.colorIncorrecto ?? '#ef4444';
  const fontSizePuntaje = t.fontSizePuntaje ?? 1.5;

  const valor = typeof puntaje === 'number' ? puntaje.toLocaleString('es-ES') : '0';
  const correctas = historial.filter(h => h.correcto).length;
  const total = historial.length;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 'clamp(1rem, 3vw, 2rem)',
      boxSizing: 'border-box',
      zIndex: 30,
      overflow: 'auto'
    }}>
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 215, 0, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: 900,
        zIndex: 1,
        animation: 'fadeIn 0.6s ease'
      }}>
        {/* Puntaje principal */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: colorTitulo,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            textShadow: `0 0 20px ${colorTitulo}50`
          }}>
            Puntaje final
          </div>
          <div style={{
            fontSize: `clamp(${fontSizePuntaje * 2.5}rem, 15vw, ${fontSizePuntaje * 6}rem)`,
            fontWeight: 900,
            color: colorPuntaje,
            lineHeight: 1,
            textShadow: `
              0 0 40px ${colorPuntaje}66,
              0 0 80px ${colorPuntaje}33,
              0 4px 20px rgba(0, 0, 0, 0.5)
            `,
            fontVariantNumeric: 'tabular-nums'
          }}>
            {valor}
          </div>
          <div style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
            color: 'var(--gray)',
            fontWeight: 500
          }}>
            puntos
          </div>
        </div>

        {/* Resumen de preguntas */}
        {historial.length > 0 && (
          <div style={{
            background: 'rgba(26, 45, 74, 0.7)',
            borderRadius: 16,
            border: '2px solid rgba(255, 215, 0, 0.2)',
            padding: 'clamp(1rem, 2vw, 1.5rem)',
            marginBottom: '1.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255, 215, 0, 0.2)'
            }}>
              <h3 style={{
                margin: 0,
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: colorTitulo,
                fontWeight: 700
              }}>
                Resumen de respuestas
              </h3>
              <span style={{
                fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                color: 'var(--white)',
                fontWeight: 600
              }}>
                {correctas} / {total} correctas
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              maxHeight: '40vh',
              overflowY: 'auto'
            }}>
              {historial.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    background: item.correcto ? `${colorCorrecto}26` : `${colorIncorrecto}26`,
                    borderRadius: 10,
                    borderLeft: `4px solid ${item.correcto ? colorCorrecto : colorIncorrecto}`
                  }}
                >
                  <span style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: item.correcto ? colorCorrecto : colorIncorrecto,
                    color: 'var(--white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {item.correcto ? '✓' : '✗'}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
                      color: 'var(--white)',
                      lineHeight: 1.4
                    }}>
                      {item.texto?.slice(0, 120)}{item.texto?.length > 120 ? '...' : ''}
                    </div>
                    <div style={{
                      marginTop: '0.25rem',
                      fontSize: '0.8rem',
                      color: 'var(--gray)'
                    }}>
                      {item.correcto ? `+${item.valor ?? 100} pts` : 'Incorrecta'} · Nivel {item.nivel ?? 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mensaje de cierre */}
        <div style={{
          textAlign: 'center',
          padding: '1rem 2rem',
          background: 'rgba(255, 215, 0, 0.1)',
          borderRadius: 12,
          border: '2px solid rgba(255, 215, 0, 0.3)',
          display: 'inline-block',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <span style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: colorTitulo,
            fontWeight: 600
          }}>
            ¡Gracias por jugar!
          </span>
        </div>
      </div>
    </div>
  );
}
