# 📝 INDJS Todo App

Beautiful, cross-platform Todo List application built with INDJS, React, and Tailwind CSS.

## ✨ Features

- ✅ **Beautiful UI** - Modern design with Tailwind CSS
- ✅ **Cross-Platform** - Works on Web, iOS, Android, Windows, Mac, Linux
- ✅ **Persistent Storage** - Todos saved automatically
- ✅ **Filter Tasks** - View all, active, or completed tasks
- ✅ **Real-time Stats** - Track your progress
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Dark Mode Ready** - Beautiful gradient backgrounds

## 🚀 Quick Start

### Web Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Desktop App (Electron)

```bash
# Development
npm run desktop:dev

# Build for production
npm run desktop:build:all       # All platforms
npm run desktop:build:windows   # Windows only
npm run desktop:build:mac       # macOS only
npm run desktop:build:linux     # Linux only
```

Output: `dist/` folder with installers

### Mobile App (iOS + Android)

```bash
# Add platforms (first time)
npm run mobile:add:ios      # macOS only
npm run mobile:add:android

# Build and sync
npm run mobile:build
npm run mobile:sync

# Open in IDE
npm run mobile:ios       # Opens Xcode
npm run mobile:android   # Opens Android Studio
```

## 📱 Platform Support

| Platform | Status | Command |
|----------|--------|---------|
| **Web** | ✅ | `npm run dev` |
| **Windows** | ✅ | `npm run desktop:build:windows` |
| **macOS** | ✅ | `npm run desktop:build:mac` |
| **Linux** | ✅ | `npm run desktop:build:linux` |
| **iOS** | ✅ | `npm run mobile:ios` |
| **Android** | ✅ | `npm run mobile:android` |

## 🎨 Features

### Add Todos
- Type in the input field
- Press Enter or click "Add" button
- Todos are saved automatically

### Manage Todos
- Click checkbox to mark as complete
- Click delete button to remove
- Filter by all/active/completed
- Clear all completed tasks

### Statistics
- View active tasks count
- View completed tasks count
- View total tasks count

## 🛠️ Tech Stack

- **Framework:** INDJS
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Desktop:** Electron
- **Mobile:** Capacitor
- **Storage:** LocalStorage (Web/Desktop), Preferences (Mobile)

## 📁 Project Structure

```
├── pages/
│   └── index.jsx          # Main Todo app page
├── lib/
│   └── platform.js        # Platform detection & storage
├── styles/
│   └── globals.css        # Global styles & Tailwind
├── electron/
│   └── main.cjs           # Electron main process
├── capacitor.config.json  # Mobile configuration
└── package.json
```

## 🎯 How It Works

### Cross-Platform Storage

The app automatically detects the platform and uses the appropriate storage:

- **Web/Desktop:** LocalStorage
- **Mobile:** Capacitor Preferences

```javascript
import { storage } from './lib/platform';

// Works on all platforms!
await storage.set('todos', JSON.stringify(todos));
const data = await storage.get('todos');
```

### Platform Detection

```javascript
import { getPlatform } from './lib/platform';

const platform = getPlatform();
// Returns: 'Web', 'Desktop (Electron)', 'iOS', or 'Android'
```

## 🚀 Deployment

### Web

```bash
npm run build
# Deploy .indjs/static/ to Vercel, Netlify, etc.
```

### Desktop

```bash
npm run desktop:build:all
# Distribute files from dist/ folder:
# - MyApp.exe (Windows)
# - MyApp.dmg (macOS)
# - MyApp.AppImage (Linux)
```

### Mobile

```bash
# iOS App Store
npm run mobile:ios
# In Xcode: Archive → Upload to App Store Connect

# Google Play Store
npm run mobile:android
# In Android Studio: Generate Signed Bundle → Upload
```

## 🎨 Customization

### Colors

Edit `styles/globals.css` to change the color scheme:

```css
/* Change gradient background */
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #your-colors);
}
```

### App Name

Edit `package.json`:

```json
{
  "name": "my-todo-app",
  "build": {
    "productName": "My Todo App"
  }
}
```

## 📝 License

MIT

## 🙏 Credits

Built with ❤️ using:
- [INDJS](https://www.npmjs.com/package/indjs)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Electron](https://www.electronjs.org/)
- [Capacitor](https://capacitorjs.com/)

---

**Made with INDJS Framework - One Codebase, All Platforms!** 🚀
