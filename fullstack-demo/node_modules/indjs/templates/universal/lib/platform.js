// Platform detection and utilities
import { Capacitor } from '@capacitor/core';

/**
 * Detect if running in Electron
 */
export function isElectron() {
    return typeof window !== 'undefined' &&
        typeof window.process === 'object' &&
        window.process.type === 'renderer';
}

/**
 * Detect if running on web
 */
export function isWeb() {
    return !isElectron() && !Capacitor.isNativePlatform();
}

/**
 * Detect if running on mobile (iOS or Android)
 */
export function isMobile() {
    return Capacitor.isNativePlatform();
}

/**
 * Detect if running on desktop (Electron)
 */
export function isDesktop() {
    return isElectron();
}

/**
 * Detect if running on iOS
 */
export function isIOS() {
    return Capacitor.getPlatform() === 'ios';
}

/**
 * Detect if running on Android
 */
export function isAndroid() {
    return Capacitor.getPlatform() === 'android';
}

/**
 * Get current platform
 * @returns {'web' | 'ios' | 'android' | 'electron'}
 */
export function getPlatform() {
    if (isElectron()) return 'electron';
    if (isIOS()) return 'ios';
    if (isAndroid()) return 'android';
    return 'web';
}

/**
 * Get platform-specific value
 */
export function platformValue(values) {
    const platform = getPlatform();
    return values[platform] || values.default;
}

/**
 * Execute platform-specific code
 */
export function platformSwitch(handlers) {
    const platform = getPlatform();
    const handler = handlers[platform] || handlers.default;
    if (handler) {
        return handler();
    }
}

// Desktop (Electron) utilities
export const electron = {
    get ipcRenderer() {
        if (isElectron()) {
            return window.require('electron').ipcRenderer;
        }
        return null;
    },

    async showOpenDialog(options) {
        if (isElectron()) {
            return await this.ipcRenderer.invoke('show-open-dialog', options);
        }
        return null;
    },

    async showSaveDialog(options) {
        if (isElectron()) {
            return await this.ipcRenderer.invoke('show-save-dialog', options);
        }
        return null;
    },

    minimizeWindow() {
        if (isElectron()) {
            this.ipcRenderer.send('minimize-window');
        }
    },

    maximizeWindow() {
        if (isElectron()) {
            this.ipcRenderer.send('maximize-window');
        }
    },

    closeWindow() {
        if (isElectron()) {
            this.ipcRenderer.send('close-window');
        }
    }
};

// Mobile (Capacitor) utilities
export const mobile = {
    async camera() {
        if (isMobile()) {
            const { Camera } = await import('@capacitor/camera');
            return Camera;
        }
        return null;
    },

    async geolocation() {
        if (isMobile()) {
            const { Geolocation } = await import('@capacitor/geolocation');
            return Geolocation;
        }
        return null;
    },

    async storage() {
        if (isMobile()) {
            const { Preferences } = await import('@capacitor/preferences');
            return Preferences;
        }
        return null;
    },

    async pushNotifications() {
        if (isMobile()) {
            const { PushNotifications } = await import('@capacitor/push-notifications');
            return PushNotifications;
        }
        return null;
    },

    async share() {
        if (isMobile()) {
            const { Share } = await import('@capacitor/share');
            return Share;
        }
        return null;
    }
};

// Storage abstraction (works on all platforms)
export const storage = {
    async get(key) {
        if (isMobile()) {
            const Preferences = await mobile.storage();
            const { value } = await Preferences.get({ key });
            return value;
        } else if (isElectron()) {
            // Use electron-store or localStorage
            return localStorage.getItem(key);
        } else {
            return localStorage.getItem(key);
        }
    },

    async set(key, value) {
        if (isMobile()) {
            const Preferences = await mobile.storage();
            await Preferences.set({ key, value });
        } else if (isElectron()) {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, value);
        }
    },

    async remove(key) {
        if (isMobile()) {
            const Preferences = await mobile.storage();
            await Preferences.remove({ key });
        } else {
            localStorage.removeItem(key);
        }
    },

    async clear() {
        if (isMobile()) {
            const Preferences = await mobile.storage();
            await Preferences.clear();
        } else {
            localStorage.clear();
        }
    }
};

// Export all
export default {
    isElectron,
    isWeb,
    isMobile,
    isDesktop,
    isIOS,
    isAndroid,
    getPlatform,
    platformValue,
    platformSwitch,
    electron,
    mobile,
    storage
};
