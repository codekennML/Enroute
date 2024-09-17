import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import searchReducer from "@/redux/slices/search"
import userReducer from "@/redux/slices/user"
import toastReducer from "@/redux/slices/toast"
import offerReducer from "@/redux/slices/offers"
import notificationReducer from "@/redux/slices/wsNotifications"
import websocketReducer from "@/redux/slices/websocket"
import messagesReducer from "@/redux/slices/messages"
import verificationReducer from "@/redux/slices/verification"
import busStationReducer from "@/redux/slices/busStations"
import activeChatReducer from "@/redux/slices/chats"
import pushNotificationReducer from "@/redux/slices/notifications/app"
import { api } from "@/redux/api/apiSlice"
import webSocketMiddleware from './utils/wsMIddleware'
import verificationFieldsReducer from '@/redux/slices/verifyfields'


export const store = configureStore({
    reducer: {
        search: searchReducer,
        user: userReducer,
        toast: toastReducer,
        offers: offerReducer,
        websocket: websocketReducer,
        rideNotification: notificationReducer,
        pushNotifications: pushNotificationReducer,
        messages: messagesReducer,
        stations: busStationReducer,
        verification: verificationReducer,
        verifyFields: verificationFieldsReducer,
        activeChat: activeChatReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([api.middleware, webSocketMiddleware]),
    devTools: true

})

setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch