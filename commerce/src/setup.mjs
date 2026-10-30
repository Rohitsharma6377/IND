import { Commerce } from './commerce.mjs';
import { resolve } from 'node:path';
const args = Object.fromEntries(process.argv.slice(2).map(arg => { const n=arg.indexOf('='); return [arg.slice(0,n),arg.slice(n+1)]; }));
if (!args['--email'] || !process.env.COMMERCE_SETUP_PASSWORD) {
  console.error('Set COMMERCE_SETUP_PASSWORD (12+ characters), then run npm run setup -- --email=you@example.com --name=Your-name --slug=your-store [--kind=merchant|partner|support]');
  process.exitCode = 1;
} else {
  const c = new Commerce(resolve(process.env.COMMERCE_DB || 'data/commerce.db'));
  try {
    c.tx(() => {
      const user = c.user({ email:args['--email'],name:args['--name'] || 'Store owner',kind:args['--kind'] || 'merchant',password:process.env.COMMERCE_SETUP_PASSWORD });
      if (user.kind === 'merchant' && args['--slug']) c.newStore(user, { name:args['--store'] || 'My store',slug:args['--slug'] });
    });
    console.log('Account created. Sign in at the local server. No payment or courier account was provisioned.');
  } catch(e) { console.error(e.status ? e.message : 'Setup failed. Check for an existing email or store address.'); process.exitCode=1; }
  finally { c.close(); }
}
