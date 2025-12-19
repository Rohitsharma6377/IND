import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, ScrollView } from 'indjs';

export default function AddTaskModal({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        dueDate: ''
    });

    const handleSubmit = () => {
        if (!formData.title.trim()) return;
        onAdd(formData);
    };

    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    return (
        <Modal visible={true} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                <View className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
                    {/* Header */}
                    <View className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-6 py-5 rounded-t-3xl">
                        <View className="flex items-center justify-between">
                            <Text className="text-2xl font-bold text-white">Add New Task</Text>
                            <Pressable
                                onPress={onClose}
                                className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Pressable>
                        </View>
                    </View>

                    {/* Form */}
                    <ScrollView className="p-6">
                        <View className="space-y-5">
                            {/* Title */}
                            <View>
                                <Text className="block text-sm font-semibold text-gray-700 mb-2">
                                    Task Title *
                                </Text>
                                <TextInput
                                    value={formData.title}
                                    onChangeText={(value) => handleChange('title', value)}
                                    placeholder="Enter task title..."
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300"
                                />
                            </View>

                            {/* Description */}
                            <View>
                                <Text className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </Text>
                                <TextInput
                                    value={formData.description}
                                    onChangeText={(value) => handleChange('description', value)}
                                    placeholder="Add details about your task..."
                                    multiline={true}
                                    numberOfLines={3}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300"
                                />
                            </View>

                            {/* Priority */}
                            <View>
                                <Text className="block text-sm font-semibold text-gray-700 mb-2">
                                    Priority
                                </Text>
                                <View className="grid grid-cols-3 gap-3">
                                    {['low', 'medium', 'high'].map((priority) => (
                                        <Pressable
                                            key={priority}
                                            onPress={() => handleChange('priority', priority)}
                                            className={`py-3 px-4 rounded-xl font-medium transition-all duration-300 ${formData.priority === priority
                                                    ? priority === 'high'
                                                        ? 'bg-red-500 shadow-lg'
                                                        : priority === 'medium'
                                                            ? 'bg-yellow-500 shadow-lg'
                                                            : 'bg-green-500 shadow-lg'
                                                    : 'bg-gray-100'
                                                }`}
                                        >
                                            <Text className={`text-center ${formData.priority === priority ? 'text-white font-medium' : 'text-gray-600'}`}>
                                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Category */}
                            <View>
                                <Text className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </Text>
                                <View className="relative">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300 bg-white"
                                    >
                                        <option value="">Select category...</option>
                                        <option value="Work">Work</option>
                                        <option value="Personal">Personal</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Health">Health</option>
                                        <option value="Study">Study</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </View>
                            </View>

                            {/* Due Date */}
                            <View>
                                <Text className="block text-sm font-semibold text-gray-700 mb-2">
                                    Due Date
                                </Text>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => handleChange('dueDate', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-violet-500 focus:outline-none transition-colors duration-300"
                                />
                            </View>

                            {/* Buttons */}
                            <View className="flex gap-3 pt-4">
                                <Pressable
                                    onPress={onClose}
                                    className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                                >
                                    <Text className="text-gray-700 font-semibold text-center">Cancel</Text>
                                </Pressable>
                                <Pressable
                                    onPress={handleSubmit}
                                    className="flex-1 py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                >
                                    <Text className="text-white font-semibold text-center">Add Task</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
