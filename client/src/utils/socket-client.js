import SocketIO from 'socket.io-client';
export const baseURL = (() => {
  if (process.env.NODE_ENV === 'development') {
    const host = process.env.VUE_APP_SOCKET_HOST || 'localhost';
    const port = process.env.VUE_APP_SOCKET_PORT || '3000';
    return `http://${host}:${port}`;
  }
  return '';
})();

export const socketClient = namespace => SocketIO(baseURL + namespace);
