export default function QuestionDisplay({ pregunta, opcionesEliminadas, ayudasUsadas }) {
  const opciones = [
    { key: 'A', text: pregunta?.opcionA },
    { key: 'B', text: pregunta?.opcionB },
    { key: 'C', text: pregunta?.opcionC },
    { key: 'D', text: pregunta?.opcionD }
  ].map(o => ({ ...o, eliminada: opcionesEliminadas?.includes(o.key) }));

  return (
    <div style={{
      width: '100%',
      maxWidth: 1000,
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(1rem, 3vw, 2rem)',
      boxSizing: 'border-box'
    }}>
      <div style={{
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(26, 45, 74, 0.6)',
        borderRadius: 16,
        border: '2px solid rgba(255, 215, 0, 0.25)',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,215,0,0.1)'
      }}>
        <div style={{
          flex: '2 1 0',
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 0'
        }}>
          <h2 style={{
          margin: 0,
          fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
          lineHeight: 1.3,
          color: 'var(--white)',
          textAlign: 'center',
          fontWeight: 600
        }}>
            {pregunta?.texto}
          </h2>
        </div>

        <div style={{
          flex: '1 1 0',
          display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(0.5rem, 2vw, 1rem)',
        padding: '0.5rem 0',
        minHeight: 0
        }}>
          {opciones.map(({ key, text, eliminada }, i) => (
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 'clamp(0.5rem, 1.5vw, 1rem)',
              padding: 'clamp(0.5rem, 1.5vw, 1rem) clamp(0.75rem, 2vw, 1.25rem)',
              background: eliminada ? 'rgba(45, 74, 111, 0.3)' : 'var(--blue-light)',
              borderRadius: 'clamp(6px, 1vw, 12px)',
              border: eliminada ? '2px solid transparent' : '2px solid rgba(255,215,0,0.3)',
              opacity: eliminada ? 0.4 : 1,
              animation: eliminada ? 'none' : `slideUp 0.4s ease ${i * 0.05}s both`,
              minHeight: 0,
              overflow: 'hidden'
            }}
          >
            <span style={{
              flexShrink: 0,
              width: 'clamp(32px, 4vw, 48px)',
              height: 'clamp(32px, 4vw, 48px)',
              borderRadius: '50%',
              background: eliminada ? 'var(--gray)' : 'var(--gold)',
              color: eliminada ? 'var(--blue-dark)' : 'var(--blue-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2vw, 1.2rem)'
            }}>
              {key}
            </span>
            <span style={{
              fontSize: 'clamp(0.85rem, 2vw, 1.15rem)',
              lineHeight: 1.3,
              color: 'var(--white)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical'
            }}>
              {text}
            </span>
          </div>
          ))}
        </div>

        <div style={{
          marginTop: '0.75rem',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
          {!ayudasUsadas?.fiftyFifty && <span style={{ padding: '0.25rem 0.5rem', background: 'var(--blue-light)', borderRadius: 4, fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>50:50</span>}
          {!ayudasUsadas?.llamada && <span style={{ padding: '0.25rem 0.5rem', background: 'var(--blue-light)', borderRadius: 4, fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>Llamada</span>}
          {!ayudasUsadas?.publico && <span style={{ padding: '0.25rem 0.5rem', background: 'var(--blue-light)', borderRadius: 4, fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}>Público</span>}
        </div>
      </div>
    </div>
  );
}
