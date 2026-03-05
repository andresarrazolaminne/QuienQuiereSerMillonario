import { useEffect, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { pantallasApi } from '../../services/api';
import { configApi } from '../../services/api';
import { getBackgroundStyle } from '../../utils/backgroundStyle';
import WaitingScreen from './WaitingScreen';
import QuestionDisplay from './QuestionDisplay';
import PublicoVotingDisplay from './PublicoVotingDisplay';
import FeedbackMessage from './FeedbackMessage';
import HelpDisplay from './HelpDisplay';
import ScoreDisplay from './ScoreDisplay';
import ScoreDisplayFull from './ScoreDisplayFull';

export default function AudienceView({ fullscreen }) {
  const { connected, gameState } = useSocket();
  const [pantallas, setPantallas] = useState([]);
  const [pantallaActual, setPantallaActual] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    pantallasApi.getAll().then(setPantallas).catch(console.error);
  }, []);
  useEffect(() => {
    configApi.get().then(setConfig).catch(() => setConfig({}));
  }, []);

  useEffect(() => {
    if (gameState?.pantallaEsperaId != null) {
      const p = pantallas.find(x => String(x.id) === String(gameState.pantallaEsperaId));
      setPantallaActual(p || pantallas[0]);
    } else if (pantallas.length > 0 && !gameState?.preguntaActual && gameState?.mode === 'espera') {
      setPantallaActual(pantallas[0]);
    } else {
      setPantallaActual(null);
    }
  }, [gameState?.pantallaEsperaId, gameState?.mode, gameState?.preguntaActual, pantallas]);

  const isCierre = gameState?.mode === 'cierre';
  const isEspera = gameState?.mode === 'espera' || (!gameState?.preguntaActual && !gameState?.feedback && !isCierre);
  const isFeedback = gameState?.feedback;

  const showingQuestion = !gameState?.feedback && gameState?.mode !== 'espera' && !isCierre && gameState?.preguntaActual;
  const inEspera = !isFeedback && !isCierre && isEspera && pantallaActual;
  const fondoConfig = isCierre ? null : (inEspera ? (config?.fondo_espera) : (config?.fondo_publico));
  const containerStyle = {
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: showingQuestion ? 'flex-start' : 'center',
    padding: fullscreen ? '1rem' : '2rem',
    background: isCierre ? 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 50%, #0d2137 100%)' : getBackgroundStyle(fondoConfig),
    overflow: showingQuestion ? 'auto' : 'hidden',
    position: 'relative'
  };

  return (
    <div style={containerStyle}>
      {gameState?.mostrarPuntaje && !isCierre && (
        <ScoreDisplay puntaje={gameState?.puntajeActual ?? 0} />
      )}

      {isCierre && (
        <ScoreDisplayFull puntaje={gameState?.puntajeActual ?? 0} />
      )}

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

      {isFeedback && (
        <FeedbackMessage feedback={gameState.feedback} pregunta={gameState.preguntaActual} />
      )}

      {!isFeedback && !isCierre && inEspera && pantallaActual && (
        <WaitingScreen pantalla={pantallaActual} />
      )}

      {!isFeedback && !isCierre && !isEspera && gameState?.preguntaActual && (
        <div style={{
          width: '100%',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {gameState?.ayudasUsadas?.publico && (gameState?.votacionAbierta || ((gameState?.publicoVotos?.A || 0) + (gameState?.publicoVotos?.B || 0) + (gameState?.publicoVotos?.C || 0) + (gameState?.publicoVotos?.D || 0) > 0)) ? (
            <PublicoVotingDisplay
              pregunta={gameState.preguntaActual}
              opcionesEliminadas={gameState.opcionesEliminadas || []}
              publicoVotos={gameState.publicoVotos}
            />
          ) : (
            <>
              <QuestionDisplay
                pregunta={gameState.preguntaActual}
                opcionesEliminadas={gameState.opcionesEliminadas || []}
                ayudasUsadas={gameState.ayudasUsadas || {}}
              />
              <HelpDisplay
                ayudasUsadas={gameState.ayudasUsadas || {}}
                publicoVotos={gameState.publicoVotos}
              />
            </>
          )}
        </div>
      )}

      {!isFeedback && !isCierre && !isEspera && !gameState?.preguntaActual && !pantallaActual && (
        <div style={{ textAlign: 'center', color: 'var(--gray)' }}>
          <h2>Esperando...</h2>
          <p>Añade pantallas de espera en el panel de administración</p>
        </div>
      )}
    </div>
  );
}
