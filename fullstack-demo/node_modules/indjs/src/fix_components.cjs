const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:/Users/ASUS/Desktop/project/IND/framework/packages/indjs/src/components');
const files = fs.readdirSync(componentsDir);

files.forEach(file => {
    if (file.endsWith('.mjs') && file !== 'index.mjs') {
        const oldPath = path.join(componentsDir, file);
        const newPath = path.join(componentsDir, file.replace('.mjs', '.jsx'));
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed ${file} -> ${path.basename(newPath)}`);
    }
});

// Update index.mjs
const indexPath = path.join(componentsDir, 'index.mjs');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace .mjs imports with .jsx, but ONLY for the files we renamed
// Generally imports look like: export { View } from './view.mjs';
indexContent = indexContent.replace(/from '\.\/(.*)\.mjs'/g, "from './$1.jsx'");

fs.writeFileSync(indexPath, indexContent);
console.log('Updated components/index.mjs imports.');
