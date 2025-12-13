# 🎉 INDJS v2.0.17 - MOBILE & ANDROID FIXES!

**Date:** December 8, 2025  
**Version:** 2.0.17  
**Status:** ✅ **READY TO PUBLISH!**

---

## 🆕 **What's New in v2.0.17**

### **1. 📱 Enhanced Mobile Templates**

We've supercharged the mobile development experience! All templates (`mobile`, `universal`, `todo-app`) now include:

- ✅ **Automatic Setup:** No more manual `npm install @capacitor/android`.
- ✅ **Single Command Scripts:**
    - `npm run android:setup` → Initial setup
    - `npm run android:dev` → Build + Sync + Run
    - `npm run mobile:dev` → Alias for Android dev
- ✅ **Dependencies Included:**
    - `@capacitor/android`
    - `@capacitor/ios`
    - `@capacitor/core`
    - `@capacitor/cli`
    - `@capacitor/app`

### **2. 🛠️ New Helper Scripts**

Added to all mobile-enabled templates:

```json
"scripts": {
  "android:setup": "npx cap init ... && npx cap add android",
  "android:dev": "npm run build && npx cap sync android && npx cap run android",
  "android:logs": "adb logcat",
  "android:open": "npx cap open android",
  "mobile:dev": "npm run android:dev"
}
```

### **3. ⚡ Improved Developer Experience**

- **Zero Configuration:** Just run `npm install` and you have everything needed for mobile dev.
- **Faster Workflow:** One command to run on device with live reload support.
- **Better Error Handling:** Setup scripts handle platform addition automatically.

---

## 🚀 **How to Use (New Flow)**

```bash
# 1. Create App
indjs create my-app --template mobile

# 2. Setup Android (One time)
npm run android:setup

# 3. Run on Device (Every time)
npm run android:dev
```

**That's it! No more manual package installation!**

---

## 📦 **Templates Updated**

1. ✅ `packages/indjs/templates/mobile`
2. ✅ `packages/indjs/templates/universal`
3. ✅ `packages/indjs/templates/todo-app`

---

## ✅ **Summary**

**Version:** 2.0.17  
**Focus:** Mobile Development Experience  
**Status:** Ready to Publish  

---

**Publish now:**
```bash
npm publish
```
