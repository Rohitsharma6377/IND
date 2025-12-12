const fs = require('fs');
const path = require('path');

const componentsDir = path.join('c:/Users/ASUS/Desktop/project/IND/framework/packages/indjs/src/components');

try {
    const files = fs.readdirSync(componentsDir);

    files.forEach(file => {
        if (file.endsWith('.jsx')) {
            const filePath = path.join(componentsDir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Replace imports: from './something.mjs' -> from './something.jsx'
            // This regex captures the filename part
            const regex = /from '\.\/(.*)\.mjs'/g;

            if (regex.test(content)) {
                content = content.replace(regex, "from './$1.jsx'");
                fs.writeFileSync(filePath, content);
                console.log(`Fixed imports in ${file}`);
            }
        }
    });
    console.log('All internal component imports updated.');
} catch (error) {
    console.error('Error fixing imports:', error);
}
