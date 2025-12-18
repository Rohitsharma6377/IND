# 🚀 Universal Demo - INDJS Multi-Platform Application

A **universal application** built with INDJS that can run on **Web**, **Desktop** (Electron), and **Mobile** (iOS/Android via Capacitor).

## 📱 Platform Support

- ✅ **Web Application** - Modern web browsers
- ✅ **Desktop Application** - Windows, macOS, Linux (via Electron)
- ✅ **Mobile Application** - iOS and Android (via Capacitor)

---

## 🛠️ Prerequisites

Before running this project, ensure you have:

### All Platforms
- **Node.js** >= 16.0.0
- **npm** >= 8.0.0

### Desktop (Electron)
- All prerequisites above

### Mobile (Android)
- **Android Studio** with SDK installed
- **Java 17** (JDK 17)
- **Gradle** 8.x

### Mobile (iOS)
- **macOS** system
- **Xcode** 14 or higher
- **CocoaPods** installed

---

## 📦 Installation

First, install all dependencies:

```bash
# From the framework root
cd c:\Users\ASUS\Desktop\project\IND\framework

# Install all workspace dependencies
npm install

# Or install only for this app
npm install --workspace apps/universal-demo
```

---

## 🚀 Running the Application

### 1️⃣ Web Development Mode

Start the development server for web:

```bash
# From the universal-demo directory
cd apps/universal-demo
npm run dev

# Or from framework root
npm run dev --workspace apps/universal-demo
```

The app will be available at **http://localhost:3000**

### 2️⃣ Desktop Development Mode (Electron)

Run as an Electron desktop application:

```bash
cd apps/universal-demo
npm run desktop:dev
```

This will:
1. Start the web dev server on port 3000
2. Wait for the server to be ready
3. Launch the Electron window

### 3️⃣ Mobile Development Mode (Android)

#### Initial Setup

First, set up the Android environment:

```bash
cd apps/universal-demo
npm run android:setup
```

This will:
- Add the Android platform to your project
- Patch build files for Java 17 compatibility

#### Run on Android

```bash
npm run android:dev
```

This will:
1. Build the web application
2. Sync files with Capacitor
3. Run on Android device/emulator

#### Open Android Studio

To manually debug or build:

```bash
npm run android:open
```

### 4️⃣ Mobile Development Mode (iOS)

**Note: iOS development requires macOS**

```bash
npm run mobile:ios
```

This will open Xcode where you can build and run the app.

---

## 📦 Building for Production

### Web Build

```bash
cd apps/universal-demo
npm run build
```

Output will be in `.indjs/static/` directory.

### Desktop Build (Electron)

```bash
npm run desktop:build
```

This will:
1. Build the web application (production mode)
2. Package as an Electron app using electron-builder
3. Output to `dist-electron/` directory

### Mobile Build

```bash
npm run mobile:build
```

This will:
1. Build the web application
2. Sync assets to both iOS and Android platforms

Then use Android Studio or Xcode to create the final APK/IPA.

### Build All Platforms

```bash
npm run build:all
```

Builds for web, desktop, and mobile platforms simultaneously.

---

## 📁 Project Structure

```
universal-demo/
├── pages/                          # File-based routing
│   ├── index.jsx                  # Home page (/)
│   ├── about.jsx                  # About page (/about)
│   ├── _layout.jsx                # Layout wrapper
│   └── api/                       # API routes
├── components/                    # React components
├── electron/                      # Electron configuration
│   ├── main.cjs                   # Main process
│   └── preload.cjs                # Preload script
├── scripts/                       # Build scripts
│   └── setup-android.cjs          # Android setup script
├── styles/                        # CSS files
│   └── globals.css                # Global styles
├── public/                        # Static assets
├── android/                       # Android platform (auto-generated)
├── ios/                          # iOS platform (auto-generated)
├── capacitor.config.json          # Capacitor configuration
├── indjs.config.js               # INDJS framework configuration
├── tailwind.config.cjs           # Tailwind CSS configuration
├── postcss.config.cjs            # PostCSS configuration
├── package.json                  # Dependencies and scripts
└── .env.example                  # Environment variables template
```

---

## ⚙️ Configuration

### INDJS Configuration (`indjs.config.js`)

```javascript
export default {
  experimental: { 
    devBundler: 'vite'  // Use Vite for faster development
  }
};
```

