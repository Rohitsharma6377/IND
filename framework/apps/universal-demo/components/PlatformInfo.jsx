import React from 'react';
import { Card, Text, Stack, View } from 'indjs';

/**
 * Platform Info Component
 * Displays information about the current platform (Web, Desktop, or Mobile)
 */
export default function PlatformInfo() {
    const [platform, setPlatform] = React.useState('Loading...');
    const [info, setInfo] = React.useState({});

    React.useEffect(() => {
        detectPlatform();
    }, []);

    const detectPlatform = async () => {
        // Check if running in Electron
        if (typeof window !== 'undefined' && window.process && window.process.type) {
            setPlatform('Desktop (Electron)');
            setInfo({
                type: 'Electron',
                version: window.process.versions.electron || 'Unknown',
                node: window.process.versions.node || 'Unknown',
                chrome: window.process.versions.chrome || 'Unknown'
            });
            return;
        }

        // Check if Capacitor is available (mobile)
        if (typeof window !== 'undefined' && window.Capacitor) {
            try {
                const { Capacitor } = await import('@capacitor/core');
                const platformName = Capacitor.getPlatform();

                setPlatform(platformName === 'web' ? 'Web Browser' : `Mobile (${platformName})`);
                setInfo({
                    type: 'Capacitor',
                    platform: platformName,
                    isNative: Capacitor.isNativePlatform()
                });

                // Try to get app info on mobile
                if (Capacitor.isNativePlatform()) {
                    try {
                        const { App } = await import('@capacitor/app');
                        const appInfo = await App.getInfo();
                        setInfo(prev => ({
                            ...prev,
                            appName: appInfo.name,
                            version: appInfo.version,
                            build: appInfo.build
                        }));
                    } catch (e) {
                        console.log('Could not get app info:', e);
                    }
                }
            } catch (e) {
                setPlatform('Web Browser');
                setInfo({ type: 'Web' });
            }
        } else {
            // Default to web
            setPlatform('Web Browser');
            setInfo({
                type: 'Web',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
            });
        }
    };

    return (
        <Card variant="gradient">
            <Stack spacing={4}>
                <Text className="text-2xl font-bold mb-2">🎯 Platform Information</Text>

                <Card variant="default" className="bg-white/10 backdrop-blur-sm">
                    <Text className="text-lg mb-2">
                        Running on: <Text className="text-yellow-300 font-semibold inline">{platform}</Text>
                    </Text>
                </Card>

                <Card variant="default" className="bg-white/10 backdrop-blur-sm">
                    <Stack spacing={2}>
                        <Text className="text-lg font-semibold">Details:</Text>
                        <View className="overflow-auto">
                            <Text className="text-sm whitespace-pre font-mono">
                                {JSON.stringify(info, null, 2)}
                            </Text>
                        </View>
                    </Stack>
                </Card>

                <View className="text-sm opacity-75">
                    <Text className="mb-2">✅ This app can run on:</Text>
                    <Stack spacing={1} className="list-disc list-inside">
                        <Text className="text-sm">• Web browsers (Chrome, Firefox, Safari, etc.)</Text>
                        <Text className="text-sm">• Desktop (Windows, macOS, Linux via Electron)</Text>
                        <Text className="text-sm">• Mobile (iOS & Android via Capacitor)</Text>
                    </Stack>
                </View>
            </Stack>
        </Card>
    );
}
