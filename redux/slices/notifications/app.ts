
import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define the initial state using that type
interface PushNotificationState {

    enabled: boolean;
    token: string | null
    notification: {
        [x: string]: string
        type: string
    }[]
}

const initialState: PushNotificationState = {
    enabled: false,
    token: null,
    notification: []
};

// Create the slice
const pushNotificationSlice = createSlice({
    name: 'pushNotification',
    initialState,
    reducers: {
        setEnabled(state, action: PayloadAction<boolean>) {
            state.enabled = action.payload;
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        addNotification(state, action: PayloadAction<{ [x: string]: string, type: string }>) {
            state.notification.push(action.payload);
        },
        removeNotification(state, action: PayloadAction<string>) {
            state.notification = state.notification.filter(
                (notification) => notification.id !== action.payload
            );
        },

        clearNotification(state) {
            state.notification = []
        },
    },
});

// Export the actions
export const { setEnabled, setToken, addNotification, clearNotification, removeNotification } = pushNotificationSlice.actions;


export const selectNotificationInfo = (state: RootState) => state.pushNotifications
// Export the reducer
export default pushNotificationSlice.reducer;
