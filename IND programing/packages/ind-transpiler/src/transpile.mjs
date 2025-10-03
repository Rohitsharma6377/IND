import fs from 'fs';
import path from 'path';

function stripComments(line) {
  const hash = line.indexOf('#');
  if (hash >= 0) return line.slice(0, hash);
  return line;
}

function isBlank(line) {
  return /^\s*$/.test(line);
}

function indentLevel(line) {
  const m = line.match(/^(\s*)/);
  return m ? m[1].replace(/\t/g, '    ').length : 0;
}

function transpileLines(lines) {
  const out = ["import { h } from './std/ui.mjs';"]; // prelude for future JSX→VDOM
  const stack = []; // indentation stack for braces
  const ctxStack = []; // { isRender: boolean, jsx: string[] }
  let prevIndent = 0;
  let pendingAnnots = [];

  const pushBraceOpen = (header) => {
    out.push(header + ' {');
    stack.push('{');
    ctxStack.push({ isRender: false, jsx: [] });
  };
  const closeToIndent = (target) => {
    while (prevIndent > target) {
      // Before closing, if top context is a render with buffered JSX, emit return
      const top = ctxStack[ctxStack.length - 1];
      if (top && top.isRender && top.jsx.length) {
        const tpl = top.jsx.join('\n');
        out.push('return `'+tpl+'`;');
        top.jsx.length = 0;
      }
      out.push('}');
      stack.pop();
      ctxStack.pop();
      prevIndent -= 4; // assume 4-space indent granularity
    }
  };

  for (let raw of lines) {
    let line = stripComments(raw);
    if (isBlank(line)) continue;

    const ind = indentLevel(line);
    const trimmed = line.trim();

    // No implicit blocks: rely on ':'-terminated headers to open blocks
    if (ind < prevIndent) {
      closeToIndent(ind);
    }
    prevIndent = ind;

    // Annotations: @server/@client/@action (collect for next decl)
    if ((/^@/.test(trimmed))) {
      const name = trimmed.replace(/^@\s*/, '').trim();
      pendingAnnots.push(name);
      continue;
    }

    // Module: export default ...
    let m;
    if ((m = trimmed.match(/^export\s+default\s+(.+)$/))) {
      out.push(`export default ${m[1]};`);
      continue;
    }

    // unsafe: block open
    if (trimmed === 'unsafe:' ) {
      out.push('{ /* unsafe */');
      stack.push('{');
      ctxStack.push({ isRender: false, jsx: [] });
      continue;
    }

    // Module: export fn NAME(args):
    if ((m = trimmed.match(/^export\s+async\s+fn\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*?)\)\s*:?$/))) {
      const name = m[1];
      const args = m[2];
      out.push(`export async function ${name}(${args}) {`);
      stack.push('{');
      ctxStack.push({ isRender: false, jsx: [] });
      if (pendingAnnots.length) { out.push(`/* @${pendingAnnots.join(',')} */`); pendingAnnots = []; }
      continue;
    }
    if ((m = trimmed.match(/^export\s+fn\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*?)\)\s*:?$/))) {
      const name = m[1];
      const args = m[2];
      out.push(`export function ${name}(${args}) {`);
      stack.push('{');
      ctxStack.push({ isRender: false, jsx: [] });
      if (pendingAnnots.length) { out.push(`/* @${pendingAnnots.join(',')} */`); pendingAnnots = []; }
      continue;
    }

    // Module: export let/const ...
    if ((m = trimmed.match(/^export\s+(let|const)\s+(.+)$/))) {
      out.push(`export ${m[1]} ${m[2]};`);
      continue;
    }

    // Module: import path [as alias]
    if ((m = trimmed.match(/^import\s+([A-Za-z_][\w]*(?:\.[A-Za-z_][\w]*)*)(?:\s+as\s+([A-Za-z_][\w]*))?$/))) {
      const mod = m[1];
      const alias = m[2] || mod.split('.').pop();
      if (/^std\.ui\b/.test(mod)) {
        const rel = './' + mod.replace(/\./g, '/') + '.mjs';
        out.push(`import * as ${alias} from '${rel}';`);
      } else {
        // Leave as bare/dotted path converted to slash for user-controlled resolution
        const jsPath = mod.replace(/\./g, '/');
        out.push(`import * as ${alias} from '${jsPath}';`);
      }
      continue;
    }

    // Statements
    // fn declaration
    if ((m = trimmed.match(/^async\s+fn\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*?)\)\s*:?$/))) {
      const name = m[1];
      const args = m[2];
      pushBraceOpen(`async function ${name}(${args})`);
      if (pendingAnnots.length) { out.push(`/* @${pendingAnnots.join(',')} */`); pendingAnnots = []; }
      continue;
    }
    if ((m = trimmed.match(/^fn\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*?)\)\s*:?$/))) {
      const name = m[1];
      const args = m[2];
      pushBraceOpen(`function ${name}(${args})`);
      if (pendingAnnots.length) { out.push(`/* @${pendingAnnots.join(',')} */`); pendingAnnots = []; }
      continue;
    }

    // if / elif / else
    if ((m = trimmed.match(/^if\s+(.+):$/))) {
      pushBraceOpen(`if (${m[1]})`);
      continue;
    }
    if ((m = trimmed.match(/^elif\s+(.+):$/))) {
      out.push(`else if (${m[1]}) {`);
      stack.push('{');
      ctxStack.push({ isRender: false, jsx: [] });
      continue;
    }
    if (trimmed === 'else:' ) {
      out.push('else {');
      stack.push('{');
      ctxStack.push({ isRender: false, jsx: [] });
      continue;
    }

    // while
    if ((m = trimmed.match(/^while\s+(.+):$/))) {
      pushBraceOpen(`while (${m[1]})`);
      continue;
    }

    // for IDENT in expr:
    if ((m = trimmed.match(/^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+(.+):$/))) {
      const iter = m[1];
      const expr = m[2];
      pushBraceOpen(`for (const ${iter} of ${expr})`);
      continue;
    }

    // return
    if ((m = trimmed.match(/^return(?:\s+(.+))?$/))) {
      const expr = m[1];
      out.push(expr ? `return ${expr};` : 'return;');
      continue;
    }

    // let/const
    if ((m = trimmed.match(/^(let|const)\s+([A-Za-z_][A-Za-z0-9_]*)(\s*:\s*[^=]+)?(\s*=\s*.+)?$/))) {
      const kind = m[1] === 'let' ? 'let' : 'const';
      const name = m[2];
      const assign = m[4] ? m[4].trim().replace(/^=\s*/, '= ') : '';
      out.push(`${kind} ${name}${assign};`);
      continue;
    }

    // print(...) => console.log(...)
    if ((m = trimmed.match(/^print\((.*)\)\s*$/))) {
      out.push(`console.log(${m[1]});`);
      continue;
    }

    // component (minimal stub -> treat like function returning render())
    if ((m = trimmed.match(/^component\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*?)\)\s*:?$/))) {
      const name = m[1];
      const args = m[2] || '';
      pushBraceOpen(`function ${name}(${args})`);
      if (pendingAnnots.length) { out.push(`/* @${pendingAnnots.join(',')} */`); pendingAnnots = []; }
      continue;
    }

    // render(): open block and mark render context to buffer JSX
    if ((m = trimmed.match(/^render\(\):$/))) {
      out.push('function render() {');
      stack.push('{');
      ctxStack.push({ isRender: true, jsx: [] });
      continue;
    }

    // If inside render, buffer JSX-like lines beginning with '<'
    if (ctxStack.length && ctxStack[ctxStack.length - 1].isRender && trimmed.startsWith('<')) {
      // Normalize event attributes on:click={expr} -> data-on-click="expr"
      const normalized = trimmed.replace(/on:([A-Za-z_][\w]*)\s*=\s*\{([^}]+)\}/g, (m0, ev, expr) => {
        return `data-on-${ev}="${expr.trim()}"`;
      });
      ctxStack[ctxStack.length - 1].jsx.push(normalized);
      continue;
    }

    // Default: emit as-is with semicolon if looks like expression
    if (/^[A-Za-z_]/.test(trimmed) || trimmed.startsWith('(') || trimmed.startsWith('[') || trimmed.startsWith('{') || trimmed.startsWith('await ')) {
      out.push(trimmed.replace(/:\s*$/, '') + (/[;}]$/.test(trimmed) ? '' : ';'));
      continue;
    }

    // Fallback: keep raw line as comment to avoid breaking
    out.push(`/* ${trimmed} */`);
  }

  // close remaining blocks
  while (stack.length) {
    const top = ctxStack[ctxStack.length - 1];
    if (top && top.isRender && top.jsx.length) {
      const tpl = top.jsx.join('\n');
      out.push('return `'+tpl+'`;');
      top.jsx.length = 0;
    }
    out.push('}');
    stack.pop();
    ctxStack.pop();
  }

  return out.join('\n') + '\n';
}

export function transpileFile(inputPath, outPath) {
  const src = fs.readFileSync(inputPath, 'utf8');
  const lines = src.split(/\r?\n/);
  const js = transpileLines(lines);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, js, 'utf8');
}

export function transpileDir(srcDir, outDir) {
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && full.endsWith('.ind')) {
        const rel = path.relative(srcDir, full);
        const outPath = path.join(outDir, rel.replace(/\.ind$/, '.js'));
        transpileFile(full, outPath);
      }
    }
  };
  walk(srcDir);
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const [,, inFile, outFile] = process.argv;
  if (!inFile || !outFile) {
    console.error('Usage: node transpile.mjs <input.ind> <output.js>');
    process.exit(1);
  }
  transpileFile(inFile, outFile);
}
