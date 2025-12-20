import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: 'light', // 'light' or 'dark'
    accentColor: 'violet' // primary accent color
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
        },
        setAccentColor: (state, action) => {
            state.accentColor = action.payload;
        }
    }
});

export const { toggleTheme, setTheme, setAccentColor } = themeSlice.actions;
export default themeSlice.reducer;
