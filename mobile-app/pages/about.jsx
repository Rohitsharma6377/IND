import React from 'react';
import { View, Text, ScrollView, Pressable, FlatList } from 'indjs';

export default function About() {
    const features = [
        {
            icon: '✨',
            title: 'Beautiful Design',
            description: 'Modern, premium UI with smooth animations and gradients'
        },
        {
            icon: '📱',
            title: 'Mobile First',
            description: 'Optimized for mobile devices with responsive design'
        },
        {
            icon: '⚡',
            title: 'Fast & Efficient',
            description: 'Built with React and Redux for optimal performance'
        },
        {
            icon: '🎯',
            title: 'Task Priority',
            description: 'Organize tasks by priority levels and categories'
        },
        {
            icon: '📅',
            title: 'Due Dates',
            description: 'Set deadlines and never miss important tasks'
        },
        {
            icon: '🔄',
            title: 'Real-time Updates',
            description: 'Instant state management with Redux Toolkit'
        }
    ];

    const techStack = [
        { name: 'INDJS', desc: 'Universal Framework' },
        { name: 'React 18', desc: 'UI Library' },
        { name: 'Redux Toolkit', desc: 'State Management' },
        { name: 'Tailwind CSS', desc: 'Styling' }
    ];

    const renderFeature = ({ item, index }) => (
        <View
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <Text className="text-4xl mb-4">{item.icon}</Text>
            <Text className="text-xl font-bold text-gray-800 mb-2">{item.title}</Text>
            <Text className="text-gray-600">{item.description}</Text>
        </View>
    );

    const renderTech = ({ item, index }) => (
        <View key={index} className="text-center p-4 rounded-xl bg-gradient-to-br from-violet-50 to-fuchsia-50">
            <Text className="font-bold text-lg text-gray-800 mb-1">{item.name}</Text>
            <Text className="text-sm text-gray-600">{item.desc}</Text>
        </View>
    );

    return (
        <ScrollView className="flex-1">
            <View className="max-w-6xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <View className="text-center mb-16">
                    <View className="inline-block mb-6">
                        <View className="w-24 h-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl flex items-center justify-center shadow-2xl mx-auto">
                            <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </View>
                    </View>
                    <Text className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        TaskFlow
                    </Text>
                    <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A simple yet powerful task management app built with the INDJS framework
                    </Text>
                </View>

                {/* Features Grid */}
                <View className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <FlatList
                        data={features}
                        renderItem={renderFeature}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        contentContainerStyle={{ gap: 24 }}
                    />
                </View>

                {/* Tech Stack */}
                <View className="bg-white rounded-3xl p-8 shadow-xl mb-16">
                    <Text className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        Built With
                    </Text>
                    <View className="grid md:grid-cols-4 gap-6">
                        <FlatList
                            data={techStack}
                            renderItem={renderTech}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={4}
                            contentContainerStyle={{ gap: 24 }}
                        />
                    </View>
                </View>

                {/* CTA Section */}
                <View className="text-center">
                    <View className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl p-12 shadow-2xl">
                        <Text className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Organized?
                        </Text>
                        <Text className="text-white text-opacity-90 mb-8 text-lg">
                            Start managing your tasks efficiently today
                        </Text>
                        <Pressable
                            onPress={() => window.location.href = '/'}
                            className="inline-block px-8 py-4 bg-white text-violet-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                        >
                            <Text className="text-violet-600 font-bold">Go to Tasks</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}