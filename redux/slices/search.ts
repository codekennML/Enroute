import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RiderData, TripInfo, Location } from '@/types/types'
import { RootState } from '../store'


const initialState: TripInfo = {
    budget: 200,
    riders: [],
    seats: 1,
    luggage: false,
    charter: false,
    now: true,
    // express: false,
    type: "intra"
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

        setOrigin: (state, action: PayloadAction<Location>) => {
            state.origin = action.payload
        },
        setDestination: (state, action: PayloadAction<Location>) => {
            state.destination = action.payload
        },

        addRideRiders: (state, action: PayloadAction<RiderData>) => {
            if ("riders" in state) {
                state.riders.push(action.payload)

            }
        },

        addPackageRecipient: (state, action: PayloadAction<RiderData>) => {
            if ("recipient" in state) {
                state.recipient = action.payload
            }
        },

        updateRiderStatus: (state, action: PayloadAction<RiderData & { index: number, active: boolean }>) => {

            if ("riders" in state) {
                const index = action.payload.index
                state.riders[index].active = action.payload.active
            }
        },

        setTripType: (state, action) => {

            if ("recipient" in state) {
                state.type = "courier"
            }
            else {
                state.type = action.payload
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

        updateOtherTripData: (state, action: PayloadAction<Omit<TripInfo, "riders" | "destination" | "origin">>) => {

            console.log(action.payload)
            state = {
                ...state,
                ...action.payload,

            }
        }
    }
})

export const selectSearchInfo = (state: RootState) => state.search

// Action creators are generated for each case reducer function
export const { setOrigin, setDestination, addRideRiders, addPackageRecipient, updateRiderStatus, removeRider, updateOtherTripData, setTripType } = searchSlice.actions

export default searchSlice.reducer