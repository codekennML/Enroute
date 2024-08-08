// src/slices/webSocketSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
    connected: boolean;
    error: string | null;
}

const initialState: WebSocketState = {
    connected: false,
    error: null,
};

const webSocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        connect: (state, action: PayloadAction<{ token: string }>) => { },
        disconnect: (state) => { },
        sendMessage: (state, action: PayloadAction<any>) => { },
        open: (state) => {
            state.connected = true;
        },
        close: (state) => {
            state.connected = false;
        },
        error: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { connect, disconnect, sendMessage, open, close, error } = webSocketSlice.actions;
export default webSocketSlice.reducer;
