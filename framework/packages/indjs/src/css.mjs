import path from 'path';
import fs from 'fs/promises';
import chokidar from 'chokidar';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const INPUT = 'styles/globals.css';

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function runOnce({ root }) {
  const inputFile = path.join(root, INPUT);
  const outDir = path.join(root, '.indjs', 'client');
  const outFile = path.join(outDir, 'styles.css');
  try {
    const css = await fs.readFile(inputFile, 'utf8');
    await ensureDir(outDir);
    // Resolve Tailwind config from app root if present for consistent content scanning
    const twcCandidates = [
      'tailwind.config.cjs',
      'tailwind.config.js',
      'tailwind.config.mjs',
      'tailwind.config.ts'
    ];
    let twConfigPath = null;
    for (const f of twcCandidates) {
      try { await fs.access(path.join(root, f)); twConfigPath = path.join(root, f); break; } catch {}
    }
    const twPlugin = twConfigPath ? tailwind({ config: twConfigPath }) : tailwind();
    const result = await postcss([twPlugin, autoprefixer]).process(css, {
      from: inputFile,
      to: outFile,
      map: { inline: true }
    });
    await fs.writeFile(outFile, result.css, 'utf8');
    return { outFile };
  } catch (e) {
    // If no input file, skip silently
    if (e.code === 'ENOENT') return { skipped: true };
    throw e;
  }
}

export async function buildCss({ root }) {
  return runOnce({ root });
}

export async function watchCss({ root, onRebuild }) {
  const inputFile = path.join(root, INPUT);
  const watcher = chokidar.watch([inputFile, path.join(root, 'tailwind.config.*')], { ignoreInitial: true });
  watcher.on('all', async () => {
    await runOnce({ root });
    onRebuild && onRebuild();
  });
  await runOnce({ root });
  return watcher;
}

export function cssHref() {
  return '/__indjs/client/styles.css';
}
