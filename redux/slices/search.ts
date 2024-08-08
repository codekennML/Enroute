import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RiderData, UserRideInfo, Location, UserPackageInfo } from '@/types/types'
import { RootState } from '../store'

type InitialStateType = UserRideInfo | UserPackageInfo

const initialState: InitialStateType = {
    //Lets initially populate with only ride information , when a user selects a different trip type we can change the type and state values
    destination: undefined,
    origin: undefined,
    busStopName: "",
    budget: 300,
    riders: [],
    luggage: "",
    charter: false,
    type: "ride"
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

        setOrigin: (state, action: PayloadAction<Location>) => {
            state.origin = action.payload
            // console.log(action.payload)

        },
        setDestination: (state, action: PayloadAction<Location | undefined>) => {
            state.destination = action.payload
            // console.log(action.payload, "destination")
        },

        addRideRiders: (state, action: PayloadAction<RiderData[]>) => {
            if ("riders" in state) {

                state.riders = action.payload
            }
        },

        addPackageRecipient: (state, action: PayloadAction<RiderData>) => {
            if ("recipient" in state) {
                state.recipient = action.payload
                // console.log(action, state, "INFO")
            }
        },



        setTripType: (state, action) => {
            if (action.payload === "courier") {
                // Reset to initial values for courier
                return {
                    origin: undefined,
                    destination: undefined,
                    type: "courier",
                    budget: 500,
                    recipient: undefined,
                    charter: false,
                    comments: "",
                    description: "",
                }
            } else if (action.payload === "reset") {
                // Reset to initial state
                return initialState
            } else {
                // Set the trip type without changing other state properties
                return {
                    ...state,
                    type: action.payload as "ride" | "travel" | "courier"
                };
            }
        },


        removeRider: (state, action: PayloadAction<{ index: number }>) => {

            if ("riders" in state) {
                state = {
                    ...state,
                    riders: state.riders.filter((rider, index) => index !== action.payload.index)
                }
            }
        },

        updateOtherTripData: (state, action: PayloadAction<Partial<Omit<UserRideInfo, "riders" | "destination" | "origin">>>) => {

            return {
                ...state,
                ...action.payload,
            }


        }
    }
})

export const selectSearchInfo = (state: RootState) => state.search

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, addRideRiders, addPackageRecipient, removeRider, updateOtherTripData, setTripType } = searchSlice.actions

export default searchSlice.reducer