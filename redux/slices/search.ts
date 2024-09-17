import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RiderData, UserRideInfo, Location, UserPackageInfo } from '@/types/types'
import { RootState } from '../store'

// type InitialStateType = UserRideInfo | UserPackageInfo

// const initialState: InitialStateType = {
//     //Lets initially populate with only ride information , when a user selects a different trip type we can change the type and state values
//     destination: undefined,
//     origin: undefined,

//     budget: 300,
//     riders: [],
//     luggage: "",
//     charter: false,
//     type: "ride"
// }

// export const searchSlice = createSlice({
//     name: 'search',
//     initialState,
//     reducers: {

//         setOrigin: (state, action: PayloadAction<Location>) => {
//             state.origin = action.payload
//             // console.log(action.payload)

//         },
//         setDestination: (state, action: PayloadAction<Location | undefined>) => {
//             state.destination = action.payload
//             // console.log(action.payload, "destination")
//         },

//         addRideRiders: (state, action: PayloadAction<RiderData[]>) => {
//             if ("riders" in state) {

//                 state.riders = action.payload
//             }
//         },

//         addPackageRecipient: (state, action: PayloadAction<RiderData>) => {
//             if ("recipient" in state) {
//                 state.recipient = action.payload
//                 // console.log(action, state, "INFO")
//             }
//         },



//         setTripType: (state, action) => {
//             if (action.payload === "courier") {
//                 // Reset to initial values for courier
//                 return {
//                     origin: state.origin,
//                     destination: undefined,
//                     type: "courier",
//                     budget: 500,
//                     recipient: undefined,
//                     charter: false,
//                     comments: "",
//                     description: "",
//                 }
//             } else if (action.payload === "reset") {
//                 // Reset to initial state
//                 return initialState
//             } else {
//                 // Set the trip type without changing other state properties
//                 return {
//                     ...state,
//                     type: action.payload as "ride" | "travel" | "courier"
//                 };
//             }
//         },


//         removeRider: (state, action: PayloadAction<{ index: number }>) => {

//             if ("riders" in state) {
//                 state = {
//                     ...state,
//                     riders: state.riders.filter((rider, index) => index !== action.payload.index)
//                 }
//             }
//         },

//         updateOtherTripData: (state, action: PayloadAction<Partial<Omit<UserRideInfo, "riders" | "destination" | "origin">>>) => {

//             return {
//                 ...state,
//                 ...action.payload,
//             }


//         }
//     }
// })

// export const selectSearchInfo = (state: RootState) => state.search

// // Action creators are generated for each case reducer function
// export const { setOrigin, setDestination, addRideRiders, addPackageRecipient, removeRider, updateOtherTripData, setTripType } = searchSlice.actions

// export default searchSlice.reducer


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RiderData, UserRideInfo, Location, UserPackageInfo } from '@/types/types';
// import { RootState } from '../store';

// Define the union type for the state
type InitialStateType = UserRideInfo | UserPackageInfo;

// Define the initial state for a ride
const initialState: UserRideInfo = {
    budget: 300,
    riders: [],
    luggage: "",
    charter: false,
    type: "ride"
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setOrigin: (state, action: PayloadAction<Location>) => {
            state.origin = action.payload;
        },

        setDestination: (state, action: PayloadAction<Location | undefined>) => {
            state.destination = action.payload;
        },

        addRideRiders: (state, action: PayloadAction<RiderData[]>) => {
            if (isUserRideInfo(state)) {
                state.riders = action.payload;
            }
        },

        addPackageRecipient: (state, action: PayloadAction<RiderData>) => {
            if (isUserPackageInfo(state)) {
                state.recipient = action.payload;
            }
        },

        setTripType: (state, action: PayloadAction<"ride" | "travel" | "courier" | "reset">) => {
            if (action.payload === "courier") {
                return {
                    ...state,
                    destination: undefined,
                    type: "courier",
                    budget: 500,
                    recipient: undefined,
                    charter: false,
                    comments: "",
                    description: "",
                    express: false
                } as UserPackageInfo;
            } else if (action.payload === "reset") {
                return initialState;
            } else {
                return {
                    ...state,
                    type: action.payload,
                } as UserRideInfo;
            }
        },

        removeRider: (state, action: PayloadAction<{ index: number }>) => {
            if (isUserRideInfo(state)) {
                state.riders = state.riders.filter((_, index) => index !== action.payload.index);
            }
        },

        updateOtherTripData: (state, action: PayloadAction<Partial<Omit<UserRideInfo, "riders" | "destination" | "origin">>>) => {
            return {
                ...state,
                ...action.payload,
            };
        }
    }
});

// Type guards for determining the correct state type
function isUserRideInfo(state: InitialStateType): state is UserRideInfo {
    return state.type === "ride" || state.type === "travel";
}

function isUserPackageInfo(state: InitialStateType): state is UserPackageInfo {
    return state.type === "courier";
}

// Selector
export const selectSearchInfo = (state: RootState) => state.search;

// Action creators
export const {
    setOrigin,
    setDestination,
    addRideRiders,
    addPackageRecipient,
    removeRider,
    updateOtherTripData,
    setTripType,
} = searchSlice.actions;

export default searchSlice.reducer;
