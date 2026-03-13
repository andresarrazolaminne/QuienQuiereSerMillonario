export default function ScoreDisplay({ puntaje, tipografia }) {
  const t = tipografia || {};
  const colorPuntaje = t.colorPuntaje ?? '#ffd700';
  const fontSizePuntaje = t.fontSizePuntaje ?? 1.5;

  return (
    <div style={{
      position: 'fixed',
      top: 'clamp(1rem, 2vw, 1.5rem)',
      right: 'clamp(1rem, 2vw, 1.5rem)',
      zIndex: 40,
      display: 'flex',
      alignItems: 'stretch',
      gap: 0,
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: `
        0 8px 32px rgba(0,0,0,0.4),
        0 0 0 2px rgba(255, 215, 0, 0.2),
        inset 0 1px 0 rgba(255,255,255,0.08)
      `,
      animation: 'fadeIn 0.4s ease'
    }}>
      <div style={{
        padding: '0.5rem 1rem',
        background: 'linear-gradient(135deg, rgba(26, 45, 74, 0.95) 0%, rgba(15, 30, 50, 0.98) 100%)',
        borderRight: '1px solid rgba(255, 215, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.7)'
      }}>
        Puntaje
      </div>
      <div style={{
        padding: '0.5rem 1.25rem',
        background: `linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)`,
        borderLeft: '1px solid rgba(255, 215, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '4.5ch'
      }}>
        <span style={{
          fontSize: `clamp(${fontSizePuntaje * 0.9}rem, ${fontSizePuntaje * 4}vw, ${fontSizePuntaje * 1.5}rem)`,
          fontWeight: 800,
          color: colorPuntaje,
          textShadow: `0 0 20px ${colorPuntaje}40, 0 2px 8px rgba(0,0,0,0.3)`,
          fontVariantNumeric: 'tabular-nums'
        }}>
          {typeof puntaje === 'number' ? puntaje.toLocaleString() : '0'}
        </span>
      </div>
    </div>
  );
}
