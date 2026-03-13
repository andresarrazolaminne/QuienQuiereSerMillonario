let gameState = {
  mode: 'espera',
  pantallaEsperaId: null,
  preguntaActual: null,
  preguntaIndex: 0,
  preguntas: [],
  preguntasUsadas: [],
  historialRespuestas: [],
  puntajeActual: 0,
  mostrarPuntaje: false,
  ayudasUsadas: {
    fiftyFifty: false,
    llamada: false,
    publico: false
  },
  opcionesEliminadas: [],
  respuestaMarcada: null,
  feedback: null,
  publicoVotos: null,
  votacionAbierta: false
};

export function getGameState() {
  return { ...gameState };
}

export function setMode(mode) {
  gameState.mode = mode;
  if (mode === 'espera' || mode === 'cierre') {
    gameState.feedback = null;
    gameState.respuestaMarcada = null;
  }
  return getGameState();
}

export function setPantallaEspera(id) {
  gameState.pantallaEsperaId = id;
  gameState.mode = 'espera';
  gameState.feedback = null;
  gameState.respuestaMarcada = null;
  return getGameState();
}

export function setPreguntas(preguntas) {
  gameState.preguntas = Array.isArray(preguntas) ? preguntas : [];
  gameState.preguntaIndex = 0;
  gameState.preguntaActual = gameState.preguntas[0] || null;
  gameState.preguntasUsadas = [];
  gameState.historialRespuestas = [];
  gameState.puntajeActual = 0;
  gameState.ayudasUsadas = { fiftyFifty: false, llamada: false, publico: false };
  gameState.opcionesEliminadas = [];
  gameState.respuestaMarcada = null;
  gameState.feedback = null;
  gameState.publicoVotos = null;
  gameState.votacionAbierta = false;
  gameState.mode = gameState.preguntaActual ? 'pregunta' : 'espera';
  return getGameState();
}

export function setPreguntaIndex(index) {
  if (index >= 0 && index < gameState.preguntas.length) {
    gameState.preguntaIndex = index;
    gameState.preguntaActual = gameState.preguntas[index];
    gameState.opcionesEliminadas = [];
    gameState.respuestaMarcada = null;
    gameState.feedback = null;
    gameState.publicoVotos = null;
    gameState.votacionAbierta = false;
    gameState.mode = 'pregunta';
  }
  return getGameState();
}

export function siguientePregunta() {
  const next = gameState.preguntaIndex + 1;
  if (next < gameState.preguntas.length) {
    return setPreguntaIndex(next);
  }
  gameState.mode = 'espera';
  gameState.preguntaActual = null;
  return getGameState();
}

export function activarFiftyFifty() {
  if (gameState.ayudasUsadas.fiftyFifty || !gameState.preguntaActual) return getGameState();
  const correcta = gameState.preguntaActual.correcta;
  const opciones = ['A', 'B', 'C', 'D'];
  const incorrectas = opciones.filter(o => o !== correcta);
  const eliminar = incorrectas.sort(() => Math.random() - 0.5).slice(0, 2);
  gameState.ayudasUsadas.fiftyFifty = true;
  gameState.opcionesEliminadas = eliminar;
  return getGameState();
}

export function activarLlamada() {
  if (gameState.ayudasUsadas.llamada || !gameState.preguntaActual) return getGameState();
  gameState.ayudasUsadas.llamada = true;
  return getGameState();
}

export function activarPublico() {
  if (gameState.ayudasUsadas.publico || !gameState.preguntaActual) return getGameState();
  gameState.ayudasUsadas.publico = true;
  gameState.publicoVotos = { A: 0, B: 0, C: 0, D: 0 };
  gameState.votacionAbierta = true;
  return getGameState();
}

export function votarPublico(opcion) {
  const key = String(opcion || '').toUpperCase().charAt(0);
  if (!gameState.votacionAbierta || !['A', 'B', 'C', 'D'].includes(key)) return getGameState();
  if (!gameState.publicoVotos) gameState.publicoVotos = { A: 0, B: 0, C: 0, D: 0 };
  gameState.publicoVotos[key] = (gameState.publicoVotos[key] || 0) + 1;
  return getGameState();
}

export function cerrarVotacion() {
  gameState.votacionAbierta = false;
  return getGameState();
}

export function marcarRespuesta(opcion) {
  if (!gameState.preguntaActual) return getGameState();
  if (!gameState.preguntasUsadas.includes(gameState.preguntaIndex)) {
    gameState.preguntasUsadas = [...gameState.preguntasUsadas, gameState.preguntaIndex];
  }
  gameState.respuestaMarcada = opcion;
  const correcta = gameState.preguntaActual.correcta;
  const correcto = opcion === correcta;
  const valor = gameState.preguntaActual.valor ?? 100 * (gameState.preguntaActual.nivel ?? 1);
  if (correcto) {
    gameState.puntajeActual = (gameState.puntajeActual || 0) + valor;
  }
  gameState.historialRespuestas = [...(gameState.historialRespuestas || []), {
    index: gameState.preguntaIndex,
    texto: gameState.preguntaActual.texto,
    correcto,
    valor,
    nivel: gameState.preguntaActual.nivel ?? 1
  }];
  gameState.feedback = correcto ? 'correcto' : 'incorrecto';
  gameState.mode = 'feedback';
  return getGameState();
}

export function limpiarFeedback() {
  gameState.feedback = null;
  gameState.respuestaMarcada = null;
  gameState.mode = gameState.preguntaActual ? 'pregunta' : 'espera';
  return getGameState();
}

export function setMostrarPuntaje(mostrar) {
  gameState.mostrarPuntaje = !!mostrar;
  return getGameState();
}

export function reiniciarJuego() {
  gameState = {
    mode: 'espera',
    pantallaEsperaId: null,
    preguntaActual: null,
    preguntaIndex: 0,
    preguntas: [],
    preguntasUsadas: [],
    historialRespuestas: [],
    puntajeActual: 0,
    mostrarPuntaje: false,
    ayudasUsadas: { fiftyFifty: false, llamada: false, publico: false },
    opcionesEliminadas: [],
    respuestaMarcada: null,
    feedback: null,
    publicoVotos: null,
    votacionAbierta: false
  };
  return getGameState();
}
