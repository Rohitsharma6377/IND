// Minimal VDOM/runtime stub. This is a placeholder until the transpiler emits real VDOM ops.
// API: mount(root, renderFn) and h(type, props, ...children)

export function h(type, props, ...children) {
  return { type, props: props || {}, children: children.flat() };
}

export function mount(root, tree) {
  const el = typeof root === 'string' ? document.querySelector(root) : root;
  if (!el) throw new Error('std.ui.mount: root not found');
  el.innerHTML = renderToString(tree);
  // Event hydration is not implemented in this stub.
}

export function renderToString(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(renderToString).join('');
  const { type, props, children } = node;
  const attrs = Object.entries(props || {})
    .filter(([k]) => !k.startsWith('on:'))
    .map(([k, v]) => ` ${k}="${escapeHtml(String(v))}"`) 
    .join('');
  return `<${type}${attrs}>${children.map(renderToString).join('')}</${type}>`;
}

// New: SSR HTML mounting + hydration for data-on-*
export function mountHtml(root, html, ctx = {}) {
  const el = typeof root === 'string' ? document.querySelector(root) : root;
  if (!el) throw new Error('std.ui.mountHtml: root not found');
  el.innerHTML = html;
  hydrate(el, ctx);
}

export function hydrate(root, ctx = {}) {
  const el = typeof root === 'string' ? document.querySelector(root) : root;
  if (!el) throw new Error('std.ui.hydrate: root not found');
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    for (const attr of Array.from(node.attributes || [])) {
      if (attr.name.startsWith('data-on-')) {
        const ev = attr.name.slice('data-on-'.length);
        const expr = attr.value;
        const handler = evaluateInContext(expr, ctx);
        if (typeof handler === 'function') {
          node.addEventListener(ev, handler);
        }
      }
    }
  }
}

function evaluateInContext(expr, ctx) {
  try {
    // Very naive evaluator; for prototype only. Uses a with() to expose ctx names.
    // eslint-disable-next-line no-new-func
    const fn = new Function('ctx', `with (ctx) { return (${expr}); }`);
    return fn(ctx);
  } catch (e) {
    console.warn('std.ui.hydrate: failed to evaluate', expr, e);
    return null;
  }
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\"/g, '&quot;')
          .replace(/'/g, '&#39;');
}
