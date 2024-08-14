import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserInfo, Location } from '@/types/types'
import { RootState } from '../store'
import { Message } from './messages'

interface ChatNotification {
  chatId: string,
  rideId: string,
  unreadCount: number,
  latestMessage?: Omit<Message, "rideId" | "chatId">
}



const initialState: { activeChat: string, chats: ChatNotification[], notificationInfo: Record<string, string> } = {
  activeChat: "",
  chats: [],
  notificationInfo: {

  }
}

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {

    setActiveChat: (state, action: PayloadAction<string>) => {
      if (action.payload && action.payload !== "") {
        state.activeChat = action.payload
      }
    },

    addChat: (state, action: PayloadAction<ChatNotification>) => {
      state.chats.push(action.payload)
    },

    updateChatInfo: (state, action: PayloadAction<ChatNotification>) => {

      const chat = state.chats.find(chat => chat.chatId === action.payload.chatId)
      state.chats = state.chats.filter(chat => chat.chatId !== action.payload.chatId)

      state.chats.unshift({ ...action.payload, unreadCount: (chat?.unreadCount || 0) + 1, })
    },

    removeChatOnRideEnded: (state, action: PayloadAction<{ id: string }>) => {
      state.chats = state.chats.filter(chat => chat.chatId !== action.payload.id)
    }
  }
})

export const selectActiveChat = (state: RootState) => state.activeChat

// Action creators are generated for each case reducer function
export const { setActiveChat, updateChatInfo, addChat } = chatSlice.actions

export default chatSlice.reducer