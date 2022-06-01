import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: localStorage.getItem('theme') || 'light',
}

const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        darkMode: state => {
            state.theme = 'dark';
            localStorage.setItem('theme', 'dark');
        },
        lightMode: state => {
            state.theme = 'light';
            localStorage.setItem('theme', 'light');
        },
    },
})
export const { darkMode, lightMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;