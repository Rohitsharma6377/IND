const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname);
const componentsDir = path.join(srcDir, 'components');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace component imports: from './view.mjs' -> from './view.jsx'
    content = content.replace(/from '\.\/(.*)\.mjs'/g, "from './$1.jsx'");

    // Replace other potential imports if needed, be careful not to break non-component imports
    // But given the error log, the issues are mostly sibling imports in components.

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated imports in: ${path.basename(filePath)}`);
    }
}

if (fs.existsSync(componentsDir)) {
    const files = fs.readdirSync(componentsDir);
    files.forEach(file => {
        if (file.endsWith('.jsx')) {
            replaceInFile(path.join(componentsDir, file));
        }
    });
}

console.log('Finished updating JSX imports.');
