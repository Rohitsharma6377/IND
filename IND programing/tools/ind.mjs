#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { transpileDir } from '../packages/ind-transpiler/src/transpile.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function usage() {
  console.log('IND CLI');
  console.log('  node tools/ind.mjs build <srcDir> <outDir>');
  console.log('  node tools/ind.mjs dev <srcDir> <outDir> <entryJs>');
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (entry.isFile()) fs.copyFileSync(s, d);
  }
}

function build(srcDir, outDir) {
  transpileDir(srcDir, outDir);
  // Copy minimal runtime: std/ui.mjs only
  const runtimeRoot = path.resolve(__dirname, '../packages/ind-runtime');
  const uiSrc = path.join(runtimeRoot, 'std', 'ui.mjs');
  const uiDstDir = path.join(outDir, 'std');
  fs.mkdirSync(uiDstDir, { recursive: true });
  if (fs.existsSync(uiSrc)) {
    fs.copyFileSync(uiSrc, path.join(uiDstDir, 'ui.mjs'));
  }
  console.log(`Built ${srcDir} -> ${outDir}`);
}

function dev(srcDir, outDir, entryJs) {
  build(srcDir, outDir);
  let proc = spawn(process.execPath, [entryJs], { stdio: 'inherit' });

  const restart = () => {
    if (proc) proc.kill();
    build(srcDir, outDir);
    proc = spawn(process.execPath, [entryJs], { stdio: 'inherit' });
  };

  const watcher = fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
    if (!filename || !filename.endsWith('.ind')) return;
    console.log(`[watch] ${eventType}: ${filename}`);
    restart();
  });

  process.on('SIGINT', () => {
    watcher.close();
    if (proc) proc.kill();
    process.exit(0);
  });
}

const [,, cmd, a, b, c] = process.argv;
if (!cmd) {
  usage();
  process.exit(1);
}

if (cmd === 'build') {
  if (!a || !b) { usage(); process.exit(1); }
  build(path.resolve(a), path.resolve(b));
} else if (cmd === 'dev') {
  if (!a || !b || !c) { usage(); process.exit(1); }
  dev(path.resolve(a), path.resolve(b), path.resolve(c));
} else {
  usage();
  process.exit(1);
}
