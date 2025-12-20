import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, Pressable } from 'indjs';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import { addTask, toggleTask, deleteTask } from '../utils/taskSlice';

export default function Home() {
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

        <View className="flex flex-row gap-2 mb-6 bg-white rounded-2xl p-2 shadow-md">
          {['all', 'active', 'completed'].map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${filter === f ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg' : 'bg-transparent'
                }`}
            >
              <Text className={`text-center font-medium ${filter === f ? 'text-white' : 'text-gray-600'}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="space-y-4">
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