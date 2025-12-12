import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'indjs';

export default function TodoApp() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-3xl font-bold text-gray-800 mb-6 text-center">✅ Universal Todo</Text>

      <View className="flex-row mb-6">
        <TextInput
          className="flex-1 bg-white p-4 rounded-l-lg border-2 border-r-0 border-indigo-100 text-lg focus:border-indigo-500 outline-none"
          placeholder="What needs to be done?"
          value={task}
          onChangeText={setTask}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <TouchableOpacity
          className="bg-indigo-600 px-6 justify-center rounded-r-lg active:bg-indigo-700"
          onPress={addTodo}
        >
          <Text className="text-white font-bold text-lg">Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {todos.length === 0 ? (
          <View className="items-center py-10 opacity-50">
            <Text className="text-xl text-gray-400">No tasks yet</Text>
            <Text className="text-sm text-gray-400 mt-2">Add a task to get started!</Text>
          </View>
        ) : (
          todos.map(todo => (
            <View key={todo.id} className="flex-row items-center bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-100">
              <TouchableOpacity
                className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                onPress={() => toggleTodo(todo.id)}
              >
                {todo.completed && <Text className="text-white text-xs">✓</Text>}
              </TouchableOpacity>

              <Text
                className={`flex-1 text-lg ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                onPress={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </Text>

              <TouchableOpacity onPress={() => deleteTodo(todo.id)} className="p-2">
                <Text className="text-red-500 font-bold">✕</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}