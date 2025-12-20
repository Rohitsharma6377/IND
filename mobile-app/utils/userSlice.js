import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: '👤',
        memberSince: new Date().toISOString()
    },
    notifications: [
        {
            id: '1',
            title: 'Welcome to TaskFlow!',
            message: 'Start organizing your tasks efficiently',
            type: 'info',
            read: false,
            timestamp: new Date().toISOString()
        }
    ],
    settings: {
        emailNotifications: true,
        pushNotifications: true,
        soundEffects: true,
        weekStartsOn: 'Monday',
        dateFormat: 'MM/DD/YYYY',
        language: 'English'
    },
    stats: {
        totalCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalPoints: 0
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        },
        markNotificationAsRead: (state, action) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) {
                notification.read = true;
            }
        },
        clearAllNotifications: (state) => {
            state.notifications = [];
        },
        updateSettings: (state, action) => {
            state.settings = { ...state.settings, ...action.payload };
        },
        incrementStats: (state, action) => {
            const { stat, value = 1 } = action.payload;
            if (state.stats[stat] !== undefined) {
                state.stats[stat] += value;
            }
        },
        updateStreak: (state, action) => {
            state.stats.currentStreak = action.payload;
            if (action.payload > state.stats.longestStreak) {
                state.stats.longestStreak = action.payload;
            }
        }
    }
});

export const {
    updateProfile,
    addNotification,
    markNotificationAsRead,
    clearAllNotifications,
    updateSettings,
    incrementStats,
    updateStreak
} = userSlice.actions;

export default userSlice.reducer;
