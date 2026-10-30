import { validateLayout } from './theme-sdk.mjs';
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
export class Fault extends Error { constructor(status, message) { super(message); this.status = status; } }
export const fail = (condition, status, message) => { if (!condition) throw new Fault(status, message); };
export const id = (prefix) => prefix + '_' + randomBytes(12).toString('hex');
export const now = () => new Date().toISOString();
export const hash = (value) => createHash('sha256').update(value).digest('hex');
export const secret = () => randomBytes(32).toString('base64url');
export function text(value, name, max = 200, min = 1) {
  fail(typeof value === 'string', 400, name + ' must be text');
  value = value.trim();
  fail(value.length >= min && value.length <= max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value), 400, name + ' must contain ' + min + '–' + max + ' characters');
  return value;
}
export function integer(value, name, max = 100000000, min = 0) {
  fail(Number.isSafeInteger(value) && value >= min && value <= max, 400, name + ' must be an integer between ' + min + ' and ' + max);
  return value;
}
export function email(value) {
  const normalized = text(value, 'Email', 254).toLowerCase();
  fail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized), 400, 'Enter a valid email address');
  return normalized;
}
export function passwordHash(password) {
  text(password, 'Password', 256, 12);
  const salt = randomBytes(16).toString('hex');
  return salt + ':' + scryptSync(password, salt, 64).toString('hex');
}
const dummy = passwordHash(secret());
export function verifyPassword(password, encoded) {
  if (typeof password !== 'string' || password.length > 256) return false;
  const [salt, expected] = (encoded || dummy).split(':');
  return timingSafeEqual(scryptSync(password, salt, 64), Buffer.from(expected, 'hex')) && Boolean(encoded);
}
export function theme(input) {
  fail(input && typeof input === 'object', 400, 'A theme configuration is required');
  fail(['market', 'atelier', 'circuit'].includes(input.template), 400, 'Choose a supported theme');
  fail(/^#[\da-f]{6}$/i.test(input.accent), 400, 'Use a six-digit hex colour');
  const renderer=input.renderer||'builtin';fail(['builtin','javascript'].includes(renderer),400,'Choose built-in or JavaScript rendering');
  let layout;
  if(input.layout!==undefined){fail(renderer==='javascript',400,'Section layouts require JavaScript rendering');try{layout=validateLayout(input.layout);}catch(error){fail(false,400,error.message);}}
  const files=renderer==='javascript'||input.files?validateJavaScriptPackage(input.files):null;
  return { renderer,...(layout?{layout}:{}),...(files?{files}:{}),template: input.template, accent: input.accent, title: text(input.title, 'Headline', 100), subtitle: text(input.subtitle, 'Subheading', 200, 0), announcement: text(input.announcement, 'Announcement', 160, 0) };
}
export const defaultTheme = { template: 'market', accent: '#246b50', title: 'Everyday things. Thoughtfully made.', subtitle: 'Discover useful, beautiful essentials from independent makers.', announcement: 'Made with care. Delivered across India.' };
export const PLANS = [
  { id: 'launch', name: 'Launch', price: 999, products: 500, staff: 2, locations: 1 },
  { id: 'growth', name: 'Growth', price: 2499, products: 5000, staff: 5, locations: 3 },
  { id: 'scale', name: 'Scale', price: 6999, products: 25000, staff: 15, locations: 10 },
];
export const PLUGINS = [
  { id: 'stock-watch', name: 'Stock watch', category: 'Operations', description: 'Creates a review task when an order leaves a product at five units or fewer.', scopes: ['inventory:read', 'tasks:write'], version: '1.0.0' },
  { id: 'packing-note', name: 'Packing notes', category: 'Fulfilment', description: 'Adds a packing reminder after checkout. No external messages are sent.', scopes: ['orders:read', 'tasks:write'], version: '1.0.0' },
  { id: 'cod-guard', name: 'COD guard', category: 'Checkout', description: 'Limits cash-on-delivery orders to ₹10,000, checked on the server.', scopes: ['checkout:validate'], version: '1.0.0' },
];
export const APP_SCOPES = ['catalog:read', 'orders:read'];
export const PERMISSIONS = {
  owner: ['catalog', 'orders', 'themes', 'apps', 'support', 'settings', 'access', 'export'],
  admin: ['catalog', 'orders', 'themes', 'apps', 'support', 'export'],
  staff: ['catalog', 'orders', 'support'], collaborator: ['catalog', 'themes', 'support'], viewer: [],
};
export const can = (role, permission) => Boolean(PERMISSIONS[role]?.includes(permission));
export function signEvent(payload, signingSecret) {
  fail(typeof signingSecret === 'string' && signingSecret.length >= 32, 400, 'Signing secret is too short');
  return createHmac('sha256', signingSecret).update(payload).digest('hex');
}
export function verifyEvent(payload, signature, signingSecret) {
  if (typeof signature !== 'string' || !/^[a-f0-9]{64}$/.test(signature)) return false;
  return timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(signEvent(payload, signingSecret), 'hex'));
}
export const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function validateJavaScriptPackage(input) {
  fail(input&&typeof input==='object'&&!Array.isArray(input),400,'A JavaScript file map is required');
  const entries=Object.entries(input);fail(entries.length>=1&&entries.length<=10,400,'A theme can contain 1–10 JavaScript files');
  const files=Object.create(null);let total=0;
  for(const [name,source]of entries) {
    fail(/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,60}\.(?:js|mjs)$/.test(name),400,'Use simple .js or .mjs filenames without directories');
    text(source,name,50000,1);files[name]=source;total+=source.length;
  }
  fail(total<=100000,400,'Theme package exceeds 100 KB');fail(Object.hasOwn(files,'index.js'),400,'Theme needs index.js');
  return files;
}
