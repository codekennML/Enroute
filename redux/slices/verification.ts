import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import * as z from "zod";
import { driverVerificationSchema, riderVerificationSchema } from '@/app/verification/schemas';

// Define the union type for the initial state
type InitialStateType = z.infer<typeof riderVerificationSchema> | z.infer<typeof driverVerificationSchema>;

// Initialize the state with a default value matching one of the schemas
const initialState: InitialStateType = {
    // Provide a default value here. It could be empty, partial data, or based on one of the schemas
    // Example: 
    firstName: "",
    lastName: "",
    gender: "Male",
    street: "",
    birthDate: "",
    friends: [],
    address: "",
    apartment: "",
    country: { _id: "", name: "" },
    state: { _id: "", name: "" },

    //   vehicle_name: "",
    //   vehicle_model: "",
    //   vehicle_year: "",
    //   vehicle_license: "",
    //   vehicle_seats: 0,
    //   vehicle_type: "Car",
    //   vehicle_exterior_color: "",
    //   vehicle_interior_color: "",
    //   vehicle_exterior_front: "",
    //   vehicle_exterior_back: "",
    //   vehicle_exterior_left: "",
    //   vehicle_exterior_right: "",
    //   vehicle_interior_front: "",
    //   vehicle_interior_back: "",
    // Add other fields as needed, based on the schema
};

// Create the slice
export const verificationSlice = createSlice({
    name: 'verification',
    initialState,
    reducers: {
        updateVerificationDataState: (state, action: PayloadAction<Partial<InitialStateType>>) => {
            // Merge the payload into the state
            Object.assign(state, action.payload);
        },
        // setUserState:(state, action:PayloadAction<Pick<initialStateType, "State">>) => { }
    },
});

// Selector
export const selectVerificationInfo = (state: RootState) => state.verification;

// Action creators
export const { updateVerificationDataState } = verificationSlice.actions;

// Reducer
export default verificationSlice.reducer;
