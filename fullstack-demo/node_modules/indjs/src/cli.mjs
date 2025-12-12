import { dev } from './dev.mjs';
import { start } from './start.mjs';
import { build } from './build.mjs';
import { create } from './commands/create.mjs';
import { generate } from './commands/generate.mjs';
import { deploy } from './commands/deploy.mjs';
import { test } from './commands/test.mjs';
import chalk from 'chalk';
import { Command } from 'commander';
import { spawn } from 'child_process';
import http from 'http';
import os from 'os';
import fs from 'fs/promises';

const program = new Command();

async function loadPackageJson(root) {
  try {
    const { default: path } = await import('path');
    const content = await fs.readFile(path.join(root, 'package.json'), 'utf8');
    return JSON.parse(content);
  } catch { return {}; }
}

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      if (key.includes('=')) {
        const [k, v] = key.split('=');
        args[k] = v;
      } else {
        const next = argv[i + 1];
        if (next && !next.startsWith('--')) { args[key] = next; i++; }
        else { args[key] = true; }
      }
    } else {
      args._.push(a);
    }
  }
  return args;
}

function showHelp() {
  console.log(chalk.blue.bold('\n🚀 INDJS - Modern Full-Stack React Framework\n'));
  console.log('Usage: indjs <command> [options]\n');
  console.log('Commands:');
  console.log('  dev       Start development server with hot reload');
  console.log('  build     Build application for production');
  console.log('  start     Start production server');
  console.log('  create    Create a new INDJS application');
  console.log('  generate  Generate components, pages, or API routes');
  console.log('  deploy    Deploy application to various platforms');
  console.log('  test      Run tests');
  console.log('  desktop   Desktop helpers (Electron): dev, start');
  console.log('  mobile    Mobile helpers (Capacitor): dev, build, sync, android, ios');
  console.log('  ai        AI helpers: scaffold, docs, refactor');
  console.log('  help      Show this help message\n');
  console.log('Options:');
  console.log('  --root <path>     Specify the root directory');
  console.log('  --port <number>   Specify the port number');
  console.log('  --baseUrl <url>   Specify the base URL for production');
  console.log('  --webDir <path>   Optional output dir for built static assets (e.g. for Capacitor)');
  console.log('  --noPrompt        Skip interactive prompts in generators (use sensible defaults)');
  console.log('  --quick           Alias of --noPrompt');
  console.log('  --help            Show help for specific command\n');
  console.log('Examples:');
  console.log('  indjs dev --port 4000');
  console.log('  indjs create my-app');
  console.log('  indjs generate page about');
  console.log('  indjs g component Button --noPrompt');
  console.log('  indjs build --baseUrl https://myapp.com');
  console.log('  indjs deploy vercel\n');
}

async function tryOllama(prompt) {
  try {
    const model = process.env.OLLAMA_MODEL || 'llama3.1:8b';
    const payload = JSON.stringify({ model, prompt, stream: false });
    const options = {
      hostname: 'localhost',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 8000
    };
    const text = await new Promise((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const j = JSON.parse(data);
            if (j && typeof j.response === 'string') return resolve(j.response);
          } catch { }
          return resolve(null);
        });
      });
      req.on('error', () => resolve(null));
      req.on('timeout', () => { try { req.destroy(); } catch { }; resolve(null); });
      req.write(payload);
      req.end();
    });
    return text;
  } catch {
    return null;
  }
}

function runShell(command, { cwd }) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { shell: true, stdio: 'inherit', cwd });
    child.on('exit', (code) => {
      if (code === 0) resolve(); else reject(new Error(`Command failed with exit code ${code}`));
    });
    child.on('error', (err) => reject(err));
  });
}

