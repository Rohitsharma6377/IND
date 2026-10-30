// This module is evaluated inside QuickJS; it must not import host APIs.
const markup = new WeakMap();
const MAX_OUTPUT = 262144;
const escape = value => String(value).replace(/[&<>"']/g, c => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[c]));

function interpolation(value) {
  if (value === null || value === undefined || typeof value === 'boolean') return '';
  if (Array.isArray(value)) return value.map(interpolation).join('');
  if (typeof value === 'object' && markup.has(value)) return markup.get(value);
  return escape(value);
}

// Interpolate values in quoted attributes or text, never tag/attribute names or CSS.
export function html(strings, ...values) {
  if (!Array.isArray(strings) || !Object.hasOwn(strings, 'raw')) {
    throw new TypeError('Use html as a tagged template literal');
  }
  let output = strings[0];
  for (let i = 0; i < values.length; i++) {
    output += interpolation(values[i]) + strings[i + 1];
    if (output.length > MAX_OUTPUT) throw new RangeError('Theme output exceeds 256 KB');
  }
  const result = Object.freeze({ toString: () => output });
  markup.set(result, output);
  return result;
}

export function money(paise) {
  if (!Number.isSafeInteger(paise) || paise < 0 || paise > 100000000) {
    throw new RangeError('money expects an INR price in integer paise');
  }
  const [whole, decimal] = (paise / 100).toFixed(2).split('.');
  const grouped = whole.length <= 3 ? whole :
    whole.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + whole.slice(-3);
  return '₹' + grouped + '.' + decimal;
}

export function renderToString(value) {
  const output = typeof value === 'string' ? value :
    value && typeof value === 'object' && markup.has(value) ? markup.get(value) : null;
  if (output === null) throw new TypeError('The default render function must return html markup or a string synchronously');
  if (output.length > MAX_OUTPUT) throw new RangeError('Theme output exceeds 256 KB');
  return output;
}


// Layout JSON contains presentation settings, never executable expressions or secrets.
const own = (object, key) => Object.hasOwn(object, key);
const identifier = value => typeof value === 'string' &&
  /^[a-zA-Z][a-zA-Z0-9_-]{0,63}$/.test(value) &&
  !['constructor', 'prototype', '__proto__'].includes(value);
function record(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) &&
    [Object.prototype, null].includes(Object.getPrototypeOf(value));
}
function keysOnly(value, allowed) {
  if (!record(value) || Object.keys(value).some(key => !allowed.includes(key))) {
    throw new TypeError('Unknown layout properties');
  }
}
function jsonValue(value, depth = 0) {
  if (depth > 8) throw new RangeError('Settings are nested too deeply');
  if (value === null || typeof value === 'boolean') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.length <= 4096) return value;
  if (Array.isArray(value) && value.length <= 100) return value.map(v => jsonValue(v, depth + 1));
  if (record(value) && Object.keys(value).length <= 100) {
    const result = Object.create(null);
    for (const key of Object.keys(value)) {
      if (!identifier(key)) throw new TypeError('Invalid setting key');
      result[key] = jsonValue(value[key], depth + 1);
    }
    return result;
  }
  throw new TypeError('Settings must contain bounded JSON values');
}
function orderedIds(order, entries, maximum) {
  if (!Array.isArray(order) || order.length > maximum ||
      new Set(order).size !== order.length ||
      order.some(id => !identifier(id) || !own(entries, id))) {
    throw new TypeError('Invalid section or block order');
  }
  // IND requires every instance to appear exactly once, including disabled ones.
  if (Object.keys(entries).length !== order.length) throw new TypeError('Every instance needs an order entry');
  return [...order];
}
export function validateLayout(input) {
  keysOnly(input, ['version', 'sections', 'order']);
  if (input.version !== 1 || !record(input.sections)) throw new TypeError('Expected layout version 1');
  const ids = orderedIds(input.order, input.sections, 25);
  const sections = Object.create(null);
  for (const id of ids) {
    const value = input.sections[id];
    keysOnly(value, ['type', 'settings', 'disabled', 'blocks', 'blockOrder']);
    if (!identifier(value.type) || (own(value, 'disabled') && typeof value.disabled !== 'boolean')) {
      throw new TypeError('Invalid section type or disabled flag');
    }
    const blocks = Object.create(null);
    const source = value.blocks === undefined ? {} : value.blocks;
    if (!record(source)) throw new TypeError('Invalid blocks');
    const order = orderedIds(value.blockOrder === undefined ? [] : value.blockOrder, source, 50);
    for (const blockId of order) {
      const block = source[blockId];
      keysOnly(block, ['type', 'settings']);
      if (!identifier(block.type)) throw new TypeError('Invalid block type');
      if (block.settings !== undefined && !record(block.settings)) throw new TypeError('Invalid block settings');
      blocks[blockId] = { type: block.type, settings: jsonValue(block.settings ?? {}) };
    }
    if (value.settings !== undefined && !record(value.settings)) throw new TypeError('Invalid section settings');
    sections[id] = {
      type: value.type, disabled: value.disabled ?? false,
      settings: jsonValue(value.settings ?? {}), blocks, blockOrder: order
    };
  }
  const result = { version: 1, sections, order: ids };
  if (JSON.stringify(result).length > 65536) throw new RangeError('Layout exceeds 64K characters');
  function freeze(value) {
    if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); }
    return value;
  }
  return freeze(result);
}
export function renderSections(layout, registry, context = {}) {
  const validated = validateLayout(layout);
  if (!record(registry)) throw new TypeError('Expected a section registry');
  // Validate disabled types too, so re-enabling one cannot introduce an unknown renderer.
  for (const id of validated.order) {
    const section = validated.sections[id];
    if (!own(registry, section.type) || typeof registry[section.type] !== 'function') {
      throw new TypeError('Unknown section type: ' + section.type);
    }
  }
  return html`${validated.order.map(id => {
    const section = validated.sections[id];
    if (section.disabled) return null;
    const output = registry[section.type]({ ...context, section: { id, ...section } });
    if (!output || typeof output !== 'object' || !markup.has(output)) {
      throw new TypeError('Section renderers must return html markup synchronously');
    }
    return output;
  })}`;
}
