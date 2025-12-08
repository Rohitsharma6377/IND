# INDJS Universal App

**One Codebase. All Platforms.**

Build Web + Mobile (iOS/Android) + Desktop (Windows/Mac/Linux) apps from a single React codebase!

## 🚀 Features

- ✅ **Web App** - SSR, SSG, PWA
- ✅ **iOS App** - Native iOS via Capacitor
- ✅ **Android App** - Native Android via Capacitor
- ✅ **Windows App** - Native Windows via Electron
- ✅ **macOS App** - Native macOS via Electron
- ✅ **Linux App** - Native Linux via Electron

**All from ONE React codebase!**

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Run on different platforms
npm run dev              # Web (http://localhost:3000)
npm run desktop:dev      # Desktop (Electron)
npm run mobile:android   # Android
npm run mobile:ios       # iOS (macOS only)
```

## 🛠️ Setup

### 1. Web Development (Default)

```bash
npm run dev
# Opens http://localhost:3000
```

### 2. Desktop Development (Electron)

```bash
# Development with hot reload
npm run desktop:dev

# Build for production
npm run desktop:build          # Current OS
npm run desktop:build:all      # All OS (Windows, Mac, Linux)
npm run desktop:build:windows  # Windows only
npm run desktop:build:mac      # macOS only
npm run desktop:build:linux    # Linux only
```

Output: `dist/` folder with installers

### 3. Mobile Development (Capacitor)

```bash
# First time setup
npm run mobile:add:ios      # macOS only
npm run mobile:add:android

# Development
npm run dev
# Update capacitor.config.json with your IP
npm run mobile:sync
npm run mobile:run:android  # or :ios

# Production
npm run mobile:build
npm run mobile:android      # Opens Android Studio
npm run mobile:ios          # Opens Xcode
```

## 📱 Platform Detection

```javascript
import { getPlatform, isWeb, isMobile, isDesktop } from './lib/platform';

const platform = getPlatform(); // 'web', 'ios', 'android', 'electron'

if (isWeb()) {
  // Web-specific code
}

if (isMobile()) {
  // Mobile-specific code
}

if (isDesktop()) {
  // Desktop-specific code
}
```

## 🎨 Platform-Specific Features

### Desktop (Electron)

```javascript
import { electron } from './lib/platform';

// File dialogs
const files = await electron.showOpenDialog({
  properties: ['openFile', 'multiSelections']
});

// Window controls
electron.minimizeWindow();
electron.maximizeWindow();
electron.closeWindow();
```

### Mobile (Capacitor)

```javascript
import { mobile } from './lib/platform';

// Camera
const Camera = await mobile.camera();
const photo = await Camera.getPhoto({
  quality: 90,
  allowEditing: true
});

// Geolocation
const Geolocation = await mobile.geolocation();
const position = await Geolocation.getCurrentPosition();

// Storage
const Storage = await mobile.storage();
await Storage.set({ key: 'name', value: 'John' });
const { value } = await Storage.get({ key: 'name' });
```

### Cross-Platform Storage

```javascript
import { storage } from './lib/platform';

// Works on all platforms
await storage.set('key', 'value');
const value = await storage.get('key');
await storage.remove('key');
await storage.clear();
```

## 🚀 Building for Production

### Build All Platforms

```bash
npm run build:all
```

This builds:
- Web app → `.indjs/static/`
- Desktop apps → `dist/` (Windows .exe, Mac .dmg, Linux .AppImage)
- Mobile apps → Ready for Xcode/Android Studio

### Individual Builds

```bash
# Web only
npm run build

# Desktop only
npm run desktop:build:all

# Mobile only
npm run mobile:build
```

## 📦 Deployment

### Web

```bash
# Deploy to Vercel
indjs deploy vercel

# Deploy to Netlify
indjs deploy netlify

# Static hosting
npm run build
# Upload .indjs/static/ to any host
```

### Desktop

```bash
# Build installers
npm run desktop:build:all

# Distribute:
# - dist/MyApp-1.0.0.exe (Windows)
# - dist/MyApp-1.0.0.dmg (macOS)
# - dist/MyApp-1.0.0.AppImage (Linux)
```

### Mobile

```bash
# iOS App Store
npm run mobile:build
npm run mobile:ios
# In Xcode: Archive → Upload to App Store Connect

# Google Play Store
npm run mobile:build
npm run mobile:android
# In Android Studio: Generate Signed Bundle → Upload to Play Console
```

## 📁 Project Structure

```
├── pages/              # React pages (shared across all platforms)
│   ├── index.jsx      # Home page
│   ├── about.jsx      # About page
│   └── api/           # API routes
├── components/        # Shared components
├── lib/
│   └── platform.js    # Platform detection utilities
├── electron/
│   └── main.cjs       # Electron main process
├── styles/            # Shared styles
├── capacitor.config.json  # Mobile configuration
└── package.json
```

## 🎯 Example: Todo App (All Platforms)

```jsx
// pages/index.jsx
import { useState, useEffect } from 'react';
import { getPlatform, storage } from '../lib/platform';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const platform = getPlatform();

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await storage.get('todos');
    setTodos(JSON.parse(data || '[]'));
  };

  const saveTodos = async (newTodos) => {
    setTodos(newTodos);
    await storage.set('todos', JSON.stringify(newTodos));
  };

  const addTodo = async (text) => {
    const newTodos = [...todos, { id: Date.now(), text, done: false }];
    await saveTodos(newTodos);
  };

  return (
    <div className="p-4">
      <h1>Todo App - Running on {platform}</h1>
      {/* Todo UI */}
    </div>
  );
}
```

This code works on **Web, iOS, Android, Windows, Mac, and Linux**!

## 🔧 Configuration

### Electron (Desktop)

Edit `electron/main.cjs` to customize:
- Window size and behavior
- Application menus
- System tray
- Auto-updates
- IPC handlers

### Capacitor (Mobile)

Edit `capacitor.config.json` to customize:
- App ID and name
- Splash screen
- Status bar
- Plugins

## 📚 Resources

- [INDJS Documentation](https://netcurion.vercel.app)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Cross-Platform Guide](../CROSS-PLATFORM.md)

## 🎉 Get Started

```bash
npm install
npm run dev              # Start web development
npm run desktop:dev      # Start desktop development
npm run mobile:android   # Start mobile development
```

**One codebase. Infinite possibilities! 🚀**

---

**Made with ❤️ using INDJS**
