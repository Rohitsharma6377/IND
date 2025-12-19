# 🚀 Proper Mobile Development with INDJS

## ✅ The Right Way: Use `indjs mobile dev`

The INDJS framework has a built-in **Metro-like development server** for mobile apps!

### 🎯 How It Works:

1. **Starts dev server** with live reload
2. **Auto-updates Capacitor config** to point to your dev server
3. **Launches the Android app** automatically
4. **Live reload** - Changes reflect instantly!

### 📱 Run the App Properly:

```powershell
# Stop any running dev servers first
# Then run:
indjs mobile dev android
```

This single command will:
- ✅ Start the INDJS dev server
- ✅ Update `capacitor.config.json` with your local IP
- ✅ Sync to Android
- ✅ Open Android Studio and launch the app
- ✅ Enable live reload (changes update instantly!)

### 🎨 Expected Behavior:

- **Navigation works** - Tabs switch instantly
- **Styles work** - All CSS loads correctly
- **Live reload** - Edit code, see changes immediately
- **No rebuilds needed** - Just save and refresh!

### 🔧 Alternative: Manual Setup

If you prefer manual control:

```powershell
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Update Capacitor config manually
# Edit capacitor.config.json:
{
  "server": {
    "url": "http://192.168.1.13:3000",
    "cleartext": true
  }
}

# Then sync and run
npx cap sync android
npx cap open android
# Click Run in Android Studio
```

### ✨ Benefits of `indjs mobile dev`:

✅ **Automatic setup** - No manual config editing
✅ **Live reload** - Instant feedback
✅ **Proper navigation** - Client-side routing works
✅ **All styles load** - CSS served correctly
✅ **Fast development** - No build step needed

---

## 🎯 Try It Now:

```powershell
cd C:\Users\ASUS\Desktop\project\IND\mobile-app
indjs mobile dev android
```

Wait for:
1. Dev server to start
2. Android Studio to open
3. App to launch on emulator
4. **Test navigation - it should work!**

---

**This is the proper way to develop mobile apps with INDJS!** 🚀📱✨
