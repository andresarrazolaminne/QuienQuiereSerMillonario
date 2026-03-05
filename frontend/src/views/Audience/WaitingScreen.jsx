export default function WaitingScreen({ pantalla }) {
  const isVideo = pantalla?.tipo === 'video';
  const isImage = pantalla?.tipo === 'imagen' || pantalla?.tipo === 'animacion' || !isVideo;
  const url = pantalla?.url?.startsWith('/') ? pantalla.url : '/uploads/' + (pantalla?.url || '');

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--blue-mid)',
      zIndex: 10
    }}>
      {isVideo ? (
        <video
          src={url}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <img
          src={url}
          alt={pantalla?.nombre}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'var(--gold)',
        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
        fontWeight: 700,
        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
      }}>
        ¿Quién quiere ser millonario?
      </div>
    </div>
  );
}
