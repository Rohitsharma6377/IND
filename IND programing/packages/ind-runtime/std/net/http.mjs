import http from 'http';

export function text(body, status = 200, headers = {}) {
  return { status, headers: { 'content-type': 'text/plain; charset=utf-8', ...headers }, body: String(body) };
}

export function json(data, status = 200, headers = {}) {
  return { status, headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(data) };
}

export function serve(handler, { port = 3000, host = '0.0.0.0' } = {}) {
  const server = http.createServer(async (req, res) => {
    try {
      const h = await handler({
        method: req.method,
        url: req.url,
        headers: req.headers,
      });
      const { status = 200, headers = {}, body = '' } = h || {};
      res.writeHead(status, headers);
      res.end(typeof body === 'string' ? body : String(body));
    } catch (e) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end('Internal Server Error');
      console.error(e);
    }
  });
  server.listen(port, host, () => {
    console.log(`[http] listening on http://${host}:${port}`);
  });
  return server;
}
