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
    </div>
  );
}
