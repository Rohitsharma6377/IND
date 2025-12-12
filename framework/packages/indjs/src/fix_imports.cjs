const fs = require('fs');
const path = require('path');

const indjsDir = path.join('c:/Users/ASUS/Desktop/project/IND/framework/packages/indjs/src');
const filesToUpdate = ['index.mjs', 'index.web.mjs'];

filesToUpdate.forEach(file => {
    const filePath = path.join(indjsDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace .mjs imports for components with .jsx
        // Regex for: from './components/xyz.mjs' -> from './components/xyz.jsx'
        content = content.replace(/from '\.\/components\/(.*)\.mjs'/g, "from './components/$1.jsx'");

        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
});
