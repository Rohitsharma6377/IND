const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🤖 Setting up Android environment...');

try {
  // 1. Initialize capacitor if not done (usually done by create-indjs, but safe to retry)
  // We assume 'npx cap init' was run or config exists.
  
  // 2. Add android platform if missing
  if (!fs.existsSync(path.join(__dirname, '../android'))) {
    console.log('📦 Adding Android platform...');
    execSync('npx cap add android', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  }

  // 3. Patch build.gradle for Java 17
  const buildGradlePath = path.join(__dirname, '../android/app/build.gradle');
  if (fs.existsSync(buildGradlePath)) {
    console.log('🔧 Patching build.gradle for Java 17...');
    let content = fs.readFileSync(buildGradlePath, 'utf8');
    
    if (!content.includes('sourceCompatibility JavaVersion.VERSION_17')) {
      content = content.replace(
        /sourceCompatibility JavaVersion.VERSION_1_8/g,
        'sourceCompatibility JavaVersion.VERSION_17'
      ).replace(
        /targetCompatibility JavaVersion.VERSION_1_8/g,
        'targetCompatibility JavaVersion.VERSION_17'
      );
      
      // If it wasn't valid 1_8, try to find the block and force it
      if (!content.includes('JavaVersion.VERSION_17')) {
         // Fallback replacement if 1_8 regex didn't match
         content = content.replace(/compileOptions \{([\s\S]*?)\}/, 
           'compileOptions {\n        sourceCompatibility JavaVersion.VERSION_17\n        targetCompatibility JavaVersion.VERSION_17\n    }');
      }
      
      fs.writeFileSync(buildGradlePath, content, 'utf8');
      console.log('✅ build.gradle patched.');
    } else {
      console.log('✨ build.gradle already uses Java 17');
    }
  }

  // 4. Update variables.gradle to ensure compatibility
  const varGradlePath = path.join(__dirname, '../android/variables.gradle');
  if (fs.existsSync(varGradlePath)) {
     // Ensure minSdk is high enough if needed, currently 22 is default in Cap 5/6
  }

  console.log('✅ Android setup complete! Run "npm run android:dev" to start.');

} catch (e) {
  console.error('❌ Android setup failed:', e.message);
  process.exit(1);
}
