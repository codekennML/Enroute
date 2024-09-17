// redux/slices/busStationsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Location } from '@/types/types';

// Define the initial state
const initialState: Location[] = []

// Create the slice
const busStationsSlice = createSlice({
    name: 'busStations',
    initialState,
    reducers: {
        // Action to update all bus stations
        updateStations(state, action) {
            state = action.payload;
            return state
        },
    },
});

// Export the action for use in components
export const { updateStations } = busStationsSlice.actions;
export const selectBusStations = (state: RootState) => state.stations

// Export the reducer to be used in the store
export default busStationsSlice.reducer;
