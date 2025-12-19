# 🔧 Complete Clean Rebuild Guide

## ⚠️ Issue: App Still Loading from localhost:3000

The Android app is cached and still trying to load from the old dev server URL.

## ✅ Solution: Complete Clean Rebuild

Follow these steps **exactly** in Android Studio:

### Step 1: Close the App
- If the app is running in the emulator, **close it completely**
- In emulator, swipe up and close TaskFlow

### Step 2: Clean Project
```
In Android Studio:
1. Click "Build" menu
2. Click "Clean Project"
3. Wait for it to finish (check bottom status bar)
```

### Step 3: Invalidate Caches
```
In Android Studio:
1. Click "File" menu
2. Click "Invalidate Caches..."
3. Check ALL boxes:
   ☑ Clear file system cache and Local History
   ☑ Clear downloaded shared indexes
   ☑ Clear VCS Log caches and indexes
   ☑ Wipe IDE system caches
4. Click "Invalidate and Restart"
5. Wait for Android Studio to restart
```

### Step 4: Delete Build Folders (Important!)
```
In File Explorer:
1. Go to: mobile-app/android/app/build
2. Delete the entire "build" folder
3. Go to: mobile-app/android/.gradle
4. Delete the entire ".gradle" folder
```

### Step 5: Sync Gradle
```
In Android Studio (after restart):
1. Click "File" menu
2. Click "Sync Project with Gradle Files"
3. Wait for sync to complete
```

### Step 6: Rebuild Project
```
In Android Studio:
1. Click "Build" menu
2. Click "Rebuild Project"
3. Wait for build to complete (may take 2-3 minutes)
```

### Step 7: Run the App
```
1. Make sure emulator is running
2. Click the green Run button (▶️)
3. Select your emulator
4. Wait for installation
```

## ✅ Expected Result:

After these steps, the app should:
- ✅ Load from static files (not localhost)
- ✅ Show all styles correctly
- ✅ Have working bottom navigation
- ✅ Switch between pages when tapping tabs

## 🎯 Test Navigation:

Once the app loads:
1. Tap **📝 Tasks** tab
2. Tap **📁 Categories** tab
3. Tap **📊 Stats** tab
4. Tap **👤 Profile** tab

Each tap should change the page content!

## 🐛 If Still Not Working:

If navigation still doesn't work after clean rebuild, the issue is with dynamic imports in the static build. We'll need to use a different approach (all pages in one file).

---

**Start with Step 1 and follow each step carefully!** 🚀
