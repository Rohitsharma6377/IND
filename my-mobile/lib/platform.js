export const getPlatform = () => {
  if (typeof window === 'undefined') return 'Server';
  if (window.Capacitor) return window.Capacitor.getPlatform(); // 'web', 'ios', 'android'
  if (window.process && window.process.type === 'renderer') return 'Desktop (Electron)';
  return 'Web';
}; 