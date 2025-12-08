import React, { useState, useEffect } from 'react';
import TodoCard from '../components/TodoCard';
import ExpenseCard from '../components/ExpenseCard';
import StatCard from '../components/StatCard';
import TabButton from '../components/TabButton';
import CategoryCard from '../components/CategoryCard';
import EmptyState from '../components/EmptyState';

export default function Home() {
  // State for todos
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  // State for expenses
  const [expenses, setExpenses] = useState([]);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('food');

  // Active tab
  const [activeTab, setActiveTab] = useState('todos');

  // Load data
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedExpenses = localStorage.getItem('expenses');
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Save todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save expenses
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Todo functions
  const addTodo = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    setTodos([...todos, { id: Date.now(), text: todoInput, done: false }]);
    setTodoInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // Expense functions
  const addExpense = (e) => {
    e.preventDefault();
    if (!expenseTitle.trim() || !expenseAmount) return;
    setExpenses([...expenses, {
      id: Date.now(),
      title: expenseTitle,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: new Date().toISOString()
    }]);
    setExpenseTitle('');
    setExpenseAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const categories = {
    food: { icon: '🍔', color: 'bg-orange-500', name: 'Food' },
    transport: { icon: '🚗', color: 'bg-blue-500', name: 'Transport' },
    shopping: { icon: '🛍️', color: 'bg-pink-500', name: 'Shopping' },
    bills: { icon: '💡', color: 'bg-yellow-500', name: 'Bills' },
    entertainment: { icon: '🎮', color: 'bg-purple-500', name: 'Fun' },
    other: { icon: '📦', color: 'bg-gray-500', name: 'Other' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            📱 My Life Manager
          </h1>
          <p className="text-sm text-gray-500 mt-1">Track your tasks & expenses</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-md">
          <button
            onClick={() => setActiveTab('todos')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === 'todos'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            ✓ Todos
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${activeTab === 'expenses'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            💰 Expenses
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        {activeTab === 'todos' ? (
          <div>
            {/* Todo Input */}
            <form onSubmit={addTodo} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 px-6 py-4 text-lg border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Add
                </button>
              </div>
            </form>

            {/* Todo Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="text-2xl font-bold text-purple-600">{todos.length}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="text-2xl font-bold text-blue-600">{todos.filter(t => !t.done).length}</div>
                <div className="text-xs text-gray-600">Active</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="text-2xl font-bold text-green-600">{todos.filter(t => t.done).length}</div>
                <div className="text-xs text-gray-600">Done</div>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
              {todos.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-700">No tasks yet</h3>
                  <p className="text-gray-500">Add a task to get started!</p>
                </div>
              ) : (
                todos.map(todo => (
                  <div
                    key={todo.id}
                    className={`group bg-white rounded-2xl p-4 shadow-md transition-all ${todo.done ? 'bg-green-50 border-2 border-green-200' : 'hover:shadow-lg'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${todo.done ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-purple-500'
                          }`}
                      >
                        {todo.done && (
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={`text-lg ${todo.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {todo.text}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all flex items-center justify-center"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div>
            {/* Expense Input */}
            <form onSubmit={addExpense} className="mb-6 bg-white rounded-2xl p-6 shadow-md">
              <div className="space-y-4">
                <input
                  type="text"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="Expense title"
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
                />
                <input
                  type="number"
                  step="0.01"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="Amount ($)"
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
                />
                <select
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none"
                >
                  {Object.entries(categories).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Add Expense
                </button>
              </div>
            </form>

            {/* Expense Summary */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 shadow-xl mb-6 text-white">
              <div className="text-sm opacity-90 mb-2">Total Expenses</div>
              <div className="text-4xl font-bold">${totalExpenses.toFixed(2)}</div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Object.entries(categoryTotals).slice(0, 3).map(([cat, amount]) => (
                  <div key={cat} className="bg-white bg-opacity-20 rounded-lg p-2 text-center">
                    <div className="text-xs opacity-90">{categories[cat].icon}</div>
                    <div className="text-sm font-bold">${amount.toFixed(0)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {Object.entries(categories).map(([key, cat]) => {
                const amount = categoryTotals[key] || 0;
                return (
                  <div key={key} className="bg-white rounded-2xl p-4 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-2xl`}>
                        {cat.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-600">{cat.name}</div>
                        <div className="text-lg font-bold text-gray-800">${amount.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Expense List */}
            <div className="space-y-3">
              {expenses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                  <div className="text-6xl mb-4">💰</div>
                  <h3 className="text-xl font-semibold text-gray-700">No expenses yet</h3>
                  <p className="text-gray-500">Add an expense to start tracking!</p>
                </div>
              ) : (
                expenses.slice().reverse().map(expense => {
                  const cat = categories[expense.category];
                  return (
                    <div key={expense.id} className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                          {cat.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{expense.title}</p>
                          <p className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-gray-800">${expense.amount.toFixed(2)}</div>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="w-10 h-10 rounded-xl bg-red-50 text-red-600 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-all flex items-center justify-center"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
        <p>Built with ❤️ using INDJS Framework</p>
      </div>
    </div>
  );
}