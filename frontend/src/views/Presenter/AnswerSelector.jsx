export default function AnswerSelector({ pregunta, opcionesEliminadas, emit }) {
  const correcta = pregunta?.correcta ? String(pregunta.correcta).toUpperCase().charAt(0) : null;
  const opciones = [
    { key: 'A', text: pregunta?.opcionA },
    { key: 'B', text: pregunta?.opcionB },
    { key: 'C', text: pregunta?.opcionC },
    { key: 'D', text: pregunta?.opcionD }
  ].filter(o => !opcionesEliminadas?.includes(o.key));

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {opciones.map(({ key, text }) => {
        const esCorrecta = key === correcta;
        return (
          <button
            key={key}
            onClick={() => emit('marcar_respuesta', key)}
            style={{
              background: esCorrecta ? 'var(--green)' : 'var(--gold)',
              color: esCorrecta ? 'var(--white)' : 'var(--blue-dark)',
              padding: '0.6rem 1.2rem',
              fontWeight: 600,
              minWidth: 80,
              border: esCorrecta ? '3px solid #16a34a' : '2px solid transparent',
              boxShadow: esCorrecta ? '0 0 12px rgba(34, 197, 94, 0.5)' : 'none'
            }}
            title={esCorrecta ? 'Respuesta correcta' : undefined}
          >
            {key}: {text?.slice(0, 20)}{text?.length > 20 ? '...' : ''}
            {esCorrecta && ' ✓'}
          </button>
        );
      })}
    </div>
  );
}
