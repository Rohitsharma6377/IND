const fs = require('fs');
const path = require('path');

function scanForInvalidImports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let problems = [];
  for (const entry of files) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      problems = problems.concat(scanForInvalidImports(full));
      continue;
    }
    if (!entry.name.endsWith('.jsx') && !entry.name.endsWith('.mjs') && !entry.name.endsWith('.js')) continue;

    const rel = full;
    const content = fs.readFileSync(full, 'utf8');

    // Only flag sibling .mjs imports (e.g., from './view.mjs') inside components/*.jsx
    // Allow legitimate non-sibling .mjs imports like ../apis/style-sheet.mjs
    if (full.includes(path.sep + 'components' + path.sep)) {
      const regex = /from '\.\/(.+?)\.mjs'/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        problems.push({ file: rel, import: m[0] });
      }
    }
  }
  return problems;
}

const srcDir = path.join(__dirname, '..', 'src');
const componentsDir = path.join(srcDir, 'components');

if (!fs.existsSync(componentsDir)) {
  console.log('[check-imports] components directory not found, skipping.');
  process.exit(0);
}

const problems = scanForInvalidImports(componentsDir);

if (problems.length > 0) {
  console.error('\n[ERROR] Invalid sibling .mjs imports found in components:');
  for (const p of problems) {
    console.error(` - ${p.file}: ${p.import}`);
  }
  console.error('\nFix: change imports to use .jsx, e.g., from "./view.jsx".');
  process.exit(1);
}

console.log('[check-imports] OK: no invalid sibling .mjs imports found in components.');
