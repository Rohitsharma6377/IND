import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config to work smoothly with INDJS package contents inside node_modules
// - Some INDJS files in node_modules use JSX in .mjs; teach esbuild to parse it
// - Exclude optional server/test deps from pre-bundling
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.mjs': 'jsx',
        '.js': 'jsx',
      },
    },
    exclude: ['pg', 'sqlite', 'node-mocks-http'],
    include: ['indjs'],
  },
});
