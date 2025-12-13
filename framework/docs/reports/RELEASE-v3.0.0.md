# INDJS v3.0.0 Release Notes

We are thrilled to announce the release of INDJS v3.0.0, a major milestone in our journey to build the ultimate universal full-stack framework.

## 🌟 Highlights

### 🌍 Universal Component Engine
Write once, run everywhere! INDJS v3 introduces a standardized component system (`View`, `Text`, `Image`, etc.) that renders to HTML on the web and native UI on mobile (React Native/Expo).

### 📱 Unified Mobile & Desktop Support
- **Mobile First**: Native support for iOS and Android via Capacitor or React Native integration.
- **Desktop Ready**: Built-in Electron presets for building cross-platform desktop apps.
- **Commands**: New CLI commands `indjs mobile dev`, `indjs desktop dev` to streamline multi-platform development.

### 📦 Monorepo Support
Managing large-scale applications is now easier with built-in Workspace support.
- Create a monorepo with `indjs create --workspace`.
- Optimized for TurboRepo.
- Shared packages support (`@repo/ui`, `@repo/config`).

### 🔒 Authentication System 2.0
- **Built-in OAuth**: Google, GitHub, and Discord providers out of the box.
- **Session Management**: Secure, scalable session handling (Redis/Memory).
- **Role-Based Access Control (RBAC)**: Easy-to-use middleware for protecting routes.

### 🗄️ Database Layer 2.0
- **Multi-DB Support**: Seamlessly switch between PostgreSQL, MongoDB, MySQL, SQLite, and Prisma.
- **Connection Pooling**: robust management of database connections.
- **Migration System**: Built-in migration tracking and execution.

### 🛠️ CLI Enhancements
- **New Generator**: `indjs generate model <name>` with interactive database selection.
- **Diagnostics**: `indjs doctor` and `indjs analyze` to keep your project healthy.
- **Performance Profiling**: `indjs profiler` to identify bottlenecks.

## 🚀 Upgrade Guide

To upgrade an existing project:
1. Update `package.json`:
   ```json
   "indjs": "^3.0.0"
   ```
2. Run `npm install`.
3. For mobile support, run `indjs mobile init`.

## 🐛 Bug Fixes & Improvements
- Fixed SSG revalidation timing.
- Improved error handling in CLI generators.
- Enhanced TypeScript type definitions for API routes.

---
**Made with ❤️ by the INDJS Team**
