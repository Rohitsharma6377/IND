# 📱 Run Your App on Android with ADB

## 🚀 Quick Setup Guide

Follow these steps to run your INDJS app on Android device/emulator with live reload!

---

## Step 1: Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/preferences @capacitor/app
```

---

## Step 2: Initialize Capacitor

```bash
npx cap init "My Life Manager" "com.indjs.lifemanager" --web-dir=.indjs/static
```

---

## Step 3: Add Android Platform

```bash
npx cap add android
```

---

## Step 4: Get Your Computer's IP Address

```bash
ipconfig
```

Look for **IPv4 Address** (e.g., `192.168.1.100`)

---

## Step 5: Create capacitor.config.json

Create this file in your project root with YOUR IP address:

```json
{
  "appId": "com.indjs.lifemanager",
  "appName": "My Life Manager",
  "webDir": ".indjs/static",
  "server": {
    "url": "http://YOUR_IP_HERE:3000",
    "cleartext": true
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 1500,
      "backgroundColor": "#9333EA",
      "showSpinner": true,
      "spinnerColor": "#FFFFFF"
    }
  }
}
```

**Replace `YOUR_IP_HERE` with your actual IP!**

---

## Step 6: Build and Sync

```bash
# Build the web app
npm run build

# Sync to Android
npx cap sync android
```

---

## Step 7: Run on Android

### Option A: Using Android Studio (Recommended)

```bash
npx cap open android
```

Then click the **Run** button ▶️ in Android Studio

### Option B: Using ADB Directly

```bash
# Check connected devices
adb devices

# Run the app
npx cap run android
```

---

## 🔥 Enable Live Reload

### Terminal 1: Start Dev Server

```bash
npm run dev
```

### Terminal 2: Update Config and Sync

1. Make sure `capacitor.config.json` has your IP
2. Run:
```bash
npx cap sync android
npx cap run android
```

Now when you edit code and save, the app reloads automatically! 🎉

---

## 📱 View Logs (Like Metro)

```bash
# View all logs
adb logcat

# Filter for your app
adb logcat | findstr "Chromium"

# Clear logs
adb logcat -c
```

---

## 🐛 Troubleshooting

### Can't connect to dev server?

1. Check firewall - allow port 3000
2. Verify IP address is correct
3. Make sure device and computer on same WiFi

### ADB not found?

Add to PATH:
```
C:\Users\YourName\AppData\Local\Android\Sdk\platform-tools
```

### Port forwarding (alternative):

```bash
adb reverse tcp:3000 tcp:3000
```

Then use `http://localhost:3000` in config

---

## ✅ You're Ready!

Your app will now run on Android just like React Native! 🚀
