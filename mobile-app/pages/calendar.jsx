import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'indjs';
import { HiArrowLeft, HiCalendar, HiDotsVertical } from 'react-icons/hi';
import { useRouter } from 'indjs';
import { useSelector, useDispatch } from 'react-redux';
import AddTaskModal from '../components/AddTaskModal';
import { addTask } from '../utils/taskSlice';

export default function Calendar() {
    const router = useRouter();
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    // Get current month
    const currentDate = new Date();
    const monthYear = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    // Get days of week
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const today = currentDate.getDate();

    const handleAddTask = (taskData) => {
        dispatch(addTask({
            id: Date.now().toString(),
            ...taskData,
            completed: false,
            createdAt: new Date().toISOString()
        }));
        setShowModal(false);
    };

    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View className="px-4 py-6">

                {/* Header */}
                <View className="flex flex-row items-center justify-between mb-6">
                    <Pressable onPress={() => router.push('/')} className="w-10 h-10 flex items-center justify-center">
                        <HiArrowLeft className="w-6 h-6 text-gray-900" />
                    </Pressable>
                    <Pressable
                        onPress={() => setShowModal(true)}
                        className="px-4 py-2 bg-purple-600 rounded-full"
                    >
                        <Text className="text-white text-sm font-medium">+ Add Task</Text>
                    </Pressable>
                </View>

                {/* Month/Year */}
                <Text className="text-3xl font-bold text-gray-900 mb-6">{monthYear}</Text>

                {/* Calendar Week View */}
                <View className="mb-6">
                    <View className="flex flex-row justify-around mb-4">
                        {daysOfWeek.map((day, index) => (
                            <View key={day} className="w-12 text-center">
                                <Text className="text-sm text-gray-600 mb-2">{day}</Text>
                                <View className={`w-12 h-12 rounded-full flex items-center justify-center ${index === 1 ? 'bg-purple-600' : 'bg-transparent'
                                    }`}>
                                    <Text className={`text-base font-semibold ${index === 1 ? 'text-white' : 'text-gray-900'
                                        }`}>
                                        {3 + index}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Tasks Section */}
                <View>
                    <Text className="text-xl font-bold text-gray-900 mb-4">Tasks</Text>

                    <View className="space-y-3">
                        {tasks.map((task) => (
                            <View
                                key={task.id}
                                className="bg-white rounded-2xl p-4 flex flex-row items-center justify-between shadow-sm"
                            >
                                <View className="flex flex-row items-center gap-3 flex-1">
                                    <View className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                                        <HiCalendar className="w-6 h-6 text-white" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-base font-semibold text-gray-900">{task.title}</Text>
                                        <Text className="text-xs text-gray-500 mt-1">
                                            {task.createdAt ?
                                                Math.floor((Date.now() - new Date(task.createdAt)) / (1000 * 60 * 60 * 24)) + ' days ago'
                                                : 'Today'}
                                        </Text>
                                    </View>
                                </View>
                                <Pressable className="p-2">
                                    <HiDotsVertical className="w-5 h-5 text-gray-400" />
                                </Pressable>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Add Modal */}
                {showModal && (
                    <AddTaskModal
                        onClose={() => setShowModal(false)}
                        onAdd={handleAddTask}
                    />
                )}
            </View>
        </ScrollView>
    );
}
