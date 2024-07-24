import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserInfo, Location } from '@/types/types'
import { RootState } from '../store'



const initialState: Partial<UserInfo> = {
    name: "Anita Vernon",
    mobile: 8105481998,
    countryCode: 234,
    email: "anita.v@example.com",
    avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.O04oqzX_nVxg5iKkjtVmfQHaLH%26pid%3DApi%26h%3D160&f=1&ipt=91f314318b43a55b9dbad3f606845334088f6729eaa78f765db5a1f71f037e6a&ipo=images",
    state: {
        name: "Lagos",
        lat: 6.524379,
        lng: 3.379205,
    },
    country: {
        name: "Nigeria",
        lat: 8.9959457,
        lng: 3.3818409,
        short_name: "ng"
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setCountry: (state, action: PayloadAction<Partial<Pick<UserInfo, "country">>>) => {
            state.country = {
                ...state.country,
                ...action.payload
            }
        },
        setState: (state, action: PayloadAction<Pick<UserInfo, "state">>) => {
            state.state = {
                ...state.state,
                ...action.payload
            }
        },


        updateOtherUserData: (state, action: PayloadAction<Omit<UserInfo, "country" | "state">>) => {

            state = {
                ...state,
                ...action.payload
            }

        }

    },
})

export const selectUserInfo = (state: RootState) => state.user

// Action creators are generated for each case reducer function
export const { setCountry, setState, updateOtherUserData } = userSlice.actions

export default userSlice.reducer