import { rondasApi } from '../../services/api';

export default function GameFlowControls({ gameState, emit }) {
  const hasFeedback = gameState?.feedback;
  const canNext = gameState?.preguntas?.length > 0 && (gameState.preguntaIndex ?? 0) < gameState.preguntas.length - 1;

  const guardarRonda = async () => {
    try {
      await rondasApi.create({
        preguntas_usadas: gameState?.preguntas?.map(p => p.id || p.texto) || [],
        resultado_final: gameState?.feedback === 'correcto' ? 'Correcto' : gameState?.feedback === 'incorrecto' ? 'Incorrecto' : 'En curso',
        historial_acciones: []
      });
      emit('reiniciar_juego');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {hasFeedback && (
        <button
          onClick={() => emit('siguiente_pregunta')}
          style={{ background: 'var(--green)', color: 'white' }}
        >
          {canNext ? 'Siguiente pregunta' : 'Finalizar (ir a espera)'}
        </button>
      )}
      {hasFeedback && (
        <button
          onClick={() => emit('limpiar_feedback')}
          style={{ background: 'var(--blue-light)', color: 'var(--white)' }}
        >
          Mantener en pantalla
        </button>
      )}
      {gameState?.preguntas?.length > 0 && (
        <button
          onClick={guardarRonda}
          style={{ background: 'var(--gold)', color: 'var(--blue-dark)' }}
        >
          Guardar ronda y reiniciar
        </button>
      )}
      <button
        onClick={() => emit('reiniciar_juego')}
        style={{ background: 'var(--red)', color: 'white' }}
      >
        Reiniciar juego
      </button>
    </div>
  );
}
