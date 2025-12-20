# 📱 TaskFlow - Full-Featured Mobile Application

A **beautiful, premium, full-featured** cross-platform task management application built with **INDJS Framework**. Run the same codebase on **Web**, **Desktop (Electron)**, and **Mobile (Android/iOS)**.

![INDJS](https://img.shields.io/badge/INDJS-Universal%20Framework-blueviolet)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Capacitor](https://img.shields.io/badge/Capacitor-6.0.0-blue)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.3.0-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📋 Task Management
- ✅ **Full CRUD Operations** - Add, Edit, Complete & Delete Tasks
- 🏷️ **Priority Levels** - High, Medium, Low priority tasks with color coding
- 📁 **Category Organization** - Work, Personal, Shopping, Health, Study, etc.
- 📅 **Due Dates** - Set deadlines and get overdue alerts
- 🔍 **Smart Filters** - View All, Active, or Completed tasks
- 🔎 **Advanced Search** - Search by title, description, or category
- 📊 **Real-time Statistics** - Track completion rates, streaks, and productivity

### 🎨 Beautiful UI/UX
- 💎 **Premium Gradient Design** - Modern, vibrant color schemes
- ✨ **Smooth Animations** - Delightful micro-interactions
- 📱 **Mobile-First Design** - Optimized for touch interactions
- 🌙 **Dark Mode Support** - Easy on the eyes
- 🎯 **Glassmorphism Effects** - Modern blur effects
- 🎨 **Custom Scrollbars** - Beautiful gradient scrollbars

### 🔔 Notifications & Alerts
- 📨 **In-App Notifications** - Task reminders and updates
- 🔴 **Unread Badge** - Visual notification counter
- ⚠️ **Overdue Alerts** - Never miss a deadline
- 📊 **Smart Insights** - Productivity tips and stats

### ⚙️ Settings & Customization
- 🌓 **Theme Toggle** - Switch between light and dark mode
- 🔔 **Notification Preferences** - Email, push, and sound settings
- 📅 **Date & Time Settings** - Customize formats and week start
- 🌐 **Language Support** - Multi-language ready
- 💾 **Data Management** - Backup, restore, and export

### 📊 Statistics & Analytics
- 📈 **Completion Rate** - Track your productivity percentage
- 🔥 **Streak Tracking** - Maintain your momentum
- ⭐ **Points System** - Gamified task completion
- 📁 **Category Insights** - See your most active categories
- 📊 **Visual Stats** - Beautiful stat cards with trends
- ⚠️ **Overdue Tracking** - Monitor pending tasks

### 💾 Data Persistence
- 🗄️ **LocalStorage Integration** - All data persists across sessions
- 🔄 **Auto-Save** - Changes saved automatically
- 📥 **Export/Import** - Backup your data as JSON

### 🌐 Universal Components
- 📦 **INDJS Components** - Work seamlessly across all platforms
- 🎯 **Reusable Design** - Modular, maintainable code
- 🚀 **Performance Optimized** - Fast and responsive

## 🚀 Tech Stack

- **Framework**: [INDJS](https://github.com/Rohitsharma6377/IND) - Universal React Framework
- **UI Library**: React 18.3.1
- **State Management**: Redux Toolkit with Persistence
- **Styling**: Tailwind CSS
- **Mobile**: Capacitor 6.0
- **Build Tool**: Vite 5.4
- **Icons**: Emoji-based (work everywhere!)

## 📦 Installation

```bash
# Navigate to mobile-app directory
cd mobile-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at **http://localhost:3000** 🎉

## 🛠️ Available Scripts

### Web Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test             # Run tests
```

### Android Development
```bash
npm run android:setup    # Add Android platform (first time only)
npm run android:sync     # Sync web assets to Android
npm run android:open     # Open in Android Studio
```

### iOS Development
```bash
npm run ios:setup        # Add iOS platform (first time only)
npm run ios:sync         # Sync web assets to iOS
npm run ios:open         # Open in Xcode
```

## 📱 Building for Mobile

### Android

1. **Build the web app**:
   ```bash
   npm run build
   ```

2. **Sync to Android**:
   ```bash
   npm run android:sync
   ```

3. **Open in Android Studio**:
   ```bash
   npm run android:open
   ```

4. **Run on Device/Emulator**:
   - In Android Studio, click the "Run" button (▶️)
   - Select your device or emulator
   - Wait for the build to complete

### iOS (macOS only)

1. **Build the web app**:
   ```bash
   npm run build
   ```

2. **Sync to iOS**:
   ```bash
   npm run ios:sync
   ```

3. **Open in Xcode**:
   ```bash
   npm run ios:open
   ```

4. **Run on Simulator/Device**:
   - Select your target device in Xcode
   - Click the "Run" button (▶️)

## 🏗️ Project Structure

```
mobile-app/
├── pages/                      # File-based routing
│   ├── index.jsx              # Home page (Tasks)
│   ├── about.jsx              # About page
│   ├── categories.jsx         # Categories page
│   ├── statistics.jsx         # Statistics page
│   ├── profile.jsx            # User profile
│   ├── search.jsx             # Search page
│   ├── notifications.jsx      # Notifications center
│   ├── settings.jsx           # Settings page
│   └── _layout.jsx            # Global layout wrapper
├── components/                # React components
│   ├── TaskCard.jsx           # Individual task card
│   ├── AddTaskModal.jsx       # Add/edit task modal
│   ├── BottomNav.jsx          # Bottom navigation bar
│   ├── Button.jsx             # Reusable button
│   ├── SearchBar.jsx          # Search input component
│   ├── NotificationCard.jsx   # Notification item
│   ├── SettingItem.jsx        # Settings row component
│   ├── StatCard.jsx           # Statistics card
│   ├── EmptyState.jsx         # Empty state display
│   └── PlatformInfo.jsx       # Platform detection
├── utils/                     # Utilities
│   ├── store.js               # Basic Redux store
│   ├── persistedStore.js      # Redux store with persistence
│   ├── taskSlice.js           # Task state management
│   ├── userSlice.js           # User state management
│   └── themeSlice.js          # Theme state management
├── styles/                    # Stylesheets
│   └── globals.css            # Global styles & animations
├── public/                    # Static assets
├── android/                   # Android native project
├── App.jsx                    # Main app component
├── capacitor.config.json      # Capacitor configuration
├── indjs.config.js            # INDJS configuration
└── package.json
```

## 🎯 Key Features Explained

### 1. Redux State Management with Persistence
The app uses Redux Toolkit with localStorage persistence:
- **taskSlice.js**: Task CRUD operations
- **userSlice.js**: Profile, notifications, settings, stats
- **themeSlice.js**: Dark/light mode and accent colors
- **persistedStore.js**: Auto-saves all state to localStorage

### 2. Universal Components
All UI components use INDJS universal components:
```jsx
import { View, Text, Pressable, ScrollView, TextInput, Modal } from 'indjs';

// These components automatically adapt to:
// - Web: Render as <div>, <span>, <button>, etc.
// - Mobile: Render as native React Native components
```

### 3. Beautiful Design System
- **Gradient Backgrounds**: Violet to fuchsia gradients throughout
- **Shadow Effects**: Multi-layered shadows for depth
- **Smooth Transitions**: All interactions are animated
- **Custom Scrollbars**: Gradient-styled scrollbars
- **Glassmorphism**: Frosted glass effects on modals

### 4. Smart Features
- **Real-time Search**: Instant filtering as you type
- **Live Statistics**: Dynamic calculation of all metrics
- **Overdue Detection**: Automatic flagging of missed deadlines
- **Category Analytics**: Track your most-used categories
- **Streak System**: Motivational streaks for daily completion

## 📸 App Screens

### Main App Screens
- **🏠 Tasks**: Main task list with filters and quick add
- **📁 Categories**: Browse tasks by category
- **📊 Statistics**: Detailed productivity analytics
- **👤 Profile**: User profile and settings access

### Additional Pages
- **🔍 Search**: Advanced task search
- **🔔 Notifications**: Notification center
- **⚙️ Settings**: Comprehensive app settings
- **ℹ️ About**: App information and credits

## 🎨 Components Library

### Core Components
- **TaskCard**: Displays task with priority, category, due date
- **AddTaskModal**: Beautiful modal for creating/editing tasks
- **BottomNav**: Animated bottom navigation with active states
- **SearchBar**: Advanced search with clear and focus states
- **NotificationCard**: Rich notification display
- **SettingItem**: Flexible settings row (toggle, select, navigate)
- **StatCard**: Beautiful statistics card with trends
- **EmptyState**: Elegant empty state with optional actions

## 🚨 Key Differences from Basic Template

### Enhanced Features
✅ **Persistent State** - Data survives app restarts
✅ **Dark Mode** - Full theme support
✅ **Search Page** - Advanced search functionality
✅ **Notifications** - Full notification system
✅ **Settings Page** - Comprehensive settings
✅ **Real Statistics** - Actual data-driven stats
✅ **User Profile** - Dynamic user data from Redux
✅ **Navigation** - Deep linking ready
✅ **Empty States** - Beautiful fallbacks
✅ **Overdue Alerts** - Smart deadline tracking

## 🐛 Troubleshooting

### Common Issues

**Issue**: App doesn't load data after refresh
```bash
# Solution: Check browser localStorage
# Open DevTools → Application → Local Storage
# Look for 'taskflow_state'
```

**Issue**: Notifications not updating
```bash
# Solution: The notifications are in Redux state
# Check state.user.notifications in DevTools
```

**Issue**: Dark mode not working
```bash
# Solution: Theme state is persisted
# Clear localStorage and refresh if stuck
```

## 🚀 Deployment

### Web Deployment (Vercel/Netlify)
```bash
npm run build
# Deploy the .indjs/static folder
```

### Android Play Store
1. Build signed AAB in Android Studio
2. Upload to Google Play Console
3. Follow Play Store guidelines

### iOS App Store
1. Archive in Xcode
2. Upload to App Store Connect
3. Submit for review

## 📝 Customization Guide

### Change Theme Colors
Edit `tailwind.config.cjs` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // Add custom colors
    }
  }
}
```

### Add New Redux Slices
1. Create a new slice in `utils/`
2. Add to `persistedStore.js`
3. Access via `useSelector` in components

### Create New Pages
1. Add a new `.jsx` file in `pages/`
2. INDJS automatically creates the route
3. Add navigation in `BottomNav.jsx` if needed

## 📚 Documentation

- 📖 [INDJS Documentation](https://netcurion.vercel.app)
- 🐛 [Issue Tracker](https://github.com/Rohitsharma6377/IND/issues)
- 📧 [Email Support](mailto:netcurion@outlook.com)

## 🎯 Roadmap

- [ ] Cloud Sync (Firebase/Supabase)
- [ ] Collaboration Features
- [ ] Voice Input for Tasks
- [ ] Widget Support
- [ ] Calendar Integration
- [ ] Task Templates
- [ ] Habits Tracking
- [ ] Desktop App (Electron)

## 📝 License

MIT © INDJS Team

## 🙏 Acknowledgments

- Built with [INDJS Framework](https://github.com/Rohitsharma6377/IND)
- Powered by [React](https://reactjs.org/)
- Mobile support by [Capacitor](https://capacitorjs.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State managed with [Redux Toolkit](https://redux-toolkit.js.org/)

---

<div align="center">

**Made with ❤️ using INDJS**

⭐ Star us on [GitHub](https://github.com/Rohitsharma6377/IND) if you like this project!

**This is a FULL, PREMIUM, PRODUCTION-READY mobile application!**

</div>
