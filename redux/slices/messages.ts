// src/slices/messagesSlice.ts
import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Message {
  id?: string;
  body: string;
  sentBy: string;
  sentAt: string, //date
  rideId: string
  tempId?: string
  chatId: string
  // status: 'pending' | 'sent' | 'error';
}

const messagesAdapter = createEntityAdapter<Message, string>({
  selectId: (item) => item?.id ?? item.tempId!
  // sortComparer: (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime(),
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
    updateMessageStatus: messagesAdapter.updateOne,
    removeMessage: messagesAdapter.removeOne,
  },
});

export const { addMessage, addMessages, updateMessageStatus, removeMessage } = messagesSlice.actions;

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors<RootState>(state => state.messages);

export default messagesSlice.reducer;