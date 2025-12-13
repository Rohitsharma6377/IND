# 📱 Mobile Application Development with INDJS

Build native iOS and Android apps from your INDJS web application using Capacitor.

## 🚀 Quick Start

### 1. Create Mobile-Ready App

```bash
# Create new app with mobile template
indjs create my-mobile-app --template mobile

# Or add mobile to existing app
cd my-existing-app
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init
```

### 2. Configure Capacitor

```bash
# Initialize Capacitor
npx cap init "My App Name" "com.mycompany.myapp"

# Add platforms
npx cap add ios
npx cap add android
```

### 3. Build and Sync

```bash
# Build web app
indjs build

# Sync to mobile platforms
indjs mobile sync

# Or use combined command
indjs mobile build
```

### 4. Open in IDE

```bash
# Open iOS in Xcode (macOS only)
indjs mobile ios

# Open Android in Android Studio
indjs mobile android
```

---

## 📦 Installation

### Prerequisites

#### For iOS Development (macOS only):
- Xcode 14+ from Mac App Store
- Xcode Command Line Tools: `xcode-select --install`
- CocoaPods: `sudo gem install cocoapods`

#### For Android Development:
- [Android Studio](https://developer.android.com/studio)
- Android SDK (API 22+)
- Java Development Kit (JDK) 11+

#### For Both:
- Node.js 16+
- INDJS framework: `npm install -g indjs`

---

## 🛠️ Setup Guide

### Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

### Step 2: Initialize Capacitor

```bash
npx cap init
```

You'll be prompted for:
- **App name**: Display name (e.g., "My Awesome App")
- **App ID**: Reverse domain (e.g., "com.mycompany.myapp")
- **Web directory**: `.indjs/static` (INDJS build output)

Or non-interactive:
```bash
npx cap init "My App" "com.mycompany.myapp" --web-dir=.indjs/static
```

### Step 3: Configure capacitor.config.json

```json
{
  "appId": "com.mycompany.myapp",
  "appName": "My App",
  "webDir": ".indjs/static",
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#4F46E5",
      "showSpinner": true,
      "spinnerColor": "#FFFFFF"
    }
  }
}
```

### Step 4: Add Platforms

```bash
# Add iOS (macOS only)
npx cap add ios

# Add Android
npx cap add android
```

---

## 🔧 Development Workflow

### Build and Sync

```bash
# 1. Build web app
indjs build

# 2. Copy web assets to native projects
npx cap copy

# 3. Update native dependencies
npx cap sync

# Or use INDJS shortcut
indjs mobile build  # Does all above
```

### Live Reload (Development)

```bash
# Terminal 1: Start dev server
indjs dev

# Terminal 2: Update capacitor.config.json
{
  "server": {
    "url": "http://192.168.1.100:3000",
    "cleartext": true
  }
}

# Terminal 2: Sync and open
npx cap sync
npx cap open android  # or ios
```

**Note**: Replace `192.168.1.100` with your computer's local IP address.

### Production Build

```bash
# Build for production
indjs build

# Sync to native
indjs mobile sync

# Open in IDE
indjs mobile android  # or ios
```

---

## 📱 Platform-Specific Configuration

### iOS Configuration

#### 1. Update Info.plist

Location: `ios/App/App/Info.plist`

```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to take photos</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>We need photo library access to select images</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>We need location access for features</string>
```

#### 2. Configure App Icons

Place icons in: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

Sizes needed:
- 20x20, 29x29, 40x40, 60x60, 76x76, 83.5x83.5, 1024x1024

#### 3. Configure Splash Screen

Location: `ios/App/App/Assets.xcassets/Splash.imageset/`

#### 4. Build in Xcode

```bash
# Open project
npx cap open ios

# In Xcode:
# 1. Select your team in Signing & Capabilities
# 2. Choose target device/simulator
# 3. Click Run (⌘R)
```

### Android Configuration

#### 1. Update AndroidManifest.xml

Location: `android/app/src/main/AndroidManifest.xml`

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

#### 2. Configure App Icons

Place icons in: `android/app/src/main/res/`

Directories:
- `mipmap-mdpi` (48x48)
- `mipmap-hdpi` (72x72)
- `mipmap-xhdpi` (96x96)
- `mipmap-xxhdpi` (144x144)
- `mipmap-xxxhdpi` (192x192)

#### 3. Configure Splash Screen

Location: `android/app/src/main/res/drawable/splash.png`

#### 4. Build in Android Studio

```bash
# Open project
npx cap open android

# In Android Studio:
# 1. Wait for Gradle sync
# 2. Select device/emulator
# 3. Click Run (Shift+F10)
```

---

## 🔌 Native Plugins

### Core Plugins

```bash
# Install plugins
npm install @capacitor/camera
npm install @capacitor/filesystem
npm install @capacitor/geolocation
npm install @capacitor/push-notifications
npm install @capacitor/local-notifications
npm install @capacitor/share
npm install @capacitor/storage
npm install @capacitor/network
npm install @capacitor/device
npm install @capacitor/app
```

### Usage Examples

#### Camera

```javascript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  
  const imageUrl = image.webPath;
  // Use imageUrl in your app
};
```

#### Geolocation

```javascript
import { Geolocation } from '@capacitor/geolocation';

const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  console.log('Current position:', coordinates);
};
```

#### Push Notifications

```javascript
import { PushNotifications } from '@capacitor/push-notifications';

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
};

PushNotifications.addListener('registration', (token) => {
  console.log('Push registration success, token: ' + token.value);
});

PushNotifications.addListener('pushNotificationReceived', (notification) => {
  console.log('Push received: ' + JSON.stringify(notification));
});
```

#### Storage

```javascript
import { Preferences } from '@capacitor/preferences';

// Set
await Preferences.set({
  key: 'name',
  value: 'John Doe',
});

// Get
const { value } = await Preferences.get({ key: 'name' });

// Remove
await Preferences.remove({ key: 'name' });
```

---

## 🎨 Mobile-Optimized UI

### Responsive Design

```jsx
// components/MobileLayout.jsx
import React from 'react';

export default function MobileLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 safe-area-inset">
      {/* Status bar spacer */}
      <div className="h-safe-top bg-blue-600"></div>
      
      {/* Content */}
      <main className="pb-safe-bottom">
        {children}
      </main>
      
      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t pb-safe-bottom">
        {/* Navigation items */}
      </nav>
    </div>
  );
}
```

### Safe Area Insets

Add to `styles/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .safe-area-inset {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
  
  .h-safe-top {
    height: env(safe-area-inset-top);
  }
  
  .pb-safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

### Platform Detection

```javascript
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform(); // 'ios', 'android', or 'web'

if (platform === 'ios') {
  // iOS-specific code
} else if (platform === 'android') {
  // Android-specific code
} else {
  // Web-specific code
}
```

---

## 🚀 Deployment

### iOS App Store

#### 1. Prepare for Release

```bash
# Build production web app
indjs build --baseUrl https://yourapp.com

# Sync to iOS
npx cap sync ios

# Open in Xcode
npx cap open ios
```

#### 2. Configure in Xcode

- Set version and build number
- Configure signing with your Apple Developer account
- Select "Any iOS Device (arm64)" as target
- Product → Archive

#### 3. Upload to App Store Connect

- Window → Organizer
- Select archive → Distribute App
- Follow wizard to upload

### Google Play Store

#### 1. Prepare for Release

```bash
# Build production web app
indjs build --baseUrl https://yourapp.com

# Sync to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

#### 2. Generate Signed APK/Bundle

In Android Studio:
- Build → Generate Signed Bundle / APK
- Create new keystore or use existing
- Select release build variant
- Generate AAB (recommended) or APK

#### 3. Upload to Play Console

- Go to Google Play Console
- Create new app or select existing
- Upload AAB to Production/Testing track
- Fill in store listing details
- Submit for review

---

## 🔧 Troubleshooting

### Common Issues

#### Build Errors

```bash
# Clean and rebuild
rm -rf node_modules package-lock.json
npm install
indjs build
npx cap sync
```

#### iOS Pod Install Fails

```bash
cd ios/App
pod repo update
pod install
cd ../..
```

#### Android Gradle Errors

```bash
cd android
./gradlew clean
cd ..
npx cap sync android
```

#### Live Reload Not Working

1. Check firewall settings
2. Ensure device and computer on same network
3. Use computer's IP address, not localhost
4. Enable cleartext traffic in capacitor.config.json

---

## 📚 Best Practices

### 1. Handle Platform Differences

```javascript
import { Capacitor } from '@capacitor/core';

const openUrl = (url) => {
  if (Capacitor.isNativePlatform()) {
    // Use in-app browser
    Browser.open({ url });
  } else {
    // Use regular link
    window.open(url, '_blank');
  }
};
```

### 2. Optimize Images

```javascript
// Use responsive images
<img 
  src="/images/hero.jpg"
  srcSet="/images/hero-sm.jpg 640w, /images/hero-md.jpg 1024w"
  alt="Hero"
/>
```

### 3. Handle Network Status

```javascript
import { Network } from '@capacitor/network';

Network.addListener('networkStatusChange', status => {
  console.log('Network status changed', status);
  if (!status.connected) {
    // Show offline message
  }
});
```

### 4. Use Native Navigation

```javascript
import { App } from '@capacitor/app';

App.addListener('backButton', ({ canGoBack }) => {
  if (!canGoBack) {
    App.exitApp();
  } else {
    window.history.back();
  }
});
```

---

## 📖 Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://material.io/design)
- [INDJS Documentation](https://netcurion.vercel.app)

---

## 🎯 Quick Commands Reference

```bash
# Create mobile app
indjs create my-app --template mobile

# Build and sync
indjs mobile build

# Sync only
indjs mobile sync

# Open iOS
indjs mobile ios

# Open Android
indjs mobile android

# Live reload setup
indjs dev
# Update capacitor.config.json with server.url
npx cap sync
```

---

**Need Help?** Open an issue on [GitHub](https://github.com/Rohitsharma6377/IND/issues)

**Made with ❤️ by the INDJS Team**
