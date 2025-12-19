import React from 'react';
import { View, Text, ScrollView, Pressable } from 'indjs';

export default function Statistics() {
    const weekData = [
        { day: 'Mon', completed: 8, total: 10 },
        { day: 'Tue', completed: 6, total: 8 },
        { day: 'Wed', completed: 10, total: 12 },
        { day: 'Thu', completed: 7, total: 9 },
        { day: 'Fri', completed: 9, total: 11 },
        { day: 'Sat', completed: 5, total: 6 },
        { day: 'Sun', completed: 4, total: 5 }
    ];

    const insights = [
        { title: 'Most Productive Day', value: 'Wednesday', icon: '📈', color: 'from-green-500 to-green-600' },
        { title: 'Average Completion Rate', value: '82%', icon: '🎯', color: 'from-blue-500 to-blue-600' },
        { title: 'Total Time Saved', value: '12 hours', icon: '⏱️', color: 'from-purple-500 to-purple-600' },
        { title: 'Streak Record', value: '14 days', icon: '🔥', color: 'from-orange-500 to-orange-600' }
    ];

    return (
        <ScrollView className="flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
            <View className="px-4 py-8">
                {/* Header */}
                <View className="mb-8">
                    <Text className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                        Statistics
                    </Text>
                    <Text className="text-gray-600 text-lg">Track your productivity</Text>
                </View>

                {/* Weekly Chart */}
                <View className="bg-white rounded-2xl p-5 shadow-lg mb-8">
                    <Text className="text-xl font-bold text-gray-800 mb-4">This Week</Text>
                    <View className="flex flex-row items-end justify-between h-48 mb-4">
                        {weekData.map((day, index) => {
                            const percentage = (day.completed / day.total) * 100;
                            const height = `${percentage}%`;
                            return (
                                <View key={index} className="flex-1 items-center gap-2">
                                    <View className="w-full px-1">
                                        <View
                                            className="bg-gradient-to-t from-violet-600 to-fuchsia-600 rounded-t-lg"
                                            style={{ height }}
                                        ></View>
                                    </View>
                                    <Text className="text-xs text-gray-600 font-medium">{day.day}</Text>
                                    <Text className="text-xs text-gray-500">{day.completed}/{day.total}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Insights */}
                <View className="mb-8">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Insights</Text>
                    <View className="grid grid-cols-2 gap-4">
                        {insights.map((insight, index) => (
                            <View key={index} className="bg-white rounded-2xl p-4 shadow-lg">
                                <View className={`w-12 h-12 bg-gradient-to-r ${insight.color} rounded-xl flex items-center justify-center mb-3`}>
                                    <Text className="text-2xl">{insight.icon}</Text>
                                </View>
                                <Text className="text-sm text-gray-600 mb-1">{insight.title}</Text>
                                <Text className="text-xl font-bold text-gray-800">{insight.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Monthly Overview */}
                <View className="bg-white rounded-2xl p-5 shadow-lg mb-8">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Monthly Overview</Text>
                    <View className="space-y-4">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-gray-700">Tasks Completed</Text>
                            <Text className="text-2xl font-bold text-green-600">127</Text>
                        </View>
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-gray-700">Tasks Created</Text>
                            <Text className="text-2xl font-bold text-blue-600">145</Text>
                        </View>
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-gray-700">Completion Rate</Text>
                            <Text className="text-2xl font-bold text-violet-600">87.6%</Text>
                        </View>
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-gray-700">Active Streak</Text>
                            <Text className="text-2xl font-bold text-orange-600">7 days</Text>
                        </View>
                    </View>
                </View>

                {/* Category Breakdown */}
                <View className="bg-white rounded-2xl p-5 shadow-lg">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Category Breakdown</Text>
                    {[
                        { name: 'Work', percentage: 35, color: 'bg-blue-500' },
                        { name: 'Personal', percentage: 25, color: 'bg-purple-500' },
                        { name: 'Shopping', percentage: 15, color: 'bg-pink-500' },
                        { name: 'Health', percentage: 15, color: 'bg-green-500' },
                        { name: 'Other', percentage: 10, color: 'bg-gray-500' }
                    ].map((category, index) => (
                        <View key={index} className="mb-4">
                            <View className="flex flex-row items-center justify-between mb-2">
                                <Text className="text-gray-700 font-medium">{category.name}</Text>
                                <Text className="text-gray-600">{category.percentage}%</Text>
                            </View>
                            <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <View
                                    className={`h-full ${category.color} rounded-full`}
                                    style={{ width: `${category.percentage}%` }}
                                ></View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
