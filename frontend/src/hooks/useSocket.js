import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket = null;

function getSocket() {
  if (!socket) {
    socket = io(window.location.origin, { path: '/socket.io' });
  }
  return socket;
}

export function useSocket() {
  const [connected, setConnected] = useState(false);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const s = getSocket();

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);
    const onEstado = (state) => setGameState(state);

    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);
    s.on('estado_cambio', onEstado);

    if (s.connected) setConnected(true);

    return () => {
      s.off('connect', onConnect);
      s.off('disconnect', onDisconnect);
      s.off('estado_cambio', onEstado);
    };
  }, []);

  const emit = (event, ...args) => {
    const s = getSocket();
    if (s?.connected) {
      s.emit(event, ...args);
    }
  };

  return { socket: getSocket(), connected, gameState, emit };
}
