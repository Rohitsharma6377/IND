import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import themeReducer from './themeSlice';
import userReducer from './userSlice';

// Load state from localStorage
const loadState = () => {
    try {
        if (typeof window === 'undefined') return undefined;
        const serializedState = localStorage.getItem('taskflow_state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// Save state to localStorage
const saveState = (state) => {
    try {
        if (typeof window === 'undefined') return;
        const serializedState = JSON.stringify(state);
        localStorage.setItem('taskflow_state', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

// Create store with persisted state
export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        theme: themeReducer,
        user: userReducer
    },
    preloadedState: loadState()
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
    saveState(store.getState());
});
