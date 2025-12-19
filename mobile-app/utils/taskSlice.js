import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [
        {
            id: '1',
            title: 'Welcome to Task Manager!',
            description: 'This is a sample task. Click the checkbox to mark it as complete, or delete it.',
            priority: 'high',
            category: 'Personal',
            completed: false,
            createdAt: new Date().toISOString(),
            dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0]
        },
        {
            id: '2',
            title: 'Try adding a new task',
            description: 'Click the + button to create your own tasks',
            priority: 'medium',
            category: 'Work',
            completed: false,
            createdAt: new Date().toISOString()
        }
    ]
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.unshift(action.payload);
        },
        toggleTask: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...action.payload };
            }
        }
    }
});

export const { addTask, toggleTask, deleteTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
