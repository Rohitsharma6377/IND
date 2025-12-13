# 📱 Live Development with ADB - INDJS Mobile Apps

## 🎯 Running INDJS Apps on Android with Live Reload (Like Metro)

Yes! You can run your INDJS app on Android devices/emulators with **live reload** just like React Native Metro bundler!

---

## 🚀 Quick Start - Live Development

### **Step 1: Start Dev Server**

```bash
# In your INDJS app directory
npm run dev
```

This starts the development server at `http://localhost:3000`

### **Step 2: Get Your Computer's IP Address**

#### **Windows:**
```bash
ipconfig
```
Look for `IPv4 Address` (e.g., `192.168.1.100`)

#### **macOS/Linux:**
```bash
ifconfig
# or
ip addr show
```
Look for your local IP (e.g., `192.168.1.100`)

### **Step 3: Update Capacitor Config**

Edit `capacitor.config.json`:

```json
{
  "appId": "com.indjs.todoapp",
  "appName": "INDJS Todo App",
  "webDir": ".indjs/static",
  "server": {
    "url": "http://192.168.1.100:3000",
    "cleartext": true
  }
}
```

**Replace `192.168.1.100` with YOUR computer's IP address!**

### **Step 4: Sync to Android**

```bash
npx cap sync android
```

### **Step 5: Run on Device/Emulator**

```bash
npx cap run android
```

**OR** open in Android Studio:
```bash
npx cap open android
```
Then click Run ▶️

---

## 🔥 **Live Reload is Now Active!**

- Edit your code in `pages/index.jsx`
- Save the file
- App **automatically reloads** on your Android device!
- Just like Metro bundler! 🎉

---

## 📱 **Using ADB Directly**

### **Check Connected Devices**

```bash
adb devices
```

Output:
```
List of devices attached
emulator-5554    device
192.168.1.50:5555    device
```

### **Install APK via ADB**

```bash
# Build APK first
cd android
./gradlew assembleDebug

# Install via ADB
adb install app/build/outputs/apk/debug/app-debug.apk
```

### **View Logs (Like Metro)**

```bash
# View all logs
adb logcat

# Filter for your app
adb logcat | grep "Chromium"

# Clear logs
adb logcat -c
```

### **Forward Ports (If Needed)**

```bash
# Forward device port to computer
adb reverse tcp:3000 tcp:3000
```

Now device can access `http://localhost:3000` directly!

---

## 🌐 **Complete Live Development Setup**

### **Method 1: Using Computer's IP (Recommended)**

**1. Start dev server:**
```bash
npm run dev
```

**2. Get your IP:**
```bash
ipconfig  # Windows
ifconfig  # Mac/Linux
```

**3. Update `capacitor.config.json`:**
```json
{
  "server": {
    "url": "http://YOUR_IP:3000",
    "cleartext": true
  }
}
```

**4. Sync and run:**
```bash
npx cap sync android
npx cap run android
```

**5. Develop with live reload!**
- Edit code
- Save
- App reloads automatically ✨

---

### **Method 2: Using ADB Reverse (Alternative)**

**1. Start dev server:**
```bash
npm run dev
```

**2. Connect device via ADB:**
```bash
adb devices
```

**3. Reverse port:**
```bash
adb reverse tcp:3000 tcp:3000
```

**4. Update `capacitor.config.json`:**
```json
{
  "server": {
    "url": "http://localhost:3000",
    "cleartext": true
  }
}
```

**5. Sync and run:**
```bash
npx cap sync android
npx cap run android
```

---

## 🛠️ **Development Workflow**

### **Daily Development:**

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Android
npx cap sync android
npx cap run android

# Now edit your code and it auto-reloads!
```

### **Debugging:**

```bash
# Chrome DevTools
chrome://inspect

# View console logs
adb logcat | grep "Chromium"

