// Python interop helpers (CPython via subprocess)
// call('module.func', ...args) -> uses python - <<'PY' ... PY
// Note: Requires `python` available on PATH. For production, switch to embedded Py or stable IPC.

import { spawn } from 'child_process';

export function call(path, ...args) {
  // Optional last param can be options { timeoutMs }
  let opts = {};
  if (args.length && typeof args[args.length - 1] === 'object' && !Array.isArray(args[args.length - 1])) {
    opts = args.pop();
  }
  const timeoutMs = opts.timeoutMs ?? 10000;

  return new Promise((resolve) => {
    const [mod, func] = path.split('.');
    const py = spawn('python', ['-'], { stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    py.stdout.on('data', (d) => (out += d));
    py.stderr.on('data', (d) => (err += d));
    py.on('close', (code) => {
      if (code !== 0) return resolve({ ok: false, error: err || `python exited ${code}` });
      try { resolve({ ok: true, value: JSON.parse(out) }); } catch (e) { resolve({ ok: true, value: out.trim() }); }
    });

    const payload = JSON.stringify(args);
    const script = `
import json
import importlib
m = importlib.import_module('${mod}')
f = getattr(m, '${func}')
args = json.loads('''${payload}''')
res = f(*args)
try:
  print(json.dumps(res))
except Exception:
  print(str(res))
`;
    py.stdin.write(script);
    py.stdin.end();

    let killed = false;
    const to = setTimeout(() => {
      if (!killed) {
        killed = true;
        try { py.kill(); } catch {}
        resolve({ ok: false, error: `timeout after ${timeoutMs}ms` });
      }
    }, timeoutMs);
    py.on('exit', () => clearTimeout(to));
  });
}
