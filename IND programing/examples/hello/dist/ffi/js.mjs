// JavaScript interop helpers
// call('JSON.parse', str) or call('node:fs.readFileSync', path, 'utf8')
export async function call(path, ...args) {
  const parts = path.split('.');
  // support built-in node: specifier via dynamic import
  if (parts[0].startsWith('node:')) {
    const mod = await import(parts[0]);
    const fn = parts.slice(1).reduce((obj, k) => obj?.[k], mod);
    if (typeof fn !== 'function') throw new Error(`ffi.js: ${path} is not a function`);
    return await fn(...args);
  }
  // global lookup (globalThis)
  const fn = parts.reduce((obj, k) => obj?.[k], globalThis);
  if (typeof fn !== 'function') throw new Error(`ffi.js: ${path} is not a function on globalThis`);
  return await fn(...args);
}

export async function importModule(specifier) {
  return await import(specifier);
}
