// Platform detection and cross-platform storage
import { Capacitor } from '@capacitor/core';

// Detect platform
export function isElectron() {
    return typeof window !== 'undefined' &&
        typeof window.process === 'object' &&
        window.process.type === 'renderer';
}

export function isWeb() {
    return !isElectron() && !Capacitor.isNativePlatform();
}

export function isMobile() {
    return Capacitor.isNativePlatform();
}

export function getPlatform() {
    if (isElectron()) return 'Desktop (Electron)';
    if (Capacitor.getPlatform() === 'ios') return 'iOS';
    if (Capacitor.getPlatform() === 'android') return 'Android';
    return 'Web';
}

// Cross-platform storage
export const storage = {
    async get(key) {
        if (isMobile()) {
            const { Preferences } = await import('@capacitor/preferences');
            const { value } = await Preferences.get({ key });
            return value;
        } else {
            return localStorage.getItem(key);
        }
    },

    async set(key, value) {
        if (isMobile()) {
            const { Preferences } = await import('@capacitor/preferences');
            await Preferences.set({ key, value });
        } else {
            localStorage.setItem(key, value);
        }
    },

    async remove(key) {
        if (isMobile()) {
            const { Preferences } = await import('@capacitor/preferences');
            await Preferences.remove({ key });
        } else {
            localStorage.removeItem(key);
        }
    },

    async clear() {
        if (isMobile()) {
            const { Preferences } = await import('@capacitor/preferences');
            await Preferences.clear();
        } else {
            localStorage.clear();
        }
    }
};