# View network requests
# Use Chrome DevTools Network tab
```

---

## 📋 **Complete Example**

### **1. Create App**
```bash
indjs create my-app --template todo-app
cd my-app
npm install
```

### **2. Add Android Platform**
```bash
npx cap add android
```

### **3. Get Your IP**
```bash
ipconfig
# Example output: 192.168.1.100
```

### **4. Configure Live Reload**

Edit `capacitor.config.json`:
```json
{
  "appId": "com.myapp",
  "appName": "My App",
  "webDir": ".indjs/static",
  "server": {
    "url": "http://192.168.1.100:3000",
    "cleartext": true
  }
}
```

### **5. Start Development**

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npx cap sync android
npx cap run android
```

### **6. Develop!**

Edit `pages/index.jsx`:
```jsx
export default function Home() {
  return (
    <div className="p-4">
      <h1>Hello from INDJS!</h1>
      {/* Edit this and save - app reloads automatically! */}
    </div>
  );
}
```

Save → App reloads on device! 🎉

---

## 🔧 **Troubleshooting**

### **Issue: App shows "Unable to connect"**

**Solution 1:** Check firewall
```bash
# Windows: Allow port 3000 in Windows Firewall
# Or temporarily disable firewall for testing
```

**Solution 2:** Verify IP address
```bash
# Make sure device and computer are on same network
# Ping your computer from device
```

**Solution 3:** Use ADB reverse
```bash
adb reverse tcp:3000 tcp:3000
# Then use http://localhost:3000 in config
```

### **Issue: Changes not reflecting**

**Solution:**
```bash
# Clear cache and rebuild
npx cap sync android --force
```

### **Issue: ADB not found**

**Solution:**
```bash
# Add Android SDK platform-tools to PATH
# Windows: C:\Users\YourName\AppData\Local\Android\Sdk\platform-tools
# Mac/Linux: ~/Library/Android/sdk/platform-tools
```

---

## 📊 **Comparison with React Native Metro**

| Feature | React Native Metro | INDJS Live Reload |
|---------|-------------------|-------------------|
| **Live Reload** | ✅ | ✅ |
| **Hot Reload** | ✅ | ✅ (via Vite HMR) |
| **Port** | 8081 | 3000 (configurable) |
| **Setup** | Automatic | Manual IP config |
| **DevTools** | React DevTools | Chrome DevTools |
| **Network** | Same network | Same network |

---

## 🎯 **Production Build**

When ready for production, **remove** the server config:

```json
{
  "appId": "com.myapp",
  "appName": "My App",
  "webDir": ".indjs/static"
  // Remove server config for production!
}
```

Then build:
```bash
npm run build
npx cap sync android
npx cap open android
# Build signed APK in Android Studio
```

---

## 💡 **Pro Tips**

### **1. Use Environment Variables**

Create `capacitor.config.dev.json`:
```json
{
  "server": {
    "url": "http://192.168.1.100:3000",
    "cleartext": true
  }
}
```

### **2. Quick IP Script**

Create `get-ip.js`:
```javascript
const os = require('os');
const interfaces = os.networkInterfaces();
for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    if (iface.family === 'IPv4' && !iface.internal) {
      console.log(iface.address);
    }
  }
}
```

Run: `node get-ip.js`

### **3. Auto-Update Config**

Add to `package.json`:
```json
{
  "scripts": {
    "dev:mobile": "node update-ip.js && npm run dev"
  }
}
```

---

## 🚀 **Summary**

**Yes! You can run INDJS apps on Android with live reload like Metro!**

**Steps:**
1. ✅ Start dev server (`npm run dev`)
2. ✅ Get your IP address (`ipconfig`)
3. ✅ Update `capacitor.config.json` with IP
4. ✅ Sync to Android (`npx cap sync android`)
5. ✅ Run on device (`npx cap run android`)
6. ✅ Edit code → Save → Auto reload! 🎉

**Just like React Native Metro, but with INDJS!**

---

## 📞 **Need Help?**

Common commands:
```bash
# Check devices
adb devices

# View logs
adb logcat | grep "Chromium"

# Reverse port
adb reverse tcp:3000 tcp:3000

# Restart ADB
adb kill-server
adb start-server

# Install APK
adb install app-debug.apk
```

---

**Happy developing with live reload on Android! 🎉**