### Capacitor Configuration (`capacitor.config.json`)

```json
{
  "appId": "com.indjs.universaldemo",
  "appName": "universal-demo",
  "webDir": ".indjs/static",
  "server": {
    "androidScheme": "https"
  }
}
```

### Electron Configuration

See `electron/main.cjs` for Electron main process configuration.

---

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start web development server |
| `npm run build` | Build web application for production |
| `npm run start` | Start production web server |
| `npm run test` | Run tests |
| `npm run desktop:dev` | Run as Electron app (development) |
| `npm run desktop:build` | Build Electron app (production) |
| `npm run android:setup` | Setup Android environment |
| `npm run android:dev` | Run on Android device/emulator |
| `npm run android:open` | Open in Android Studio |
| `npm run mobile:ios` | Open in Xcode |
| `npm run mobile:build` | Build mobile apps |
| `npm run build:all` | Build all platforms |

---

## 🔌 Platform-Specific APIs

### Using Capacitor Plugins

```javascript
import { Preferences } from '@capacitor/preferences';
import { App } from '@capacitor/app';

// Example: Store data
await Preferences.set({
  key: 'name',
  value: 'Max',
});

// Example: Get app info
const info = await App.getInfo();
console.log('App version:', info.version);
```

### Platform Detection

```javascript
import { Capacitor } from '@capacitor/core';

const platform = Capacitor.getPlatform();
// Returns: 'web', 'ios', or 'android'

if (Capacitor.isNativePlatform()) {
  // Running on mobile (iOS/Android)
  console.log('Native mobile platform');
} else {
  // Running on web or Electron
  console.log('Web platform');
}
```

---

## 🎯 Features

- ✅ **File-based routing** - Automatic route generation
- ✅ **Hot Module Replacement** - Instant updates during development
- ✅ **Tailwind CSS** - Pre-configured utility-first CSS
- ✅ **TypeScript support** - Type-safe development
- ✅ **API routes** - Built-in serverless functions
- ✅ **Cross-platform** - One codebase, three platforms
- ✅ **Native capabilities** - Access device features via Capacitor

---

## 🐛 Troubleshooting

### Android Build Issues

**Problem**: Build fails with Kotlin version error

**Solution**: Ensure Java 17 is installed and set as default:
```bash
java -version  # Should show Java 17
```

Run the setup script again:
```bash
npm run android:setup
```

### Electron Issues

**Problem**: Electron window shows blank screen

**Solution**: 
1. Ensure the dev server is running on port 3000
2. Check electron/main.cjs has correct URL

### iOS Issues

**Problem**: CocoaPods installation fails

**Solution**:
```bash
cd ios/App
pod install --repo-update
```

### Missing Dependencies

If you see module not found errors:

```bash
# From framework root
npm install

# From universal-demo
cd apps/universal-demo
npm install
```

---

## 🧩 Universal UI Components

The framework includes a set of cross-platform UI components that work seamlessly on Web, Desktop, and Mobile. Import them directly from `indjs`:

```javascript
import { 
  Screen,    // Full-height page container
  Container, // Responsive content wrapper
  Card,      // Styled card component
  Grid,      // Layout grid
  Stack,     // Flexbox stack (vertical/horizontal)
  Icon,      // Universal icon component
  View,      // Basic view container
  Text,      // Text component with typography
  Button,    // Interactive button
  Link       // Universal navigation link
} from 'indjs';
```

### Example Usage:

```javascript
import React from 'react';
import { Screen, Container, Card, Text } from 'indjs';

export default function Page() {
  return (
    <Screen background="light">
      <Container maxWidth="lg">
        <Card variant="elevated">
          <Text className="text-xl font-bold">Hello World</Text>
        </Card>
      </Container>
    </Screen>
  );
}
```

---

## 📚 Documentation

- [INDJS Framework Documentation](https://netcurion.vercel.app)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 Contributing

Contributions are welcome! Please see the main [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT © INDJS Team

---

## 💡 Next Steps

1. **Customize the app**: Edit `pages/index.jsx` to create your home page
2. **Add routes**: Create new `.jsx` files in `pages/` directory
3. **Style your app**: Use Tailwind CSS classes or custom CSS
4. **Add native features**: Use Capacitor plugins for device features
5. **Build and deploy**: Choose your target platform and build!

---

**Made with ❤️ using INDJS Framework**
