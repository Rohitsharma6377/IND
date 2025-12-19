# 📱 TaskFlow - Universal Task Manager

A beautiful, cross-platform task management application built with **INDJS Framework**. Run the same codebase on **Web**, **Desktop (Electron)**, and **Mobile (Android/iOS)**.

![INDJS](https://img.shields.io/badge/INDJS-Universal%20Framework-blueviolet)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Capacitor](https://img.shields.io/badge/Capacitor-6.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- ✅ **Add, Complete & Delete Tasks** - Full CRUD operations
- 🎨 **Beautiful Modern UI** - Premium gradient design with smooth animations
- 📊 **Task Statistics** - Track total, active, and completed tasks
- 🏷️ **Priority Levels** - High, Medium, Low priority tasks
- 📁 **Categories** - Organize tasks by Work, Personal, Shopping, etc.
- 📅 **Due Dates** - Set deadlines for your tasks
- 🔍 **Smart Filters** - View All, Active, or Completed tasks
- 💾 **Redux State Management** - Persistent state with Redux Toolkit
- 🌐 **Universal Components** - INDJS components work on Web, Desktop & Mobile
- 📱 **Mobile-First Design** - Optimized for touch interactions

## 🚀 Tech Stack

- **Framework**: [INDJS](https://github.com/Rohitsharma6377/IND) - Universal React Framework
- **UI Library**: React 18.3.1
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Mobile**: Capacitor 6.0
- **Build Tool**: Vite

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/taskflow.git
cd taskflow/mobile-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at **http://localhost:3000** 🎉

## 🛠️ Available Scripts

### Web Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
```

### Android Development
```bash
npm run android:setup    # Add Android platform (first time only)
npm run android:sync     # Sync web assets to Android
npm run android:open     # Open in Android Studio
```

### iOS Development
```bash
npm run ios:setup        # Add iOS platform (first time only)
npm run ios:sync         # Sync web assets to iOS
npm run ios:open         # Open in Xcode
```

## 📱 Building for Android

### Prerequisites
- [Android Studio](https://developer.android.com/studio) installed
- Java JDK 11 or higher
- Android SDK (API 33 or higher)

### Steps

1. **Build the web app**:
   ```bash
   npm run build
   ```

2. **Sync to Android**:
   ```bash
   npm run android:sync
   ```

3. **Open in Android Studio**:
   ```bash
   npm run android:open
   ```

4. **Run on Device/Emulator**:
   - In Android Studio, click the "Run" button (▶️)
   - Select your device or emulator
   - Wait for the build to complete

### Building APK/AAB

In Android Studio:
1. Go to **Build** → **Build Bundle(s) / APK(s)**
2. Select **Build APK(s)** for testing or **Build Bundle(s)** for Play Store
3. Find the output in `android/app/build/outputs/`

## 🍎 Building for iOS

### Prerequisites
- macOS with Xcode installed
- iOS Simulator or physical iOS device
- Apple Developer account (for device testing)

### Steps

1. **Build the web app**:
   ```bash
   npm run build
   ```

2. **Sync to iOS**:
   ```bash
   npm run ios:sync
   ```

3. **Open in Xcode**:
   ```bash
   npm run ios:open
   ```

4. **Run on Simulator/Device**:
   - Select your target device in Xcode
   - Click the "Run" button (▶️)

## 🏗️ Project Structure

```
mobile-app/
├── pages/                      # File-based routing
│   ├── index.jsx              # Home page (Task list)
│   ├── about.jsx              # About page
│   ├── _layout.jsx            # Global layout wrapper
│   └── api/                   # API routes
├── components/                # React components
│   ├── TaskCard.jsx           # Individual task card
│   ├── AddTaskModal.jsx       # Add task modal
│   └── PlatformInfo.jsx       # Platform detection
├── utils/                     # Utilities
│   ├── store.js               # Redux store
│   └── taskSlice.js           # Task state slice
├── styles/                    # Stylesheets
│   └── globals.css            # Global styles
├── public/                    # Static assets
├── android/                   # Android native project
├── capacitor.config.json      # Capacitor configuration
├── indjs.config.js            # INDJS configuration
└── package.json
```

## 🎨 INDJS Universal Components

This app uses INDJS universal components that work seamlessly across all platforms:

```jsx
import { View, Text, Pressable, ScrollView, TextInput, Modal } from 'indjs';

// These components automatically adapt to:
// - Web: Render as <div>, <span>, <button>, etc.
// - Mobile: Render as native React Native components
```

### Key Components Used:
- **View** - Container component (div on web, View on mobile)
- **Text** - Text component (span/p on web, Text on mobile)
- **Pressable** - Touchable button (button on web, Pressable on mobile)
- **ScrollView** - Scrollable container
- **TextInput** - Input field
- **Modal** - Modal dialog
- **FlatList** - Optimized list rendering
- **SafeAreaView** - Safe area handling for notches

## 🔧 Configuration

### Capacitor Config (`capacitor.config.json`)
```json
{
  "appId": "com.indjs.taskflow",
  "appName": "TaskFlow",
  "webDir": ".indjs/static",
  "server": {
    "androidScheme": "https"
  }
}
```

### INDJS Config (`indjs.config.js`)
```javascript
export default {
  experimental: { 
    devBundler: 'vite'  // Use Vite for faster HMR
  }
};
```

## 🎯 Key Features Explained

### Redux State Management
The app uses Redux Toolkit for state management:
- **taskSlice.js**: Defines task state and reducers
- **store.js**: Configures the Redux store
- State persists across navigation

### Universal Components
All UI components use INDJS universal components:
- Automatically adapt to platform (Web/Mobile)
- Same API across all platforms
- No platform-specific code needed

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adapts to different screen sizes
- Touch-optimized interactions

## 📸 Screenshots

### Web Version
![Web Screenshot](./screenshots/web.png)

### Android Version
![Android Screenshot](./screenshots/android.png)

### iOS Version
![iOS Screenshot](./screenshots/ios.png)

## 🐛 Troubleshooting

### Android Build Issues

**Issue**: "Invalid App ID"
```bash
# Fix: Update capacitor.config.json with valid Java package name
{
  "appId": "com.indjs.taskflow"  // No spaces or dashes
}
```

**Issue**: Gradle build fails
```bash
# Solution: Update Android Studio and Gradle
# In Android Studio: File → Project Structure → Update Gradle
```

### iOS Build Issues

**Issue**: Signing error
```bash
# Solution: Configure signing in Xcode
# Xcode → Signing & Capabilities → Select your team
```

## 🚀 Deployment

### Web Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the .indjs/static folder
```

### Android Play Store
1. Build signed AAB in Android Studio
2. Upload to Google Play Console
3. Follow Play Store guidelines

### iOS App Store
1. Archive in Xcode
2. Upload to App Store Connect
3. Submit for review

## 📝 License

MIT © INDJS Team

## 🙏 Acknowledgments

- Built with [INDJS Framework](https://github.com/Rohitsharma6377/IND)
- Powered by [React](https://reactjs.org/)
- Mobile support by [Capacitor](https://capacitorjs.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

- 📖 [INDJS Documentation](https://netcurion.vercel.app)
- 🐛 [Issue Tracker](https://github.com/Rohitsharma6377/IND/issues)
- 📧 [Email Support](mailto:netcurion@outlook.com)

---

<div align="center">

**Made with ❤️ using INDJS**

⭐ Star us on [GitHub](https://github.com/Rohitsharma6377/IND) if you like this project!

</div>
