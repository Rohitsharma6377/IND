import React from 'react';
import { View, Text, ScrollView, Pressable } from 'indjs';

export default function Categories() {
    const categories = [
        { name: 'Work', count: 8, color: 'from-blue-500 to-blue-600', icon: '💼', tasks: ['Team Meeting', 'Project Review', 'Email Clients'] },
        { name: 'Personal', count: 5, color: 'from-purple-500 to-purple-600', icon: '🏠', tasks: ['Grocery Shopping', 'Call Mom', 'Read Book'] },
        { name: 'Shopping', count: 3, color: 'from-pink-500 to-pink-600', icon: '🛍️', tasks: ['Buy Groceries', 'New Shoes', 'Gift for Friend'] },
        { name: 'Health', count: 4, color: 'from-green-500 to-green-600', icon: '💪', tasks: ['Gym Workout', 'Yoga Session', 'Meal Prep'] },
        { name: 'Study', count: 6, color: 'from-yellow-500 to-yellow-600', icon: '📚', tasks: ['Read Chapter 5', 'Complete Assignment', 'Practice Coding'] },
        { name: 'Finance', count: 2, color: 'from-emerald-500 to-emerald-600', icon: '💰', tasks: ['Pay Bills', 'Budget Review'] },
        { name: 'Travel', count: 1, color: 'from-cyan-500 to-cyan-600', icon: '✈️', tasks: ['Book Flight'] },
        { name: 'Other', count: 3, color: 'from-gray-500 to-gray-600', icon: '📌', tasks: ['Miscellaneous Tasks'] }
    ];

    return (
        <ScrollView className="flex-1 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
            <View className="px-4 py-8">
                {/* Header */}
                <View className="mb-8">
                    <Text className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                        Categories
                    </Text>
                    <Text className="text-gray-600 text-lg">Organize tasks by category</Text>
                </View>

                {/* Category Grid */}
                <View className="grid grid-cols-2 gap-4 mb-8">
                    {categories.map((category, index) => (
                        <Pressable
                            key={index}
                            className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <View className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3`}>
                                <Text className="text-3xl">{category.icon}</Text>
                            </View>
                            <Text className="text-lg font-bold text-gray-800 mb-1">{category.name}</Text>
                            <Text className="text-sm text-gray-600">{category.count} tasks</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Recent by Category */}
                <View className="mb-8">
                    <Text className="text-xl font-bold text-gray-800 mb-4">Recent Tasks by Category</Text>
                    {categories.slice(0, 4).map((category, index) => (
                        <View key={index} className="bg-white rounded-2xl p-5 shadow-lg mb-4">
                            <View className="flex flex-row items-center gap-3 mb-3">
                                <View className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                                    <Text className="text-xl">{category.icon}</Text>
                                </View>
                                <Text className="text-lg font-bold text-gray-800">{category.name}</Text>
                            </View>
                            <View className="space-y-2">
                                {category.tasks.map((task, taskIndex) => (
                                    <View key={taskIndex} className="flex flex-row items-center gap-2 py-2">
                                        <View className="w-5 h-5 rounded border-2 border-gray-300"></View>
                                        <Text className="text-gray-700">{task}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}
