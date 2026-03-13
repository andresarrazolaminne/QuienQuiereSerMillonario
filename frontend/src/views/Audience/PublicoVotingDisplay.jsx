export default function PublicoVotingDisplay({ pregunta, opcionesEliminadas, publicoVotos, tipografia }) {
  const t = tipografia || {};
  const colorPregunta = t.colorPregunta ?? '#ffffff';
  const colorRespuesta = t.colorRespuesta ?? '#ffffff';
  const colorTitulo = t.colorTitulo ?? '#ffd700';
  const opciones = [
    { key: 'A', text: pregunta?.opcionA },
    { key: 'B', text: pregunta?.opcionB },
    { key: 'C', text: pregunta?.opcionC },
    { key: 'D', text: pregunta?.opcionD }
  ].map(o => ({ ...o, eliminada: opcionesEliminadas?.includes(o.key) }));

  const total = (publicoVotos?.A || 0) + (publicoVotos?.B || 0) + (publicoVotos?.C || 0) + (publicoVotos?.D || 0);
  const maxPct = total > 0 ? Math.max(
    ((publicoVotos?.A || 0) / total) * 100,
    ((publicoVotos?.B || 0) / total) * 100,
    ((publicoVotos?.C || 0) / total) * 100,
    ((publicoVotos?.D || 0) / total) * 100
  ) : 0;

  return (
    <div style={{
      width: '100%',
      maxWidth: 1100,
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(1rem, 3vw, 2rem)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        flex: '2 1 0',
        minHeight: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 0',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
          color: colorTitulo,
          fontWeight: 600,
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Votación del público en vivo
        </div>
        <h2 style={{
          margin: 0,
          fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
          lineHeight: 1.35,
          color: colorPregunta,
          fontWeight: 600,
          maxWidth: 900
        }}>
          {pregunta?.texto}
        </h2>
      </div>

      <div style={{
        flex: '1 1 0',
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(0.4rem, 1vw, 0.75rem)',
        padding: '0.25rem 0',
        alignContent: 'start'
      }}>
        {opciones.map(({ key, text, eliminada }) => {
          const votos = publicoVotos?.[key] || 0;
          const pct = total > 0 ? Math.round((votos / total) * 100) : 0;
          const barWidth = maxPct > 0 ? (pct / maxPct) * 100 : 0;

          return (
            <div
              key={key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                padding: 'clamp(0.35rem, 0.8vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)',
                background: eliminada ? 'rgba(45, 74, 111, 0.25)' : 'var(--blue-mid)',
                borderRadius: 'clamp(6px, 1vw, 8px)',
                border: eliminada ? '1px solid rgba(107,114,128,0.3)' : '1px solid rgba(255,215,0,0.4)',
                opacity: eliminada ? 0.5 : 1
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.35rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  minWidth: 0,
                  flex: 1
                }}>
                  <span style={{
                    flexShrink: 0,
                    width: 'clamp(22px, 2.5vw, 28px)',
                    height: 'clamp(22px, 2.5vw, 28px)',
                    borderRadius: '50%',
                    background: eliminada ? 'var(--gray)' : 'var(--gold)',
                    color: 'var(--blue-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)'
                  }}>
                    {key}
                  </span>
                  <span style={{
                    fontSize: 'clamp(0.7rem, 1.4vw, 0.85rem)',
                    lineHeight: 1.25,
                    color: colorRespuesta,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {text}
                  </span>
                </div>
                <span style={{
                  flexShrink: 0,
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  fontWeight: 800,
                  color: 'var(--gold)',
                  minWidth: '2.5ch'
                }}>
                  {pct}%
                </span>
              </div>
              <div style={{
                height: 'clamp(4px, 0.8vw, 6px)',
                background: 'var(--blue-dark)',
                borderRadius: 4,
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.max(barWidth, total > 0 ? 2 : 0)}%`,
                    background: 'linear-gradient(90deg, var(--gold) 0%, #daa520 100%)',
                    borderRadius: 6,
                    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </div>
              {total > 0 && (
                <div style={{
                  fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
                  color: 'var(--gray)'
                }}>
                  {votos} {votos === 1 ? 'voto' : 'votos'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        flex: '0 0 auto',
        marginTop: '0.35rem',
        textAlign: 'center',
        fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
        color: 'var(--gray)'
      }}>
        {total > 0 ? (
          <>Total: {total} {total === 1 ? 'voto' : 'votos'}</>
        ) : (
          <>Esperando votos...</>
        )}
      </div>
    </div>
  );
}