export async function run() {
  const args = parseArgs(process.argv);
  const cmd = args._[0] || 'dev';
  const { default: path } = await import('path');
  const root = args.root ? path.resolve(args.root) : process.cwd();
  const port = parseInt(args.port || process.env.PORT || '3000', 10);
  const baseUrl = args.baseUrl || process.env.BASE_URL;
  const webDir = args.webDir || process.env.WEB_DIR;

  if (args.help || cmd === 'help') {
    showHelp();
    return;
  }

  try {
    switch (cmd) {
      case 'dev':
        console.log(chalk.blue('🚀 Starting development server...'));
        return dev({ root, port });

      case 'start':
        console.log(chalk.green('🌟 Starting production server...'));
        return start({ root, port });

      case 'build':
        console.log(chalk.yellow('🔨 Building application...'));
        return build({ root, baseUrl, webDir });

      case 'create':
        const appName = args._[1];
        if (!appName) {
          console.error(chalk.red('❌ Please specify an application name'));
          console.log('Usage: indjs create <app-name>');
          process.exit(1);
        }
        return create({
          name: appName,
          template: args.template,
          language: args.language,
          state: args.state,
          useTailwind: args.useTailwind
        });

      case 'generate':
      case 'g':
        const type = args._[1];
        const name = args._[2];
        if (!type || !name) {
          console.error(chalk.red('❌ Please specify type and name'));
          console.log('Usage: indjs generate <type> <name>');
          console.log('Types: page, component, api, layout');
          process.exit(1);
        }
        return generate({ type, name, root, noPrompt: !!(args.noPrompt || args.quick) });

      case 'deploy':
        const platform = args._[1] || 'vercel';
        return deploy({ platform, root });

      case 'test':
        return test({ root, watch: args.watch });

      case 'desktop': {
        const sub = args._[1] || 'dev';
        const dport = parseInt(args.port || process.env.PORT || '3005', 10);

        // Try to use project script first
        const pkg = await loadPackageJson(root);
        const scriptName = `desktop:${sub}`;
        if (pkg?.scripts?.[scriptName]) {
          console.log(chalk.blue(`📌 Running npm run ${scriptName}...`));
          return runShell(`npm run ${scriptName}`, { cwd: root });
        }

        if (!['dev', 'start'].includes(sub)) {
          console.error(chalk.red('❌ Usage: indjs desktop <dev|start> [--port <number>]'));
          process.exit(1);
        }
        const cmdStr = sub === 'dev'
          ? `npx cross-env PORT=${dport} concurrently -k "indjs dev --port %PORT%" "wait-on http://localhost:%PORT% && electron ."`
          : `npx cross-env PORT=${dport} concurrently -k "indjs start --port %PORT%" "electron ."`;
        return runShell(cmdStr, { cwd: root });
      }

      case 'mobile': {
        const sub = args._[1] || 'dev';

        // Try to use project script first
        const pkg = await loadPackageJson(root);
        // Map generic mobile commands to specific scripts if they exist
        const scriptMap = {
          'android': 'android:open',
          'ios': 'ios:open',
          'sync': 'mobile:sync',
          'build': 'mobile:build',
          'run': 'mobile:run',
          'dev': 'mobile:dev'
        };

        // If user runs "mobile dev", we provide the "Metro-like" experience
        if (sub === 'dev') {
          console.log(chalk.blue('📱 Starting Metro-like Dev Server...'));

          // 1. Detect LAN IP
          const ip = getLocalIP();
          const host = ip === 'localhost' ? '127.0.0.1' : ip;
          const port = args.port || process.env.PORT || '3000';
          const url = `http://${host}:${port}`;

          console.log(chalk.cyan(`   → Dev Server: ${url}`));

          // 2. Update capacitor.config.json temporarily
          const { default: path } = await import('path');
          const capConfigPath = path.join(root, 'capacitor.config.json');

          try {
            const capContent = await fs.readFile(capConfigPath, 'utf8');
            const capConfig = JSON.parse(capContent);

            // Allow user to skip config update if they know what they are doing
            if (!args.noConfig) {
              console.log(chalk.yellow('   → Updating capacitor.config.json server url...'));
              capConfig.server = { ...capConfig.server, url: url, cleartext: true };
              await fs.writeFile(capConfigPath, JSON.stringify(capConfig, null, 2));

              // Ensure android assets folder exists to avoid Capacitor sync error
              const androidAssets = path.join(root, 'android/app/src/main/assets');
              try { await fs.mkdir(androidAssets, { recursive: true }); } catch { }

              // 3. Sync config to native
              console.log(chalk.yellow('   → Syncing config to Android/iOS...'));
              await runShell('npx cap copy', { cwd: root });
            }
          } catch (e) {
            console.warn('   ⚠️ Could not automatically update capacitor config:', e.message);
          }

          // 4. Run Dev Server + Native Run
          const target = args._[2] || 'android'; // default to android

          console.log(chalk.green(`🚀 Launching ${target} app and Metro-like Dev Server...`));
          console.log(chalk.cyan('💡 To debug: Open chrome://inspect in your browser to inspect the WebView.'));

          // Use current CLI script path for recursive call
          const indjsBin = process.argv[1];

          // Spawn Dev Server
          const server = spawn(process.execPath, [indjsBin, 'dev', '--port', port], { stdio: 'inherit' });
          server.on('error', (err) => {
            console.error(chalk.red('❌ Failed to start dev server:'), err);
          });

          // Spawn Native Run (Capacitor)
          // We wait a bit for server to likely be up, or just let it race.
          // Native app will just show error until reloaded if server is slow.
          setTimeout(() => {
            const native = spawn('npx', ['cap', 'run', target], { stdio: 'inherit', shell: true });

            native.on('exit', (code) => {
              if (code !== 0) console.error(`Native run exited with code ${code}`);
              // Optional: kill server if native run exits? No, maybe user wants to keep server.
            });
          }, 3000); // 3s delay to give server a head start

          // Handle process exit to kill children
          process.on('SIGINT', () => {
            server.kill();
            process.exit();
          });

          return new Promise(() => { }); // Keep alive forever until Ctrl+C
        }

        const scriptName = scriptMap[sub] || `mobile:${sub}`;
        if (pkg?.scripts?.[scriptName]) {
          console.log(chalk.blue(`📌 Running npm run ${scriptName}...`));
          return runShell(`npm run ${scriptName}`, { cwd: root });
        }

        const map = {
          build: 'npx indjs build && npx cap copy',
          sync: 'npx cap sync',
          android: 'npx cap open android',
          ios: 'npx cap open ios'
        };
        const cmdStr = map[sub];
        if (!cmdStr) {
          console.error(chalk.red('❌ Usage: indjs mobile <dev|build|sync|android|ios>'));
          process.exit(1);
        }
        return runShell(cmdStr, { cwd: root });
      }

      case 'ai': {
        const sub = args._[1];
        if (!sub) {
          console.error(chalk.red('❌ Usage: indjs ai <scaffold|docs|refactor> ...'));
          process.exit(1);
        }
        if (sub === 'scaffold') {
          const type = args._[2];
          const name = args._[3];
          if (!type || !name) {
            console.error(chalk.red('❌ Usage: indjs ai scaffold <type> <name>'));
            console.log('Types: page, component, api');
            process.exit(1);
          }
          const prompt = `Generate a ${type} named ${name} for an INDJS app. Provide concise code only.`;
          const ai = await tryOllama(prompt);
          const { default: path } = await import('path');
          const fs = await import('fs/promises');
          const out = path.join(root, 'AI-OUTPUT.md');
          const header = `# AI Scaffold Preview\n\nRequest: ${type} ${name}\n\n`;
          await fs.writeFile(out, header + (ai || 'Local AI unavailable. Falling back to generator.'), 'utf8');
          console.log(chalk.green(`AI preview written to ${out}`));
          if (!ai) {
            console.log(chalk.blue(`Falling back to built-in generator: ${type} ${name}`));
            return generate({ type, name, root });
          }
          return;
        }
        if (sub === 'docs') {
          const prompt = 'Summarize an INDJS app structure with routes, APIs, and components.';
          const ai = await tryOllama(prompt);
          const { default: path } = await import('path');
          const fs = await import('fs/promises');
          const out = path.join(root, 'AI-DOCS.md');
          const now = new Date().toISOString();
          const body = `# AI Docs\n\nGenerated: ${now}\n\n${ai || '- Local AI unavailable. Add details here.'}\n`;
          await fs.writeFile(out, body, 'utf8');
          console.log(chalk.green(`Docs written to ${out}`));
          return;
        }
        if (sub === 'refactor') {
          const prompt = 'Give 5 concise refactor suggestions for a modern React full-stack app using SSR/ISR and API routes.';
          const ai = await tryOllama(prompt);
          console.log(chalk.blue('🤖 AI refactor suggestions:'));
          console.log(ai || '- Local AI unavailable. Suggestions: Enable TS strict; extract services; enable streaming; add tests; add metrics.');
          return;
        }
        console.error(chalk.red('❌ Unknown ai subcommand. Use: scaffold, docs, refactor'));
        process.exit(1);
      }

      default:
        console.error(chalk.red(`❌ Unknown command: ${cmd}`));
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('❌ Error:'), error.message);
    if (args.verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}
