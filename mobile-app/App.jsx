import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { View, Text, SafeAreaView, Pressable, ScrollView } from 'indjs';
import { store } from './utils/store';
import BottomNav from './components/BottomNav';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, toggleTask, deleteTask } from './utils/taskSlice';
import './styles/globals.css';

// Tasks Page Component
function TasksPage() {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('all');
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const stats = {
        total: tasks.length,
        active: tasks.filter(t => !t.completed).length,
        completed: tasks.filter(t => t.completed).length
    };

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
        <ScrollView className="flex-1">
            <View className="max-w-4xl mx-auto px-4 py-8">
                <View className="mb-8">
                    <Text className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                        Task Manager
                    </Text>
                    <Text className="text-gray-600 text-lg">Organize your day, achieve your goals</Text>
                </View>

                <View className="grid grid-cols-3 gap-4 mb-8">
                    <View className="bg-white rounded-2xl p-4 shadow-lg">
                        <Text className="text-3xl font-bold text-violet-600">{stats.total}</Text>
                        <Text className="text-sm text-gray-600 mt-1">Total</Text>
                    </View>
                    <View className="bg-white rounded-2xl p-4 shadow-lg">
                        <Text className="text-3xl font-bold text-blue-600">{stats.active}</Text>
                        <Text className="text-sm text-gray-600 mt-1">Active</Text>
                    </View>
                    <View className="bg-white rounded-2xl p-4 shadow-lg">
                        <Text className="text-3xl font-bold text-green-600">{stats.completed}</Text>
                        <Text className="text-sm text-gray-600 mt-1">Done</Text>
                    </View>
                </View>

                <View className="flex gap-2 mb-6 bg-white rounded-2xl p-2 shadow-md">
                    {['all', 'active', 'completed'].map((f) => (
                        <Pressable
                            key={f}
                            onPress={() => setFilter(f)}
                            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${filter === f
                                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg'
                                    : 'bg-transparent'
                                }`}
                        >
                            <Text className={`text-center font-medium ${filter === f ? 'text-white' : 'text-gray-600'}`}>
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <View className="space-y-4 mb-8">
                    {filteredTasks.length === 0 ? (
                        <View className="bg-white rounded-2xl p-12 text-center shadow-lg">
                            <Text className="text-6xl mb-4">📝</Text>
                            <Text className="text-xl font-semibold text-gray-700 mb-2">No tasks yet</Text>
                            <Text className="text-gray-500">
                                {filter === 'all' ? 'Start by adding your first task!' : `No ${filter} tasks found`}
                            </Text>
                        </View>
                    ) : (
                        filteredTasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onToggle={() => dispatch(toggleTask(task.id))}
                                onDelete={() => dispatch(deleteTask(task.id))}
                            />
                        ))
                    )}
                </View>

                <Pressable
                    onPress={() => setShowModal(true)}
                    className="fixed bottom-24 right-8 w-16 h-16 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40"
                >
                    <Text className="text-white text-3xl font-light">+</Text>
                </Pressable>

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

// Categories Page Component
function CategoriesPage() {
    const categories = [
        { name: 'Work', count: 8, color: 'from-blue-500 to-blue-600', icon: '💼' },
        { name: 'Personal', count: 5, color: 'from-purple-500 to-purple-600', icon: '🏠' },
        { name: 'Shopping', count: 3, color: 'from-pink-500 to-pink-600', icon: '🛍️' },
        { name: 'Health', count: 4, color: 'from-green-500 to-green-600', icon: '💪' },
        { name: 'Study', count: 6, color: 'from-yellow-500 to-yellow-600', icon: '📚' },
        { name: 'Finance', count: 2, color: 'from-emerald-500 to-emerald-600', icon: '💰' },
        { name: 'Travel', count: 1, color: 'from-cyan-500 to-cyan-600', icon: '✈️' },
        { name: 'Other', count: 3, color: 'from-gray-500 to-gray-600', icon: '📌' }
    ];

    return (
        <ScrollView className="flex-1">
            <View className="px-4 py-8">
                <View className="mb-8">
                    <Text className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                        Categories
                    </Text>
                    <Text className="text-gray-600 text-lg">Organize tasks by category</Text>
                </View>

                <View className="grid grid-cols-2 gap-4">
                    {categories.map((category, index) => (
                        <Pressable key={index} className="bg-white rounded-2xl p-5 shadow-lg">
                            <View className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-3`}>
                                <Text className="text-3xl">{category.icon}</Text>
                            </View>
                            <Text className="text-lg font-bold text-gray-800 mb-1">{category.name}</Text>
                            <Text className="text-sm text-gray-600">{category.count} tasks</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

// Statistics Page Component
function StatisticsPage() {
    return (
        <ScrollView className="flex-1">
            <View className="px-4 py-8">
                <View className="mb-8">
                    <Text className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
                        Statistics
                    </Text>
                    <Text className="text-gray-600 text-lg">Track your productivity</Text>
                </View>

                <View className="grid grid-cols-2 gap-4">
                    {[
                        { title: 'Most Productive', value: 'Wednesday', icon: '📈', color: 'from-green-500 to-green-600' },
                        { title: 'Completion Rate', value: '82%', icon: '🎯', color: 'from-blue-500 to-blue-600' },
                        { title: 'Time Saved', value: '12 hours', icon: '⏱️', color: 'from-purple-500 to-purple-600' },
                        { title: 'Streak Record', value: '14 days', icon: '🔥', color: 'from-orange-500 to-orange-600' }
                    ].map((insight, index) => (
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
        </ScrollView>
    );
}

// Profile Page Component
function ProfilePage() {
    return (
        <ScrollView className="flex-1">
            <View className="px-4 py-8">
                <View className="items-center mb-8">
                    <View className="w-24 h-24 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-4">
                        <Text className="text-4xl text-white">👤</Text>
                    </View>
                    <Text className="text-2xl font-bold text-gray-800 mb-1">John Doe</Text>
                    <Text className="text-gray-600">john.doe@example.com</Text>
                </View>

                <View className="grid grid-cols-2 gap-4 mb-8">
                    {[
                        { label: 'Completed', value: '127', icon: '✅' },
                        { label: 'Active', value: '12', icon: '📝' },
                        { label: 'Streak', value: '7', icon: '🔥' },
                        { label: 'Points', value: '1,250', icon: '⭐' }
                    ].map((stat, index) => (
                        <View key={index} className="bg-white rounded-2xl p-4 shadow-lg">
                            <Text className="text-3xl mb-2">{stat.icon}</Text>
                            <Text className="text-2xl font-bold text-violet-600 mb-1">{stat.value}</Text>
                            <Text className="text-sm text-gray-600">{stat.label}</Text>
                        </View>
                    ))}
                </View>

                <View className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {['Notifications', 'Theme', 'Language', 'Privacy', 'Help', 'Logout'].map((item, index) => (
                        <Pressable key={index} className={`px-4 py-4 flex flex-row items-center justify-between ${index !== 5 ? 'border-b border-gray-100' : ''}`}>
                            <Text className="text-gray-800 font-medium">{item}</Text>
                            <Text className="text-gray-400">›</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

// Main App Component
function App() {
    const [currentPage, setCurrentPage] = useState('tasks');

    const renderPage = () => {
        switch (currentPage) {
            case 'tasks':
                return <TasksPage />;
            case 'categories':
                return <CategoriesPage />;
            case 'statistics':
                return <StatisticsPage />;
            case 'profile':
                return <ProfilePage />;
            default:
                return <TasksPage />;
        }
    };

    return (
        <Provider store={store}>
            <SafeAreaView className="flex-1">
                <View className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
                    {/* Header */}
                    <View className="bg-white shadow-md sticky top-0 z-40">
                        <View className="px-4 py-4 flex flex-row items-center justify-between">
                            <View className="flex flex-row items-center gap-3">
                                <View className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                                    <Text className="text-2xl">📋</Text>
                                </View>
                                <Text className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                                    TaskFlow
                                </Text>
                            </View>
                            <Pressable className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Text className="text-xl">🔔</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Content */}
                    <View className="flex-1 pb-20">
                        {renderPage()}
                    </View>

                    {/* Bottom Navigation */}
                    <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
                </View>
            </SafeAreaView>
        </Provider>
    );
}

export default App;
