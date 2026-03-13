export default function FeedbackMessage({ feedback, pregunta, tipografia }) {
  const t = tipografia || {};
  const colorCorrecto = t.colorCorrecto ?? '#22c55e';
  const colorIncorrecto = t.colorIncorrecto ?? '#ef4444';

  const isCorrect = feedback === 'correcto';
  const correcta = pregunta?.correcta ? String(pregunta.correcta).toUpperCase().charAt(0) : null;
  const textoCorrecta = correcta && pregunta ? pregunta['opcion' + correcta] : null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      background: isCorrect ? `${colorCorrecto}f2` : `${colorIncorrecto}f2`,
      zIndex: 50,
      animation: 'fadeIn 0.4s ease'
    }}>
      <div style={{
        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        fontWeight: 800,
        color: 'white',
        textShadow: '0 4px 20px rgba(0,0,0,0.4)',
        textAlign: 'center',
        animation: 'pulse 1.5s ease-in-out infinite'
      }}>
        {isCorrect ? '¡Correcto!' : 'Incorrecto'}
      </div>
      {!isCorrect && textoCorrecta && (
        <div style={{
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          fontWeight: 600,
          color: 'white',
          textShadow: '0 2px 10px rgba(0,0,0,0.4)',
          textAlign: 'center',
          maxWidth: '90%',
          padding: '0 1rem'
        }}>
          La respuesta correcta era: {correcta}) {textoCorrecta}
        </div>
      )}
    </div>
  );
}
