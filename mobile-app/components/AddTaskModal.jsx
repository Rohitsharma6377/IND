import React, { useState } from 'react';
import { Modal, View, Text, Pressable, TextInput } from 'indjs';
import { HiArrowLeft, HiSearch } from 'react-icons/hi';

export default function AddTaskModal({ onClose, onAdd }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('01:22 pm');
    const [endTime, setEndTime] = useState('03:20 pm');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Design');
    const [priority, setPriority] = useState('medium');

    const categories = ['Design', 'Meeting', 'Coding', 'BDE', 'Testing', 'Quick call'];

    const handleSubmit = () => {
        if (!title.trim()) {
            alert('Please enter a task name');
            return;
        }

        onAdd({
            title: title.trim(),
            description: description.trim() || 'No description',
            category: category,
            priority: priority,
            dueDate: date || new Date().toISOString(),
        });
    };

    return (
        <Modal visible={true} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
                <View className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-hidden">

                    {/* Purple Header */}
                    <View className="bg-gradient-to-br from-purple-600 to-blue-600 px-6 py-8 rounded-t-3xl">
                        <View className="flex flex-row items-center justify-between mb-6">
                            <Pressable onPress={onClose} className="w-10 h-10 flex items-center justify-center">
                                <HiArrowLeft className="w-6 h-6 text-white" />
                            </Pressable>
                            <Text className="text-xl font-bold text-white">Create a Task</Text>
                            <Pressable className="w-10 h-10 flex items-center justify-center">
                                <HiSearch className="w-6 h-6 text-white" />
                            </Pressable>
                        </View>

                        {/* Name */}
                        <View className="mb-4">
                            <Text className="text-white text-sm mb-2">Name</Text>
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Design Changes"
                                placeholderTextColor="rgba(255,255,255,0.6)"
                                className="text-white text-2xl font-bold bg-transparent border-b border-white border-opacity-30 pb-2"
                            />
                        </View>

                        {/* Date */}
                        <View>
                            <Text className="text-white text-sm mb-2">Date</Text>
                            <Text className="text-white text-xl font-semibold">
                                {date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Text>
                        </View>
                    </View>

                    {/* White Content */}
                    <ScrollView className="px-6 py-6">

                        {/* Time */}
                        <View className="flex flex-row gap-4 mb-6">
                            <View className="flex-1">
                                <Text className="text-gray-400 text-xs mb-2">Start Time</Text>
                                <TextInput
                                    value={startTime}
                                    onChangeText={setStartTime}
                                    className="text-gray-900 text-lg font-semibold"
                                />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-400 text-xs mb-2">End Time</Text>
                                <TextInput
                                    value={endTime}
                                    onChangeText={setEndTime}
                                    className="text-gray-900 text-lg font-semibold"
                                />
                            </View>
                        </View>

                        {/* Description */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-xs mb-2">Description</Text>
                            <TextInput
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Enter task description..."
                                multiline
                                numberOfLines={4}
                                className="text-gray-900 text-sm leading-relaxed"
                            />
                        </View>

                        {/* Category */}
                        <View className="mb-6">
                            <Text className="text-gray-400 text-xs mb-3">Category</Text>
                            <View className="flex flex-row flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <Pressable
                                        key={cat}
                                        onPress={() => setCategory(cat)}
                                        className={`px-5 py-2.5 rounded-full ${category === cat
                                                ? 'bg-purple-600'
                                                : 'bg-purple-50'
                                            }`}
                                    >
                                        <Text className={`text-sm font-medium ${category === cat ? 'text-white' : 'text-gray-700'
                                            }`}>
                                            {cat}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        {/* Create Button */}
                        <Pressable
                            onPress={handleSubmit}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-full shadow-lg mb-4"
                        >
                            <Text className="text-white font-bold text-center text-lg">Create Task</Text>
                        </Pressable>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
