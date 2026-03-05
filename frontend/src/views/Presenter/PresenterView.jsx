import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { preguntasApi, pantallasApi, configApi } from '../../services/api';
import { getBackgroundStyle } from '../../utils/backgroundStyle';
import QuestionList from './QuestionList';
import HelpButtons from './HelpButtons';
import AnswerSelector from './AnswerSelector';
import WaitingScreenSelector from './WaitingScreenSelector';
import GameFlowControls from './GameFlowControls';

export default function PresenterView() {
  const { connected, gameState, emit } = useSocket();
  const [preguntas, setPreguntas] = useState([]);
  const [pantallas, setPantallas] = useState([]);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    preguntasApi.getAll().then(setPreguntas).catch(console.error);
    pantallasApi.getAll().then(setPantallas).catch(console.error);
  }, []);
  useEffect(() => {
    configApi.get().then(setConfig).catch(() => setConfig({}));
  }, []);

  const cargarPreguntas = () => {
    emit('set_preguntas', preguntas);
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '1.5rem',
      maxWidth: 1200,
      margin: '0 auto',
      background: getBackgroundStyle(config?.fondo_presentador)
    }}>
      <h1 style={{ marginBottom: '0.5rem', color: 'var(--gold)' }}>Vista del Presentador</h1>
      <p style={{ color: 'var(--gray)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        {connected ? 'Conectado' : 'Desconectado'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem' }}>
        <div>
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Lista de preguntas</h2>
            <QuestionList
              preguntas={preguntas}
              gameState={gameState}
              onSelect={(idx) => emit('set_pregunta_index', idx)}
              onCargar={cargarPreguntas}
            />
          </section>

          {gameState?.preguntaActual && (
            <>
              <section style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Ayudas</h2>
                <HelpButtons gameState={gameState} emit={emit} />
              </section>

              <section style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Marcar respuesta</h2>
                <AnswerSelector
                  pregunta={gameState.preguntaActual}
                  opcionesEliminadas={gameState.opcionesEliminadas || []}
                  emit={emit}
                />
              </section>
            </>
          )}
        </div>

        <div>
          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Pantallas de espera</h2>
            <WaitingScreenSelector
              pantallas={pantallas}
              emit={emit}
              pantallaEsperaId={gameState?.pantallaEsperaId}
            />
          </section>

          <section style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Puntaje en público</h2>
            <button
              onClick={() => emit('set_mostrar_puntaje', !gameState?.mostrarPuntaje)}
              style={{
                background: gameState?.mostrarPuntaje ? 'var(--gold)' : 'var(--blue-light)',
                color: gameState?.mostrarPuntaje ? 'var(--blue-dark)' : 'var(--white)',
                width: '100%',
                fontWeight: gameState?.mostrarPuntaje ? 600 : 400
              }}
            >
              {gameState?.mostrarPuntaje ? 'Ocultar puntaje' : 'Mostrar puntaje'}
            </button>
            <button
              onClick={() => emit('set_mode', 'cierre')}
              style={{
                width: '100%',
                marginTop: '0.5rem',
                padding: '0.6rem',
                background: gameState?.mode === 'cierre' ? 'var(--gold)' : 'var(--green)',
                color: gameState?.mode === 'cierre' ? 'var(--blue-dark)' : 'var(--white)',
                fontWeight: 600
              }}
            >
              {gameState?.mode === 'cierre' ? 'Pantalla de cierre activa' : 'Ir a pantalla de cierre'}
            </button>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--gray)' }}>
              Actual: {(gameState?.puntajeActual ?? 0).toLocaleString()}
            </div>
          </section>

          <section>
            <h2 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>Controles</h2>
            <GameFlowControls gameState={gameState} emit={emit} />
          </section>
        </div>
      </div>
    </div>
  );
}
