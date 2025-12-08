import React, { useState, useEffect } from 'react';
import { getPlatform, storage } from '../lib/platform';

export default function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, completed
    const platform = getPlatform();

    // Load todos on mount
    useEffect(() => {
        loadTodos();
    }, []);

    // Save todos whenever they change
    useEffect(() => {
        if (todos.length > 0 || todos.length === 0) {
            saveTodos();
        }
    }, [todos]);

    const loadTodos = async () => {
        try {
            const data = await storage.get('todos');
            if (data) {
                setTodos(JSON.parse(data));
            }
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    };

    const saveTodos = async () => {
        try {
            await storage.set('todos', JSON.stringify(todos));
        } catch (error) {
            console.error('Error saving todos:', error);
        }
    };

    const addTodo = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: input.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTodos([...todos, newTodo]);
        setInput('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const activeTodosCount = todos.filter(t => !t.completed).length;
    const completedTodosCount = todos.filter(t => t.completed).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ✓ Todo App
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Running on <span className="font-semibold text-blue-600">{platform}</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-800">{todos.length}</div>
                            <div className="text-xs text-gray-500">Total Tasks</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Add Todo Form */}
                <form onSubmit={addTodo} className="mb-8">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="What needs to be done?"
                            className="flex-1 px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                            Add
                        </button>
                    </div>
                </form>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">{activeTodosCount}</div>
                        <div className="text-sm text-gray-600">Active</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">{completedTodosCount}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-purple-600">{todos.length}</div>
                        <div className="text-sm text-gray-600">Total</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'all'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'active'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${filter === 'completed'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Completed
                    </button>
                    {completedTodosCount > 0 && (
                        <button
                            onClick={clearCompleted}
                            className="ml-auto px-6 py-2 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                        >
                            Clear Completed
                        </button>
                    )}
                </div>

                {/* Todo List */}
                <div className="space-y-3">
                    {filteredTodos.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                {filter === 'completed' ? 'No completed tasks' :
                                    filter === 'active' ? 'No active tasks' :
                                        'No tasks yet'}
                            </h3>
                            <p className="text-gray-500">
                                {filter === 'all' && 'Add a task to get started!'}
                            </p>
                        </div>
                    ) : (
                        filteredTodos.map(todo => (
                            <div
                                key={todo.id}
                                className={`group bg-white rounded-xl p-4 shadow-sm border-2 transition-all hover:shadow-md ${todo.completed
                                        ? 'border-green-200 bg-green-50'
                                        : 'border-gray-100 hover:border-blue-200'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Checkbox */}
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${todo.completed
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-gray-300 hover:border-blue-500'
                                            }`}
                                    >
                                        {todo.completed && (
                                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>

                                    {/* Todo Text */}
                                    <div className="flex-1">
                                        <p className={`text-lg ${todo.completed
                                                ? 'line-through text-gray-500'
                                                : 'text-gray-800'
                                            }`}>
                                            {todo.text}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(todo.createdAt).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
                <p>Built with ❤️ using INDJS Framework</p>
                <p className="mt-2">Works on Web • iOS • Android • Windows • Mac • Linux</p>
            </footer>
        </div>
    );
}
