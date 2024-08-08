import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserInfo, Location } from '@/types/types'
import { RootState } from '../store'



const initialState = {
  activeChat: ""
}

export const chatSlice = createSlice({
  name: 'activeChat',
  initialState,
  reducers: {

    setActiveChat: (state, action: PayloadAction<string>) => {
      if (action.payload && action.payload !== "") {
        state.activeChat = action.payload
      }
    },
  }
})

export const selectActiveChat = (state: RootState) => state.activeChat

// Action creators are generated for each case reducer function
export const { setActiveChat } = chatSlice.actions

export default chatSlice.reducer