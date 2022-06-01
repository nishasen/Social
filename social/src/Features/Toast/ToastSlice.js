import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    text: '',
    severity: 'success',
}

const ToastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action) => {
            state.text = action.payload.text;
            state.severity = action.payload.severity;
            state.isOpen = true;
        }, 
        hideToast: (state) => {
            state.isOpen = false;
            state.text = '';
            state.severity = 'success';
        }
    },
})

export const { showToast, hideToast } = ToastSlice.actions;
export default ToastSlice.reducer;