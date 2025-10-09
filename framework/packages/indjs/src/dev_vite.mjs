import path from 'path';
import { createRequire } from 'module';
import { getConfig } from './config.mjs';

// Start a Vite dev server and mount its middlewares onto our Express app
// Returns the created Vite server instance
export async function startVite({ app, root, bus }) {
  const cfg = getConfig();
  const appRoot = root;

  // Resolve vite and plugin from the APP's node_modules
  const appRequire = createRequire(path.join(appRoot, 'package.json'));
  const { createServer } = appRequire('vite');
  const reactPlugin = appRequire('@vitejs/plugin-react').default;

  const vite = await createServer({
    root: appRoot,
    plugins: [reactPlugin({ include: [/\.(jsx|tsx|mjs|js)$/] })],
    server: { middlewareMode: true },
    appType: 'custom',
    clearScreen: false,
  });

  // Mount Vite's connect instance as middleware
  app.use(vite.middlewares);

  // Forward Vite errors to our overlay bus in a best-effort manner
  // Vite sends HMR error overlays itself; we also emit our SSE so our UI stays consistent
  const sendError = (e) => {
    try { bus?.emit?.('error', { message: String(e?.message || e || 'Vite error') }); } catch {}
  };
  vite.watcher.on('error', sendError);
  vite.middlewares.on('error', sendError);

  return vite;
}
