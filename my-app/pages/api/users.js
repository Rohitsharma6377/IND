// API route: /api/users

export async function get({ req, res, query, params }) {
  try {
  // Simple auth check
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(401);
    return { error: 'Unauthorized' };
  }

    // Handle GET request
    return { message: 'GET users ok', query, params, timestamp: new Date().toISOString() };
  } catch (error) {
    res.status(500);
    return { error: 'Internal server error', message: error.message };
  }
}

export async function post({ req, res, body, query, params }) {
  try {
  // Simple auth check
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(401);
    return { error: 'Unauthorized' };
  }

  // Basic validation example
  if (body && typeof body !== 'object') {
    res.status(400);
    return { error: 'Invalid JSON body' };
  }

    // Handle POST request
    return { message: 'POST users ok', data: body || {}, timestamp: new Date().toISOString() };
  } catch (error) {
    res.status(500);
    return { error: 'Internal server error', message: error.message };
  }
}

