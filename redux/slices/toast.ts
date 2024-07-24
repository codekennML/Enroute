// src/features/toast/toastSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ToastState {
    message: string;
    type: 'foreground' | 'background';
    notification: string
    title: string
    isVisible: boolean;
}

const initialState: ToastState = {
    message: '',
    type: 'foreground',
    notification: "info",
    title: "",
    isVisible: false,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<Omit<ToastState, "isVisible">>) => {
            state.message = action.payload.message;
            state.title = action.payload.title
            state.notification = action.payload.notification
            state.isVisible = true;
        },
        hideToast: (state) => {
            state.isVisible = false;
        },
    },
});

export const toastState = (state: RootState) => state.toast

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
