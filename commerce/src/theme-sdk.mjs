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
