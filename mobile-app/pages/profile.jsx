import React from 'react';
import { View, Text, ScrollView, Pressable } from 'indjs';

export default function Profile() {
    const userStats = [
        { label: 'Tasks Completed', value: '127', icon: '✅' },
        { label: 'Active Tasks', value: '12', icon: '📝' },
        { label: 'Streak Days', value: '7', icon: '🔥' },
        { label: 'Total Points', value: '1,250', icon: '⭐' }
    ];

    const achievements = [
        { title: 'Early Bird', description: 'Complete 5 tasks before 9 AM', earned: true, icon: '🌅' },
        { title: 'Productivity Master', description: 'Complete 50 tasks', earned: true, icon: '🏆' },
        { title: 'Week Warrior', description: '7 day streak', earned: true, icon: '💪' },
        { title: 'Task Champion', description: 'Complete 100 tasks', earned: false, icon: '👑' }
    ];

    return (
        <ScrollView className="flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
            <View className="px-4 py-8">
                {/* Profile Header */}
                <View className="items-center mb-8">
                    <View className="w-24 h-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-4">
                        <Text className="text-4xl text-white">👤</Text>
                    </View>
                    <Text className="text-2xl font-bold text-gray-800 mb-1">John Doe</Text>
                    <Text className="text-gray-600">john.doe@example.com</Text>
                    <View className="mt-4 px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full">
                        <Text className="text-white font-semibold">Pro Member</Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View className="mb-8">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Your Stats</Text>
                    <View className="grid grid-cols-2 gap-4">
                        {userStats.map((stat, index) => (
                            <View key={index} className="bg-white rounded-2xl p-4 shadow-lg">
                                <Text className="text-3xl mb-2">{stat.icon}</Text>
                                <Text className="text-2xl font-bold text-violet-600 mb-1">{stat.value}</Text>
                                <Text className="text-sm text-gray-600">{stat.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Achievements */}
                <View className="mb-8">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Achievements</Text>
                    <View className="space-y-4">
                        {achievements.map((achievement, index) => (
                            <View
                                key={index}
                                className={`bg-white rounded-2xl p-4 shadow-lg ${achievement.earned ? '' : 'opacity-50'}`}
                            >
                                <View className="flex flex-row items-center gap-4">
                                    <View className={`w-14 h-14 rounded-full flex items-center justify-center ${achievement.earned ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600' : 'bg-gray-200'}`}>
                                        <Text className="text-2xl">{achievement.icon}</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-lg font-bold text-gray-800 mb-1">{achievement.title}</Text>
                                        <Text className="text-sm text-gray-600">{achievement.description}</Text>
                                    </View>
                                    {achievement.earned && (
                                        <View className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <Text className="text-white text-xl">✓</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Settings */}
                <View className="mb-8">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Settings</Text>
                    <View className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {['Notifications', 'Theme', 'Language', 'Privacy', 'Help & Support', 'Logout'].map((item, index) => (
                            <Pressable
                                key={index}
                                className={`px-4 py-4 flex flex-row items-center justify-between ${index !== 5 ? 'border-b border-gray-100' : ''}`}
                            >
                                <Text className="text-gray-800 font-medium">{item}</Text>
                                <Text className="text-gray-400">›</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
