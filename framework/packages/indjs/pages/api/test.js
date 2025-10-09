export default function handler({ req, res }) {
  const { method } = req;
  
  switch (method) {
    case 'GET':
      return res.json({
        message: 'Hello from INDJS API!',
        timestamp: new Date().toISOString(),
        method: 'GET',
        framework: 'INDJS',
        version: '2.0.6',
        features: [
          'Server-Side Rendering',
          'Static Site Generation', 
          'API Routes',
          'File-based Routing',
          'Hot Module Replacement',
          'TypeScript Support',
          'Tailwind CSS Integration'
        ]
      });
      
    case 'POST':
      return res.json({
        message: 'POST request received',
        body: req.body,
        timestamp: new Date().toISOString()
      });
      
    case 'PUT':
      return res.json({
        message: 'PUT request received',
        body: req.body,
        timestamp: new Date().toISOString()
      });
      
    case 'DELETE':
      return res.json({
        message: 'DELETE request received',
        timestamp: new Date().toISOString()
      });
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}
