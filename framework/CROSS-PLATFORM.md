# 🚀 INDJS - The Ultimate Cross-Platform Framework

## One Codebase, All Platforms! 🌍

Write your app **ONCE** in React, deploy **EVERYWHERE**:

- ✅ **Web** (Browser)
- ✅ **Mobile** (iOS + Android via Capacitor)
- ✅ **Desktop** (Windows + Mac + Linux via Electron)
- ✅ **PWA** (Progressive Web App)

**Better than Flutter + Next.js + Electron COMBINED!**

---

## 🎯 Quick Start - Create Universal App

```bash
# Install INDJS
npm install -g indjs

# Create universal app (Web + Mobile + Desktop)
indjs create my-universal-app --template universal

# Navigate to project
cd my-universal-app

# Install dependencies
npm install

# Run on different platforms
npm run dev              # Web (localhost:3000)
npm run desktop          # Desktop app (Electron)
npm run mobile:android   # Android app
npm run mobile:ios       # iOS app (macOS only)
```

**ONE codebase = ALL platforms! 🎉**

---

## 📦 What You Get

### **Single React Codebase**
```
my-app/
├── pages/              # Your React pages (shared across all platforms)
│   ├── index.jsx      # Home page
│   ├── about.jsx      # About page
│   └── api/           # API routes
├── components/        # Shared components
├── styles/           # Shared styles
└── platform/         # Platform-specific code (optional)
    ├── web/
    ├── mobile/
    └── desktop/
```

### **Deploy Everywhere**
```bash
# Web
npm run build          # → Deploy to Vercel/Netlify

# Desktop
npm run build:desktop  # → .exe, .dmg, .AppImage

# Mobile
npm run build:mobile   # → .apk, .ipa
```

---

## 🌐 Platform Support

| Platform | Technology | Output | Status |
|----------|-----------|--------|--------|
| **Web** | React + SSR | Static/Dynamic site | ✅ |
| **iOS** | Capacitor | Native iOS app | ✅ |
| **Android** | Capacitor | Native Android app | ✅ |
| **Windows** | Electron | .exe installer | ✅ |
| **macOS** | Electron | .dmg installer | ✅ |
| **Linux** | Electron | .AppImage/.deb | ✅ |
| **PWA** | Service Worker | Installable web app | ✅ |

---

## 🚀 Complete Setup Guide

### 1. Create Universal App

```bash
indjs create my-app --template universal
cd my-app
npm install
```

### 2. Development

#### Web Development
```bash
npm run dev
# Opens http://localhost:3000
```

#### Desktop Development
```bash
npm run desktop:dev
# Opens Electron window with hot reload
```

#### Mobile Development
```bash
# Add platforms first
npx cap add ios
npx cap add android

# Development with live reload
npm run dev
# Update capacitor.config.json with your IP
npm run mobile:sync
npm run mobile:run:android  # or :ios
```

### 3. Production Build

```bash
# Build all platforms
npm run build:all

# Or build individually
npm run build              # Web
npm run build:desktop      # Desktop (all OS)
npm run build:mobile       # Mobile (iOS + Android)
```

---

## 💻 Desktop App (Electron)

### Features
- ✅ Native Windows, Mac, Linux apps
- ✅ Auto-updates
- ✅ System tray integration
- ✅ Native menus
- ✅ File system access
- ✅ Native notifications
- ✅ Offline support

### Commands
```bash
# Development
npm run desktop:dev

# Build for current OS
npm run build:desktop

# Build for all OS
npm run build:desktop:all

# Build for specific OS
npm run build:desktop:windows
npm run build:desktop:mac
npm run build:desktop:linux
```

### Platform-Specific Code
```javascript
import { isElectron } from 'indjs/platform';

if (isElectron()) {
  // Desktop-specific code
  const { ipcRenderer } = window.require('electron');
  ipcRenderer.send('minimize-window');
}
```

---

## 📱 Mobile App (Capacitor)

### Features
- ✅ Native iOS and Android apps
- ✅ Camera, GPS, Contacts access
- ✅ Push notifications
- ✅ Biometric authentication
- ✅ In-app purchases
- ✅ App Store ready
- ✅ Play Store ready

