import React from 'react';

export default function PlatformInfo() {
  const [platform, setPlatform] = React.useState('Loading...');
  const [info, setInfo] = React.useState({});

  React.useEffect(() => {
    detectPlatform();
  }, []);

  const detectPlatform = async () => {
    if (typeof window !== 'undefined' && window.process && window.process.type) {
      setPlatform('Desktop (Electron)');
      setInfo({ type: 'Electron', version: window.process.versions.electron });
      return;
    }
    if (typeof window !== 'undefined' && window.Capacitor) {
      try {
        const { Capacitor } = await import('@capacitor/core');
        setPlatform(Capacitor.getPlatform() === 'web' ? 'Web' : 'Mobile (' + Capacitor.getPlatform() + ')');
        setInfo({ type: 'Capacitor', native: Capacitor.isNativePlatform() });
      } catch (e) {
        setPlatform('Web');
      }
    } else {
      setPlatform('Web Browser');
      setInfo({ type: 'Web', agent: navigator.userAgent });
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl shadow-xl">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">🎯 Platform: {platform}</h3>
        <div className="bg-white/10 p-3 rounded-lg">
          <pre className="text-sm font-mono text-white opacity-80 overflow-auto">
            {JSON.stringify(info, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}