const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🤖 Setting up Android environment...');

try {
  if (!fs.existsSync(path.join(__dirname, '../android'))) {
    console.log('📦 Adding Android platform...');
    execSync('npx cap add android', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  }

  // Java 17 Patch logic
  const buildGradlePath = path.join(__dirname, '../android/app/build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    let content = fs.readFileSync(buildGradlePath, 'utf8');
    if (!content.includes('JavaVersion.VERSION_17')) {
       content = content.replace(/JavaVersion.VERSION_1_8/g, 'JavaVersion.VERSION_17');
       fs.writeFileSync(buildGradlePath, content);
       console.log('✅ Patched build.gradle for Java 17');
    }
  }

  console.log('✅ Android setup complete! Run "npm run android:dev" to start.');
} catch (e) {
  console.error('❌ Setup failed:', e.message);
  process.exit(1);
}
