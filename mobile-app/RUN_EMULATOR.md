# 🚀 Running TaskFlow in Android Emulator

## Quick Steps to Run in Emulator

### Option 1: Using Android Studio (Recommended)

1. **Android Studio should already be open** (we just opened it)
   - If not, run: `npm run android:open`

2. **Create/Start an Emulator**:
   - In Android Studio, click **"Device Manager"** (phone icon on right sidebar)
   - If you have an emulator: Click the ▶️ play button to start it
   - If you don't have one: Click **"Create Device"**
     - Select: **Pixel 5** or **Pixel 6**
     - System Image: **API 33** (Android 13) or higher
     - Click **Finish**
     - Then click ▶️ to start it

3. **Wait for Emulator to Boot** (1-2 minutes first time)
   - You'll see the Android home screen

4. **Run the App**:
   - In Android Studio, click the green **Run** button (▶️) at the top
   - Or press **Shift + F10**
   - Select your emulator from the dropdown
   - Wait for build (2-3 minutes first time)
   - **Your app will launch!** 🎉

### Option 2: Using Command Line

If Android Studio is taking too long or you prefer CLI:

```bash
# 1. Make sure build is up to date
npm run build

# 2. Sync to Android
npm run android:sync

# 3. List available emulators
emulator -list-avds

# 4. Start an emulator (replace 'Pixel_5_API_33' with your emulator name)
emulator -avd Pixel_5_API_33

# 5. In a new terminal, install and run the app
cd android
./gradlew installDebug
adb shell am start -n com.indjs.taskflow/.MainActivity
```

### Option 3: Quick Run Script

I've created a script for you. Just run:

```bash
# Windows PowerShell
.\run-android.ps1

# Or manually:
npm run build && npm run android:sync && npm run android:open
```

## 🎯 What to Expect

Once the app launches on the emulator, you'll see:

1. **Splash Screen** (if configured)
2. **Home Screen** with:
   - TaskFlow header with gradient logo
   - Statistics cards (Total, Active, Done)
   - Filter tabs (All, Active, Completed)
   - Sample tasks
   - Floating "+" button to add tasks

3. **Try These Actions**:
   - ➕ Click the "+" button to add a new task
   - ✅ Click the checkbox to complete a task
   - 🗑️ Click the trash icon to delete a task
   - 🔍 Click filter tabs to filter tasks
   - ℹ️ Navigate to "About" page

## 🐛 Troubleshooting

### Emulator Won't Start
```bash
# Check if HAXM/Hyper-V is enabled
# Windows: Enable Hyper-V in Windows Features
# Or install Intel HAXM from Android Studio SDK Manager
```

### Build Fails
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew build
```

### App Crashes on Launch
```bash
# Check logs
adb logcat | grep -i taskflow

# Or in Android Studio: View → Tool Windows → Logcat
```

### Gradle Sync Issues
- File → Invalidate Caches → Invalidate and Restart
- File → Sync Project with Gradle Files

## 📱 Emulator Controls

- **Rotate**: Ctrl + F11 / Cmd + Left/Right Arrow
- **Volume**: Ctrl + Up/Down
- **Back Button**: ESC
- **Home Button**: Ctrl + H
- **Recent Apps**: Ctrl + S
- **Screenshot**: Ctrl + S (in emulator toolbar)

## ⚡ Performance Tips

1. **Enable Hardware Acceleration**:
   - Tools → AVD Manager → Edit → Show Advanced Settings
   - Graphics: Hardware - GLES 2.0

2. **Allocate More RAM**:
   - Edit AVD → Advanced Settings → RAM: 2048 MB or more

3. **Use Quick Boot**:
   - AVD Manager → Edit → Boot option: Quick Boot

## 🎉 Success Indicators

You'll know it's working when you see:
- ✅ Emulator boots to Android home screen
- ✅ Android Studio shows "BUILD SUCCESSFUL"
- ✅ App icon appears in emulator
- ✅ App launches showing TaskFlow interface
- ✅ You can interact with tasks

## 📸 Expected Result

Your emulator should show:
```
┌─────────────────────────┐
│  📋 TaskFlow            │  ← Header
├─────────────────────────┤
│                         │
│  Task Manager           │  ← Title
│  Organize your day...   │
│                         │
│  ┌───┐ ┌───┐ ┌───┐    │  ← Stats
│  │ 2 │ │ 2 │ │ 0 │    │
│  └───┘ └───┘ └───┘    │
│                         │
│  [All][Active][Done]   │  ← Filters
│                         │
│  ┌─────────────────┐   │  ← Task Cards
│  │ ☐ Welcome...    │   │
│  └─────────────────┘   │
│  ┌─────────────────┐   │
│  │ ☐ Try adding... │   │
│  └─────────────────┘   │
│                         │
│              [+]        │  ← Add Button
└─────────────────────────┘
```

## 🚀 Next Steps After Launch

1. **Test all features** in the emulator
2. **Add your own tasks**
3. **Try different screen orientations**
4. **Test on different emulator sizes**
5. **Check performance and responsiveness**

---

**Ready?** Open Android Studio and click the Run button! 🎉
