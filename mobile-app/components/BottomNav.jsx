import React from 'react';
import { View, Pressable, Text } from 'indjs';

export default function BottomNav({ currentPage = 'tasks', onNavigate }) {
    const navItems = [
        { id: 'tasks', label: 'Tasks', icon: '📝', activeIcon: '✅' },
        { id: 'categories', label: 'Categories', icon: '📁', activeIcon: '📂' },
        { id: 'statistics', label: 'Stats', icon: '📊', activeIcon: '📈' },
        { id: 'profile', label: 'Profile', icon: '👤', activeIcon: '👨' }
    ];

    return (
        <View className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <View className="flex flex-row items-center justify-around px-2 py-3 pb-safe">
                {navItems.map((item, index) => {
                    const isActive = currentPage === item.id;
                    return (
                        <Pressable
                            key={index}
                            onPress={() => onNavigate(item.id)}
                            className="flex-1 flex items-center justify-center py-2"
                        >
                            <View className={`flex items-center justify-center transition-all duration-300 ${isActive ? 'transform scale-110' : ''}`}>
                                <View className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${isActive ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600' : 'bg-transparent'}`}>
                                    <Text className="text-2xl">
                                        {isActive ? item.activeIcon : item.icon}
                                    </Text>
                                </View>
                                <Text className={`text-xs font-medium ${isActive ? 'text-violet-600' : 'text-gray-600'}`}>
                                    {item.label}
                                </Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
