// src/slices/chatApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { api } from './apiSlice';
import { addMessages } from '../slices/messages';

interface Chat {
    _id: string;
    users: string[];
    lastMessage?: {
        content: string;
        senderId: string;
        timestamp: number;
    };
    // Add other chat properties as needed
}

interface Message {
    _id: string;
    chatId: string;
    content: string;
    senderId: string;
    timestamp: number;
    status?: 'pending' | 'sent' | 'error';
}

export interface MessageQuery { chatId: string, sort?: string, cursor?: string, rideId: string }


export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createChat: builder.query<Chat, { users: string[], status: "open" | "completed", rideId: string, tripId: string, }>({
            query: (args) => ({
                url: "/chats",
                body: {
                    ...args
                }
            }),
            //   providesTags: ['Chat'],
        }),

        getChatById: builder.query<Chat, string>({
            query: (id) => ({
                url: `chats/${id}`,
                method: "GET"
            }),
            //   providesTags: (result, error, id) => [{ type: 'Chat', id }],
        }),

        getChatMessages: builder.query<Message[], MessageQuery>({
            query: (args) => ({
                url: `messages`,
                params: {
                    chatId: args.chatId,
                    rideId: args.rideId,
                    cursor: args.cursor,
                    sort: `createdAt_-1`
                }
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Dispatch the messages to your entity adapter
                    dispatch(addMessages(data));
                } catch (error) {
                    // Handle any errors
                    console.error('Error fetching messages:', error);
                }
            },
            //   providesTags: (result, error, chatId) => [{ type: 'Chat', id: chatId }],
        }),

        endChat: builder.mutation<Chat, { chatId: string }>({
            query: (args) => ({
                url: `chats`,
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: (result, error, { _id }) => [{ type: 'Chat', id: _id }],
        }),

        // addMessage: builder.mutation<Message, Omit<Message, '_id'>>({
        //   query: (newMessage) => ({
        //     url: `chats/${newMessage.chatId}/messages`,
        //     method: 'POST',
        //     body: newMessage,
        //   }),
        //   async onQueryStarted(newMessage, { dispatch, queryFulfilled }) {
        //     const patchResult = dispatch(
        //       chatApi.util.updateQueryData('getChatMessages', newMessage.chatId, (draft) => {
        //         draft.push({ ...newMessage, _id: 'temp-' + Date.now(), status: 'pending' });
        //       })
        //     );
        //     try {
        //       const { data } = await queryFulfilled;
        //       dispatch(
        //         chatApi.util.updateQueryData('getChatMessages', newMessage.chatId, (draft) => {
        //           const index = draft.findIndex(m => m._id === 'temp-' + Date.now());
        //           if (index !== -1) {
        //             draft[index] = { ...data, status: 'sent' };
        //           }
        //         })
        //       );
        //     } catch {
        //       patchResult.undo();
        //       dispatch(
        //         chatApi.util.updateQueryData('getChatMessages', newMessage.chatId, (draft) => {
        //           const index = draft.findIndex(m => m._id === 'temp-' + Date.now());
        //           if (index !== -1) {
        //             draft[index].status = 'error';
        //           }
        //         })
        //       );
        //     }
        //   },
        //   invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
        // }),
    }),
});

export const {
    //   useGetChatsQuery,
    useGetChatByIdQuery,
    useGetChatMessagesQuery,
    useEndChatMutation
    //   useAddMessageMutation,
} = chatApi;