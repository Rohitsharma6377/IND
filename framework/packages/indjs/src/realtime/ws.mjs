import http from 'http';

export async function attachWebSocket({ server, path = '/__indjs/ws', verifyClient } = {}) {
  let WebSocketServer;
  try {
    ({ WebSocketServer } = await import('ws'));
  } catch {
    console.warn('[indjs][realtime] ws package not installed. Run `npm i ws` to enable WebSocket.');
    return { wss: null, broadcast: () => {} };
  }
  if (!server) throw new Error('attachWebSocket requires an http server instance');
  const wss = new WebSocketServer({ server, path, verifyClient });
  wss.on('connection', (ws, req) => {
    ws.on('message', (data) => {
      // echo minimal default; apps should replace with custom logic
      try { ws.send(String(data)); } catch {}
    });
  });
  const broadcast = (msg) => {
    const data = typeof msg === 'string' ? msg : JSON.stringify(msg);
    wss.clients.forEach((client) => {
      try { if (client.readyState === 1) client.send(data); } catch {}
    });
  };
  return { wss, broadcast };
}
