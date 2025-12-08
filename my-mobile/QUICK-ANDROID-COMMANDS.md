# 🚀 Single Command Android Setup!

## ✅ **New Scripts Added to package.json**

You can now run your app on Android with simple commands!

---

## 📱 **Quick Commands**

### **1. First Time Setup (Run Once)**

```bash
npm run android:setup
```

This will:
- Initialize Capacitor
- Add Android platform
- Create necessary files

---

### **2. Run on Android (Easiest!)**

```bash
npm run android:dev
```

This will:
- Build your app
- Sync to Android
- Run on device/emulator

**Just ONE command! 🎉**

---

### **3. Open in Android Studio**

```bash
npm run android:open
```

Then click Run ▶️

---

## 📋 **All Available Commands**

### **Setup Commands:**
```bash
npm run android:setup      # First time setup
npm run mobile:setup       # Same as above
```

### **Development Commands:**
```bash
npm run dev                # Web dev server
npm run android:dev        # Build + Sync + Run on Android
npm run mobile:dev         # Same as above
```

### **Build Commands:**
```bash
npm run build              # Build web app
npm run android:build      # Build + Sync to Android
npm run mobile:build       # Same as above
```

### **Android Commands:**
```bash
npm run android:sync       # Sync changes to Android
npm run android:open       # Open Android Studio
npm run android:run        # Run on device
npm run android:logs       # View logs
npm run mobile:run         # Same as android:run
```

---

## 🎯 **Complete Workflow**

### **First Time:**

```bash
# 1. Setup Android (once)
npm run android:setup

# 2. Update capacitor.config.json with your IP
# Edit: "url": "http://YOUR_IP:3000"

# 3. Run on Android
npm run android:dev
```

### **Daily Development:**

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run android:sync
npm run android:run
```

Or just:
```bash
npm run android:dev
```

---

## 🔥 **Live Reload Workflow**

### **Option 1: Quick Run**
```bash
npm run android:dev
```

### **Option 2: With Live Reload**

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run android:run
```

Now edit code → Save → Auto reload! 🎉

---

## 📱 **View Logs**

```bash
npm run android:logs
```

Or filter:
```bash
npm run android:logs | findstr "Chromium"
```

---

## ✅ **Summary**

**Before:**
```bash
npx cap init "My Life Manager" "com.indjs.lifemanager" --web-dir=.indjs/static
npx cap add android
npm run build
npx cap sync android
npx cap run android
```

**Now:**
```bash
npm run android:setup    # First time
npm run android:dev      # Every time
```

**Much easier! 🚀**

---

## 🎉 **Try It Now!**

```bash
# First time setup
npm run android:setup

# Update capacitor.config.json with your IP

# Run on Android
npm run android:dev
```

**Your app will run on Android in ONE command! 🎉**
