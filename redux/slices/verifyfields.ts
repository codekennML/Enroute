
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SchemaDefinition } from '@/types/types';



type InitialStateType = Record<string, SchemaDefinition[]>

const initialState: InitialStateType = {}

// Create the slice
export const verificationFieldsSlice = createSlice({
    name: 'verificationFields',
    initialState,
    reducers: {
        updateVerificationFieldsState: (state, action: PayloadAction<Partial<InitialStateType>>) => {
            // Merge the payload into the state
            state = action.payload
            return state
        },

    },
});

// Selector
export const selectVerificationFields = (state: RootState) => state.verifyFields

// Action creators
export const { updateVerificationFieldsState } = verificationFieldsSlice.actions;

// Reducer
export default verificationFieldsSlice.reducer;
