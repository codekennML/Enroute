// // src/slices/chatApiSlice.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { api } from './apiSlice';

// interface Chat {
//   _id: string;
//   users: string[];
//   lastMessage?: {
//     content: string;
//     senderId: string;
//     timestamp: number;
//   };
//   // Add other chat properties as needed
// }

// interface Message {
//   _id: string;
//   chatId: string;
//   content: string;
//   senderId: string;
//   timestamp: number;
//   status?: 'pending' | 'sent' | 'error';
// }

// export const chatApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     // getChats: builder.query<Chat[], void>({
//     //   query: () => 'chats',
//     //   providesTags: ['Chat'],
//     // }),

//     getChatMessage: builder.query<Chat, string>({
//       query: (id) => ({
//         url : `messga/${id}`,
//         method : "GET"
//       }) ,
//     //   providesTags: (result, error, id) => [{ type: 'Chat', id }],
//     }),

//     getChatMessages: builder.query<Message[], string>({
//       query: (chatId) => `chats/${chatId}/messages`,
//       providesTags: (result, error, chatId) => [{ type: 'Chat', id: chatId }],
//     }),

//     updateChat: builder.mutation<Chat, Partial<Chat> & Pick<Chat, '_id'>>({
//       query: ({ _id, ...patch }) => ({
//         url: `chats/${_id}`,
//         method: 'PATCH',
//         body: patch,
//       }),
//       invalidatesTags: (result, error, { _id }) => [{ type: 'Chat', id: _id }],
//     }),

//     // addMessage: builder.mutation<Message, Omit<Message, '_id'>>({
//     //   query: (newMessage) => ({
//     //     url: `chats/${newMessage.chatId}/messages`,
//     //     method: 'POST',
//     //     body: newMessage,
//     //   }),
//     //   async onQueryStarted(newMessage, { dispatch, queryFulfilled }) {
//     //     const patchResult = dispatch(
//     //       chatApi.util.updateQueryData('getChatMessages', newMessage.chatId, (draft) => {
//     //         draft.push({ ...newMessage, _id: 'temp-' + Date.now(), status: 'pending' });
//     //       })
//     //     );
//     //     try {
//     //       const { data } = await queryFulfilled;
//     //       dispatch(
//     //         chatApi.util.updateQueryData('getChatMessages', newMessage.chatId, (draft) => {
//     //           const index = draft.findIndex(m => m._id === 'temp-' + Date.now());
//     //           if (index !== -1) {
//     //             draft[index] = { ...data, status: 'sent' };
//     //           }
//     //         })
//     //       );
//     //     } catch {
//     //       patchResult.undo();
//     //       dispatch(
//     //         chatApi.util.updateQueryData('getChatMessages', newMessage.chatId, (draft) => {
//     //           const index = draft.findIndex(m => m._id === 'temp-' + Date.now());
//     //           if (index !== -1) {
//     //             draft[index].status = 'error';
//     //           }
//     //         })
//     //       );
//     //     }
//     //   },
//     //   invalidatesTags: (result, error, { chatId }) => [{ type: 'Chat', id: chatId }],
//     // }),
//   }),
// });

// export const {
// //   useGetChatsQuery,
//   useGetChatByIdQuery,
//   useGetChatMessagesQuery,
//   useUpdateChatMutation,
// //   useAddMessageMutation,
// } = chatApi;