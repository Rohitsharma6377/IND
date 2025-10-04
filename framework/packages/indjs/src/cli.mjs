import { dev } from './dev.mjs';
import { start } from './start.mjs';
import { build } from './build.mjs';
import { create } from './commands/create.mjs';
import { generate } from './commands/generate.mjs';
import { deploy } from './commands/deploy.mjs';
import { test } from './commands/test.mjs';
import chalk from 'chalk';
import { Command } from 'commander';

const program = new Command();

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
  console.log('  help      Show this help message\n');
  console.log('Options:');
  console.log('  --root <path>     Specify the root directory');
  console.log('  --port <number>   Specify the port number');
  console.log('  --baseUrl <url>   Specify the base URL for production');
  console.log('  --help            Show help for specific command\n');
  console.log('Examples:');
  console.log('  indjs dev --port 4000');
  console.log('  indjs create my-app');
  console.log('  indjs generate page about');
  console.log('  indjs build --baseUrl https://myapp.com');
  console.log('  indjs deploy vercel\n');
}

export async function run() {
  const args = parseArgs(process.argv);
  const cmd = args._[0] || 'dev';
  const { default: path } = await import('path');
  const root = args.root ? path.resolve(args.root) : process.cwd();
  const port = parseInt(args.port || process.env.PORT || '3000', 10);
  const baseUrl = args.baseUrl || process.env.BASE_URL;

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
        return build({ root, baseUrl });
      
      case 'create':
        const appName = args._[1];
        if (!appName) {
          console.error(chalk.red('❌ Please specify an application name'));
          console.log('Usage: indjs create <app-name>');
          process.exit(1);
        }
        return create({ name: appName, template: args.template });
      
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
        return generate({ type, name, root });
      
      case 'deploy':
        const platform = args._[1] || 'vercel';
        return deploy({ platform, root });
      
      case 'test':
        return test({ root, watch: args.watch });
      
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