### Commands
```bash
# Add platforms
npx cap add ios
npx cap add android

# Development
npm run mobile:dev

# Build
npm run build:mobile

# Open in IDE
npm run mobile:ios       # Xcode
npm run mobile:android   # Android Studio

# Run on device
npm run mobile:run:ios
npm run mobile:run:android
```

### Platform-Specific Code
```javascript
import { Capacitor } from '@capacitor/core';
import { Camera } from '@capacitor/camera';

if (Capacitor.isNativePlatform()) {
  // Mobile-specific code
  const photo = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
}
```

---

## 🌍 Web App (SSR/SSG)

### Features
- ✅ Server-Side Rendering
- ✅ Static Site Generation
- ✅ API Routes
- ✅ SEO optimized
- ✅ PWA support
- ✅ Fast page loads

### Commands
```bash
# Development
npm run dev

# Build
npm run build

# Production server
npm run start

# Static export
npm run build --static
```

---

## 🎨 Shared Components

Write components **ONCE**, use **EVERYWHERE**:

```jsx
// components/Button.jsx
import React from 'react';
import { getPlatform } from 'indjs/platform';

export default function Button({ children, onClick }) {
  const platform = getPlatform(); // 'web', 'mobile', 'desktop'
  
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded
        ${platform === 'mobile' ? 'text-lg' : 'text-base'}
        ${platform === 'desktop' ? 'hover:shadow-lg' : ''}
      `}
    >
      {children}
    </button>
  );
}
```

Use in **any platform**:
```jsx
// pages/index.jsx
import Button from '../components/Button';

export default function Home() {
  return (
    <div>
      <h1>Works on Web, Mobile, and Desktop!</h1>
      <Button onClick={() => alert('Hello!')}>
        Click Me
      </Button>
    </div>
  );
}
```

---

## 🔧 Platform Detection

```javascript
import { 
  isWeb, 
  isMobile, 
  isDesktop, 
  isIOS, 
  isAndroid, 
  isElectron,
  getPlatform 
} from 'indjs/platform';

// Check platform
if (isWeb()) {
  // Web-specific code
}

if (isMobile()) {
  // Mobile-specific code (iOS or Android)
}

if (isDesktop()) {
  // Desktop-specific code (Electron)
}

if (isIOS()) {
  // iOS-specific code
}

if (isAndroid()) {
  // Android-specific code
}

// Get platform name
const platform = getPlatform(); // 'web', 'ios', 'android', 'electron'
```

---

## 📦 Native Features

### Desktop (Electron)

```javascript
import { electron } from 'indjs/desktop';

// File system
const files = await electron.dialog.showOpenDialog({
  properties: ['openFile', 'multiSelections']
});

// System tray
electron.tray.create({
  icon: '/icon.png',
  tooltip: 'My App'
});

// Auto-updates
electron.autoUpdater.checkForUpdates();

// Native menus
electron.menu.setApplicationMenu([
  { label: 'File', submenu: [...] },
  { label: 'Edit', submenu: [...] }
]);
```

### Mobile (Capacitor)

```javascript
import { mobile } from 'indjs/mobile';

// Camera
const photo = await mobile.camera.getPhoto();

// Geolocation
const position = await mobile.geolocation.getCurrentPosition();

// Push notifications
await mobile.pushNotifications.register();

// Biometric auth
const result = await mobile.biometric.authenticate();

// Contacts
const contacts = await mobile.contacts.getContacts();
```

---

## 🚀 Deployment

### Web Deployment

```bash
# Vercel
indjs deploy vercel

# Netlify
indjs deploy netlify

# Static hosting
npm run build --static
# Upload .indjs/static/ to any host
```

### Desktop Deployment

```bash
# Build installers
npm run build:desktop:all

# Output:
# dist/MyApp-1.0.0.exe        (Windows)
# dist/MyApp-1.0.0.dmg        (macOS)
# dist/MyApp-1.0.0.AppImage   (Linux)

# Auto-update server (optional)
indjs deploy desktop --auto-update
```

### Mobile Deployment

```bash
# iOS App Store
npm run build:mobile:ios
# Open in Xcode → Archive → Upload

