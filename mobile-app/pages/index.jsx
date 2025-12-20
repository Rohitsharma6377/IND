import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, Pressable } from 'indjs';
import { HiPlus, HiCalendar, HiDotsVertical, HiClipboardList } from 'react-icons/hi';
import AddTaskModal from '../components/AddTaskModal';
import { addTask, toggleTask } from '../utils/taskSlice';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const tasks = useSelector((state) => state.tasks.tasks);
  const user = useSelector((state) => state.user?.profile || { name: 'User' });
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'in-progress') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleAddTask = (taskData) => {
    dispatch(addTask({
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    }));
    setShowModal(false);
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'from-purple-600 to-blue-600';
    if (priority === 'medium') return 'from-blue-500 to-indigo-500';
    return 'from-indigo-400 to-purple-400';
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 h-full">
      <View className="px-6 py-10 pb-32">

        {/* Greeting Section */}
        <View className="flex flex-row items-center justify-between mb-8">
          <View>
            <Text className="text-4xl font-extrabold text-gray-900 leading-tight">Hello,</Text>
            <Text className="text-3xl font-bold text-gray-400 leading-tight">{user.name.split(' ')[0]}!</Text>
          </View>
          <View className="w-14 h-14 bg-white rounded-full border-4 border-gray-100 shadow-sm overflow-hidden flex items-center justify-center">
            <Text className="text-xl font-bold text-purple-600">{user.name[0]}</Text>
          </View>
        </View>

        {/* Filter Tabs - Fixed Spacing */}
        <View className="mb-8 w-full">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex flex-row -mx-6 px-6">
            {['all', 'in-progress', 'completed'].map((f) => (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                className={`mr-3 px-6 py-3 rounded-full border transition-all duration-200 ${filter === f
                    ? 'bg-gray-900 border-gray-900 shadow-md'
                    : 'bg-white border-gray-100 text-gray-500'
                  }`}
              >
                <Text className={`text-sm font-semibold whitespace-nowrap capitalize ${filter === f ? 'text-white' : 'text-gray-500'
                  }`}>
                  {f.replace('-', ' ')}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Project Cards (Horizontal) */}
        <View className="mb-8">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex flex-row -mx-6 px-6"
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.slice(0, 5).map((task, index) => (
                <View
                  key={task.id}
                  className={`w-72 h-48 bg-gradient-to-br ${getPriorityColor(task.priority)} rounded-[32px] p-6 shadow-xl shadow-indigo-200 mr-5 flex flex-col justify-between`}
                >
                  <View className="flex flex-row items-start justify-between">
                    <View className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <HiClipboardList className="w-5 h-5 text-white" />
                    </View>
                    <View className="bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <Text className="text-white/90 text-[10px] font-bold tracking-wide uppercase">
                        {task.priority} Priority
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text className="text-white text-2xl font-bold mb-1 leading-tight tracking-tight" numberOfLines={1}>
                      {task.title}
                    </Text>
                    <Text className="text-indigo-100 text-sm leading-relaxed opacity-90" numberOfLines={2}>
                      {task.description || 'No description provided.'}
                    </Text>
                  </View>

                  <Text className="text-white/80 text-[11px] font-semibold">
                    {new Date(task.createdAt).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
                  </Text>
                </View>
              ))
            ) : (
              <View className="w-72 h-48 bg-white rounded-[32px] p-6 mr-5 flex items-center justify-center border-2 border-dashed border-gray-200 shadow-sm">
                <Text className="text-gray-400 font-medium">No tasks found</Text>
              </View>
            )}
            <View className="w-4"></View>
          </ScrollView>
        </View>

        {/* Progress List */}
        <View>
          <Text className="text-xl font-bold text-gray-900 mb-6 px-1">Progress</Text>

          <View className="space-y-4 pb-20">
            {filteredTasks.length === 0 ? (
              <View className="bg-white rounded-3xl p-8 py-12 flex items-center justify-center border border-gray-100">
                <Text className="text-gray-400">Your list is empty</Text>
              </View>
            ) : (
              filteredTasks.map((task) => (
                <View
                  key={task.id}
                  className="bg-white rounded-[24px] p-4 flex flex-row items-center justify-between shadow-sm border border-gray-50"
                >
                  <View className="flex flex-row items-center gap-4 flex-1">
                    <View className={`w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-md shadow-indigo-100`}>
                      <HiCalendar className="w-7 h-7 text-white" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-bold text-gray-900 mb-0.5" numberOfLines={1}>{task.title}</Text>
                      <Text className="text-xs text-gray-400 font-medium">
                        {task.category || 'General'} • {new Date(task.createdAt).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                  <Pressable
                    onPress={() => dispatch(toggleTask(task.id))}
                    className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full active:bg-gray-200"
                  >
                    <HiDotsVertical className="w-5 h-5 text-gray-400" />
                  </Pressable>
                </View>
              ))
            )}
          </View>
        </View>

        {/* Floating Add Button */}
        <Pressable
          onPress={() => setShowModal(true)}
          className="fixed bottom-28 right-6 w-16 h-16 bg-gray-900 rounded-full shadow-2xl shadow-gray-400 flex items-center justify-center active:scale-95 transition-transform z-40"
        >
          <HiPlus className="w-8 h-8 text-white" />
        </Pressable>

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