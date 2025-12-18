import React from 'react';
import { Card, Text, Stack, View, Grid } from 'indjs';

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
        <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl rounded-2xl overflow-hidden border border-white/10">
            <Stack spacing={6} className="p-2">
                <View className="flex flex-row items-center justify-between">
                    <Stack spacing={1}>
                        <Text className="text-3xl font-bold text-white tracking-tight">🎯 Platform Info</Text>
                        <Text className="text-indigo-200">Running natively on your device</Text>
                    </Stack>
                    <View className="bg-white/20 p-3 rounded-full backdrop-blur-md">
                        <Text className="text-2xl">📱</Text>
                    </View>
                </View>

                {/* Status Card */}
                <View className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <Text className="text-indigo-200 text-sm font-semibold uppercase tracking-wider mb-1">Current Environment</Text>
                    <Text className="text-2xl font-bold text-white flex items-center">
                        <View className="w-3 h-3 rounded-full bg-green-400 mr-3 animate-pulse"></View>
                        {platform}
                    </Text>
                </View>

                {/* Details Section */}
                <View className="bg-black/20 rounded-xl p-4 border border-white/5">
                    <Text className="text-xs font-mono text-indigo-300 mb-2">debug_info</Text>
                    <View className="overflow-x-auto">
                        <Text className="text-xs font-mono text-indigo-100/80 leading-relaxed whitespace-pre">
                            {JSON.stringify(info, null, 2).replace(/"/g, '')}
                        </Text>
                    </View>
                </View>

                {/* Capabilities */}
                <View className="bg-white/5 rounded-xl p-4">
                    <Text className="font-semibold text-white mb-3">✨ Universal Capabilities</Text>
                    <Grid columns={{ default: 1, sm: 3 }} gap={2}>
                        <View className="bg-white/10 p-2 rounded-lg text-center backdrop-blur-sm">
                            <Text className="text-sm">🌍 Web</Text>
                        </View>
                        <View className="bg-white/10 p-2 rounded-lg text-center backdrop-blur-sm">
                            <Text className="text-sm">🖥️ Desktop</Text>
                        </View>
                        <View className="bg-white/10 p-2 rounded-lg text-center backdrop-blur-sm">
                            <Text className="text-sm">📱 Mobile</Text>
                        </View>
                    </Grid>
                </View>
            </Stack>
        </Card>
    );
}
