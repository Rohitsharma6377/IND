import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 1. Run npx cap init & add android
console.log('📱 Initializing Capacitor...');
try {
    execSync('npx cap init "My Life Manager" "com.indjs.lifemanager" --web-dir=.indjs/static', { stdio: 'inherit' });
} catch (e) { } // ignore if already init

try {
    console.log('📱 Adding Android platform...');
    // Force install @capacitor/android if missing
    execSync('npm install @capacitor/android', { stdio: 'inherit' });
    execSync('npx cap add android', { stdio: 'inherit' });
} catch (e) {
    console.log('⚠️ Android platform issue or already exists.');
}

// 1.5 Create local.properties if missing (Crucial for building without Android Studio open)
// We try to detect standard locations or use the one we found earlier
const sdkPath = 'C:\\Users\\ASUS\\AppData\\Local\\Android\\Sdk';
const localProp = path.join('android', 'local.properties');
if (!fs.existsSync(localProp)) {
    console.log('📝 Creating local.properties...');
    fs.writeFileSync(localProp, `sdk.dir=${sdkPath.replace(/\\/g, '\\\\')}`);
}

// 2. Patch build.gradle to force Java 17 (Fixes "invalid source release: 21" on older JDKs)
const rootBuildGradle = path.join('android', 'build.gradle');
if (fs.existsSync(rootBuildGradle)) {
    let content = fs.readFileSync(rootBuildGradle, 'utf8');
    if (!content.includes('JavaVersion.VERSION_17')) {
        console.log('🔧 Patching android/build.gradle framework versions...');
        const patch = `
allprojects {
    repositories {
        google()
        mavenCentral()
    }
    tasks.withType(JavaCompile).configureEach {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
`;
        if (content.includes('allprojects {')) {
            content = content.replace(/allprojects\s*{[^}]*}/, patch);
        } else {
            content += patch;
        }
        fs.writeFileSync(rootBuildGradle, content);
        console.log('✅ Root build.gradle patched.');
    }
}

// 3. Patch app/build.gradle
const appBuildGradle = path.join('android', 'app', 'build.gradle');
if (fs.existsSync(appBuildGradle)) {
    let content = fs.readFileSync(appBuildGradle, 'utf8');
    if (!content.includes('sourceCompatibility JavaVersion.VERSION_17')) {
        console.log('🔧 Patching android/app/build.gradle...');
        const patch = `
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
`;
        if (content.includes('compileOptions {')) {
            content = content.replace(/compileOptions\s*{[^}]*}/, patch);
        } else if (content.includes('buildTypes {')) {
            // Insert before buildTypes
            content = content.replace('buildTypes {', patch + '\n    buildTypes {');
        } else {
            // Fallback: insert inside android {
            content = content.replace('android {', 'android {\n' + patch);
        }
        fs.writeFileSync(appBuildGradle, content);
        console.log('✅ App build.gradle patched.');
    }
}

console.log('\n🎉 Android Setup Complete! Run "npm run android:dev" to start.');
