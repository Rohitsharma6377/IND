# INDJS Mobile App

Cross-platform mobile application built with INDJS and Capacitor.

## Features

- ✅ iOS and Android support
- ✅ Native device features (Camera, Geolocation, etc.)
- ✅ Push notifications
- ✅ Offline support
- ✅ Native navigation
- ✅ Responsive design
- ✅ Dark mode support

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for mobile
npm run mobile:build

# Open in Xcode (iOS)
npm run mobile:ios

# Open in Android Studio
npm run mobile:android
```

## Setup

### 1. Initialize Capacitor (Already Done)

The template comes with Capacitor pre-configured. If you need to reinitialize:

```bash
npx cap init "My App" "com.mycompany.myapp" --web-dir=.indjs/static
```

### 2. Add Platforms

```bash
# Add iOS (macOS only)
npx cap add ios

# Add Android
npx cap add android
```

### 3. Install Native Dependencies

```bash
# iOS
cd ios/App
pod install
cd ../..

# Android (handled by Gradle automatically)
```

## Development

### Web Development

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
```

### Mobile Development with Live Reload

1. Start dev server:
```bash
npm run dev
```

2. Get your computer's IP address:
```bash
# Windows
ipconfig

# macOS/Linux
ifconfig
```

3. Update `capacitor.config.json`:
```json
{
  "server": {
    "url": "http://YOUR_IP:3000",
    "cleartext": true
  }
}
```

4. Sync and run:
```bash
npm run mobile:sync
npm run mobile:run:android  # or mobile:run:ios
```

## Building

### Production Build

```bash
# Build web app
npm run build

# Sync to native platforms
npm run mobile:sync
```

### iOS Build

```bash
# Open in Xcode
npm run mobile:ios

# In Xcode:
# 1. Select your team
# 2. Choose device/simulator
# 3. Click Run
```

### Android Build

```bash
# Open in Android Studio
npm run mobile:android

# In Android Studio:
# 1. Wait for Gradle sync
# 2. Select device/emulator
# 3. Click Run
```

## Native Features

### Camera

```javascript
import { Camera, CameraResultType } from '@capacitor/camera';

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  
  setPhoto(image.webPath);
};
```

### Geolocation

```javascript
import { Geolocation } from '@capacitor/geolocation';

const getLocation = async () => {
  const position = await Geolocation.getCurrentPosition();
  console.log('Lat:', position.coords.latitude);
  console.log('Lng:', position.coords.longitude);
};
```

### Push Notifications

```javascript
import { PushNotifications } from '@capacitor/push-notifications';

// Register for notifications
await PushNotifications.requestPermissions();
await PushNotifications.register();

// Listen for token
PushNotifications.addListener('registration', (token) => {
  console.log('Token:', token.value);
});

// Listen for notifications
PushNotifications.addListener('pushNotificationReceived', (notification) => {
  console.log('Notification:', notification);
});
```

## Project Structure

```
├── pages/
│   ├── index.jsx              # Home page
│   ├── camera.jsx             # Camera demo
│   ├── location.jsx           # Location demo
│   └── api/
│       └── hello.js           # API route
├── components/
│   ├── MobileLayout.jsx       # Mobile-optimized layout
│   ├── BottomNav.jsx          # Bottom navigation
│   └── SafeArea.jsx           # Safe area wrapper
├── lib/
│   ├── capacitor.js           # Capacitor utilities
│   └── platform.js            # Platform detection
├── styles/
│   └── globals.css            # Global styles with safe areas
├── capacitor.config.json      # Capacitor configuration
└── package.json
```

## Deployment

### iOS App Store

1. Build in Xcode
2. Archive (Product → Archive)
3. Upload to App Store Connect
4. Submit for review

### Google Play Store

1. Generate signed bundle in Android Studio
2. Upload to Play Console
3. Fill in store listing
4. Submit for review

## Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [INDJS Docs](https://netcurion.vercel.app)
- [iOS Guidelines](https://developer.apple.com/design/)
- [Android Guidelines](https://material.io/design)

## License

MIT
