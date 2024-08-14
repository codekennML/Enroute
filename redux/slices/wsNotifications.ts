import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';

interface Notification {
    value: string,
    data?: Record<string, string>
}

// Create the initial state using the adapter's getInitialState method
const initialState: Notification = {
    value: '',
    data: {}
}

// Create a slice
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setWsNotification: (state, action: PayloadAction<Notification>) => {
            state = {
                ...state,
                ...action.payload
            }
        }
    },
});

// Export the actions
export const { setWsNotification } = notificationSlice.actions;

export const notificationMessage = (state: RootState) => state.notification

export default notificationSlice.reducer;
