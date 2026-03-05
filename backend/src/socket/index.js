import {
  getGameState,
  setMode,
  setPantallaEspera,
  setPreguntas,
  setPreguntaIndex,
  siguientePregunta,
  activarFiftyFifty,
  activarLlamada,
  activarPublico,
  votarPublico,
  cerrarVotacion,
  marcarRespuesta,
  limpiarFeedback,
  setMostrarPuntaje,
  reiniciarJuego
} from '../gameState.js';

export function setupSocket(io) {
  io.on('connection', (socket) => {
    socket.emit('estado_cambio', getGameState());

    socket.on('set_mode', (mode) => {
      setMode(mode);
      io.emit('estado_cambio', getGameState());
    });

    socket.on('set_pantalla_espera', (id) => {
      const numId = id != null ? Number(id) : null;
      setPantallaEspera(numId);
      io.emit('estado_cambio', getGameState());
    });

    socket.on('set_preguntas', (preguntas) => {
      setPreguntas(preguntas);
      io.emit('estado_cambio', getGameState());
    });

    socket.on('set_pregunta_index', (index) => {
      setPreguntaIndex(index);
      io.emit('estado_cambio', getGameState());
    });

    socket.on('siguiente_pregunta', () => {
      siguientePregunta();
      io.emit('estado_cambio', getGameState());
    });

    socket.on('activar_fifty_fifty', () => {
      activarFiftyFifty();
      io.emit('estado_cambio', getGameState());
    });

    socket.on('activar_llamada', () => {
      activarLlamada();
      io.emit('estado_cambio', getGameState());
    });

    socket.on('activar_publico', () => {
      activarPublico();
      io.emit('estado_cambio', getGameState());
    });

    socket.on('votar_publico', (opcion) => {
      votarPublico(opcion);
      io.emit('estado_cambio', getGameState());
    });

    socket.on('cerrar_votacion', () => {
      cerrarVotacion();
      io.emit('estado_cambio', getGameState());
    });

    socket.on('marcar_respuesta', (opcion) => {
      marcarRespuesta(opcion);
      io.emit('estado_cambio', getGameState());
    });

    socket.on('limpiar_feedback', () => {
      limpiarFeedback();
      io.emit('estado_cambio', getGameState());
    });

    socket.on('set_mostrar_puntaje', (mostrar) => {
      setMostrarPuntaje(mostrar);
      io.emit('estado_cambio', getGameState());
    });

    socket.on('reiniciar_juego', () => {
      reiniciarJuego();
      io.emit('estado_cambio', getGameState());
    });
  });
}