# Google Play Store
npm run build:mobile:android
# Generate signed bundle → Upload to Play Console
```

---

## 📊 Comparison

| Feature | INDJS | Flutter | Next.js | Electron |
|---------|-------|---------|---------|----------|
| **Web** | ✅ | ❌ | ✅ | ❌ |
| **Mobile** | ✅ | ✅ | ❌ | ❌ |
| **Desktop** | ✅ | ✅ | ❌ | ✅ |
| **Language** | JavaScript/React | Dart | JavaScript/React | JavaScript |
| **One Codebase** | ✅ | ✅ | ❌ | ❌ |
| **SSR/SSG** | ✅ | ❌ | ✅ | ❌ |
| **Native Performance** | ⚡⚡ | ⚡⚡⚡ | ⚡⚡⚡ | ⚡ |
| **Learning Curve** | Easy | Hard | Easy | Medium |
| **Community** | Growing | Large | Huge | Large |

**INDJS = Best of all worlds!**

---

## 🎯 Real-World Examples

### Example 1: Todo App (All Platforms)

```jsx
// pages/index.jsx
import { useState, useEffect } from 'react';
import { getPlatform, mobile, electron } from 'indjs/platform';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const platform = getPlatform();

  // Load todos (platform-specific storage)
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    if (platform === 'mobile') {
      const { value } = await mobile.storage.get({ key: 'todos' });
      setTodos(JSON.parse(value || '[]'));
    } else if (platform === 'electron') {
      const data = await electron.store.get('todos');
      setTodos(data || []);
    } else {
      const data = localStorage.getItem('todos');
      setTodos(JSON.parse(data || '[]'));
    }
  };

  const saveTodos = async (newTodos) => {
    setTodos(newTodos);
    
    if (platform === 'mobile') {
      await mobile.storage.set({
        key: 'todos',
        value: JSON.stringify(newTodos)
      });
    } else if (platform === 'electron') {
      await electron.store.set('todos', newTodos);
    } else {
      localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  };

  return (
    <div className="p-4">
      <h1>Todo App - Running on {platform}</h1>
      {/* Todo UI */}
    </div>
  );
}
```

### Example 2: Camera App (Mobile + Desktop)

```jsx
// pages/camera.jsx
import { useState } from 'react';
import { isMobile, isDesktop, mobile } from 'indjs/platform';

export default function CameraApp() {
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    if (isMobile()) {
      // Use native camera
      const image = await mobile.camera.getPhoto({
        quality: 90,
        allowEditing: true
      });
      setPhoto(image.webPath);
    } else if (isDesktop()) {
      // Use webcam (web API)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Capture photo from stream
    } else {
      // Web fallback
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.click();
    }
  };

  return (
    <div>
      <button onClick={takePhoto}>Take Photo</button>
      {photo && <img src={photo} alt="Captured" />}
    </div>
  );
}
```

---

## 🔥 Advanced Features

### Hot Code Push (Mobile)

```bash
# Update mobile app without app store
npm run mobile:update
```

### Auto-Updates (Desktop)

```javascript
// Automatic updates for desktop app
import { electron } from 'indjs/desktop';

electron.autoUpdater.on('update-available', () => {
  console.log('Update available!');
});

electron.autoUpdater.checkForUpdates();
```

### Offline Support (All Platforms)

```javascript
// Service worker for offline support
// Automatically generated by INDJS
```

---

## 📚 Documentation

- [Web Development](./docs/web.md)
- [Mobile Development](./MOBILE-DEVELOPMENT.md)
- [Desktop Development](./docs/desktop.md)
- [Platform Detection](./docs/platform.md)
- [Deployment Guide](./docs/deployment.md)

---

## 🎉 Get Started Now!

```bash
# Install INDJS
npm install -g indjs

# Create universal app
indjs create my-app --template universal

# Start developing
cd my-app
npm install
npm run dev              # Web
npm run desktop:dev      # Desktop
npm run mobile:dev       # Mobile
```

**One codebase. All platforms. Infinite possibilities! 🚀**

---

<div align="center">

**Made with ❤️ by the INDJS Team**

[NPM](https://www.npmjs.com/package/indjs) • [GitHub](https://github.com/Rohitsharma6377/IND) • [Docs](https://netcurion.vercel.app)

</div>
