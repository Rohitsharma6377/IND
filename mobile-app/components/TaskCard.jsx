import React from 'react';
import { View, Text, Pressable } from 'indjs';

export default function TaskCard({ task, onToggle, onDelete }) {
    const priorityColors = {
        high: 'border-red-400 bg-red-50',
        medium: 'border-yellow-400 bg-yellow-50',
        low: 'border-green-400 bg-green-50'
    };

    const priorityBadgeColors = {
        high: 'bg-red-500 text-white',
        medium: 'bg-yellow-500 text-white',
        low: 'bg-green-500 text-white'
    };

    return (
        <View
            className={`bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${task.completed ? 'opacity-60 border-gray-300' : priorityColors[task.priority]
                }`}
        >
            <View className="flex items-start gap-4">
                {/* Checkbox */}
                <Pressable
                    onPress={onToggle}
                    className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${task.completed
                            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 border-transparent'
                            : 'border-gray-300 hover:border-violet-400'
                        }`}
                >
                    {task.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </Pressable>

                {/* Task Content */}
                <View className="flex-1 min-w-0">
                    <Text
                        className={`text-lg font-semibold mb-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                            }`}
                    >
                        {task.title}
                    </Text>
                    {task.description && (
                        <Text className={`text-sm mb-3 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                        </Text>
                    )}

                    <View className="flex items-center gap-3 flex-wrap">
                        {/* Priority Badge */}
                        <View className={`px-3 py-1 rounded-full ${priorityBadgeColors[task.priority]}`}>
                            <Text className="text-xs font-medium text-white">
                                {task.priority.toUpperCase()}
                            </Text>
                        </View>

                        {/* Category */}
                        {task.category && (
                            <View className="px-3 py-1 rounded-full bg-purple-100">
                                <Text className="text-xs font-medium text-purple-700">
                                    {task.category}
                                </Text>
                            </View>
                        )}

                        {/* Date */}
                        {task.dueDate && (
                            <View className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <Text className="text-xs text-gray-500">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Delete Button */}
                <Pressable
                    onPress={onDelete}
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                    <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </Pressable>
            </View>
        </View>
    );
}
