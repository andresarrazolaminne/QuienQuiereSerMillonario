import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../hooks/useSocket';

export default function VotacionView() {
  const { connected, gameState, emit } = useSocket();
  const [voted, setVoted] = useState(false);
  const prevAbierta = useRef(false);

  useEffect(() => {
    const abierta = gameState?.votacionAbierta;
    if (abierta && !prevAbierta.current) {
      setVoted(false);
    }
    prevAbierta.current = !!abierta;
  }, [gameState?.votacionAbierta, gameState?.preguntaIndex]);

  const pregunta = gameState?.preguntaActual;
  const votacionAbierta = gameState?.votacionAbierta;
  const ayudasUsadas = gameState?.ayudasUsadas || {};
  const opcionesEliminadas = gameState?.opcionesEliminadas || [];

  const opciones = ['A', 'B', 'C', 'D']
    .filter(k => !opcionesEliminadas.includes(k))
    .map(k => ({
      key: k,
      text: pregunta?.['opcion' + k]
    }));

  const handleVotar = (opcion) => {
    if (!votacionAbierta || voted) return;
    setVoted(true);
    emit('votar_publico', String(opcion));
  };

  if (!pregunta) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        background: 'var(--blue-dark)',
        color: 'var(--gray)'
      }}>
        <h2>Esperando pregunta...</h2>
        <p>El presentador activará la ayuda del público cuando haya una pregunta en juego.</p>
      </div>
    );
  }

  if (!ayudasUsadas.publico || !votacionAbierta) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        background: 'var(--blue-dark)',
        color: 'var(--gray)'
      }}>
        <h2>Votación cerrada</h2>
        <p>El presentador aún no ha activado la ayuda del público.</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'linear-gradient(180deg, #0a1628 0%, #1a2d4a 100%)'
    }}>
      {!connected && (
        <div style={{
          position: 'fixed',
          top: 10,
          right: 10,
          background: 'var(--red)',
          padding: '0.5rem 1rem',
          borderRadius: 8,
          zIndex: 100
        }}>
          Desconectado
        </div>
      )}

      <h1 style={{ marginBottom: '1rem', color: 'var(--gold)', textAlign: 'center' }}>
        ¡Vota tu respuesta!
      </h1>
      <p style={{ marginBottom: '1.5rem', color: 'var(--white)', textAlign: 'center', maxWidth: 600 }}>
        {pregunta.texto}
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        maxWidth: 500
      }}>
        {opciones.map(({ key, text }) => (
          <button
            key={key}
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleVotar(key); }}
            disabled={voted}
            style={{
              padding: '1.5rem',
              background: 'var(--blue-light)',
              color: 'var(--white)',
              border: '3px solid var(--gold)',
              borderRadius: 12,
              fontSize: '1.1rem',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              cursor: voted ? 'not-allowed' : 'pointer'
            }}
          >
            <span style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'var(--gold)',
              color: 'var(--blue-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.2rem'
            }}>
              {key}
            </span>
            {text}
          </button>
        ))}
      </div>
      {voted && (
        <p style={{ marginTop: '1.5rem', color: 'var(--green)' }}>¡Gracias por votar!</p>
      )}
    </div>
  );
}
