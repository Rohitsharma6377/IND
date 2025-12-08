# 🎉 INDJS v2.0.18 - NEW TEMPLATES & CLI!

**Date:** December 8, 2025  
**Version:** 2.0.18  
**Status:** ✅ **READY TO PUBLISH!**

---

## 🆕 **What's New in v2.0.18**

### **1. 🎨 Interactive Template Selection**

The CLI now supports 5 world-class templates directly!

```bash
indjs create my-app
```

Prompt options:
1. **Basic App** - Clean starter
2. **Fullstack SaaS** - Auth + DB + APIs
3. **Universal App** - Web + Mobile + Desktop
4. **Todo App** - Beautiful cross-platform example
5. **Mobile (Capacitor)** - Native mobile app

### **2. 📱 Android Setup Fixes**

- ✅ Fixed `android:setup` command failures
- ✅ Fixed "platform undefined" errors
- ✅ All mobile templates now auto-include Capacitor dependencies

### **3. ⚡ Single Command Mobile Dev**

Added to all mobile templates:

```bash
npm run android:dev
# Builds web + Syncs + Runs on Android automatically
```

---

## 🚀 **How to Use**

1. **Install Latest:**
   ```bash
   npm install -g indjs@latest
   ```

2. **Create App:**
   ```bash
   indjs create my-todo --template todo-app
   ```

3. **Run on Android:**
   ```bash
   cd my-todo
   npm run android:setup
   npm run android:dev
   ```

---

## ✅ **Summary**

**Version:** 2.0.18  
**New Templates:** Integrated into CLI  
**Fixes:** Android Setup Scripts  
**Status:** Ready to Publish  

---

**Publish now:**
```bash
npm publish
```
