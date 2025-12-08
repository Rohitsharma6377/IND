export async function get({ req, res }) {
  return {
    message: 'Hello from INDJS API!',
    timestamp: new Date().toISOString(),
    method: req.method,
    userAgent: req.headers['user-agent']
  };
}

export async function post({ req, res, body }) {
  return {
    message: 'Data received!',
    data: body,
    timestamp: new Date().toISOString()
  };
}