import React from 'react';
import { View, Pressable } from 'indjs';
import { HiHome, HiCalendar } from 'react-icons/hi';
import { useRouter } from 'indjs';

export default function BottomNav() {
    const router = useRouter();
    const currentPath = router.pathname;

    const navItems = [
        {
            id: 'home',
            path: '/',
            icon: HiHome
        },
        {
            id: 'calendar',
            path: '/calendar',
            icon: HiCalendar
        }
    ];

    return (
        // Clean white bar, rounded top, fixed at bottom
        <View className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[35px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-50">
            <View className="flex flex-row items-center justify-around px-6 py-4 pb-6">
                {navItems.map((item, index) => {
                    const isActive = currentPath === item.path;
                    const IconComponent = item.icon;
                    return (
                        <Pressable
                            key={index}
                            onPress={() => router.push(item.path)}
                            className="flex-1 flex items-center justify-center"
                        >
                            <View className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${isActive ? 'bg-purple-600 shadow-lg shadow-purple-200' : 'bg-transparent'
                                }`}>
                                <IconComponent
                                    className={`w-7 h-7 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400'
                                        }`}
                                />
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
