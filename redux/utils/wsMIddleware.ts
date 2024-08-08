import { PayloadAction } from '@reduxjs/toolkit';
// src/middleware/webSocketMiddleware.ts

import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import WebSocketService from './websockets';
import { connect, disconnect, sendMessage, open, close, error } from '../slices/websocket';
import { addOffers } from '../slices/offers';
import { addMessage, removeMessage, updateMessageStatus } from '../slices/messages';




const webSocketMiddleware: Middleware = (store: MiddlewareAPI<Dispatch<AnyAction>>) => {
    const webSocketService = WebSocketService.getInstance();

    webSocketService.setMessageHandler((message) => {

        switch (message.type) {

            case 'offer':
                store.dispatch(addOffers(message.payload));
                break;
            // case 'offerFinal':
            //     // store.dispatch(messageTypeA(message.payload));
            //     break;

            case 'chat_message':
                //Add the icomng message to the cachee
                const { sentBy, chatId, body, messageId, sentAt, rideId } = message.payload

                //Check the state of the application if it is in the background, sent anotification of message, otherwise z\

                //Check the active chat , if it the one for which this mssage was sent , dispatch the message , if not a push notification of new chat will work 

                if (store.getState().activeChat === chatId) {
                    store.dispatch(addMessage({
                        sentBy,
                        sentAt,
                        body,
                        id: messageId,
                        chatId,
                        rideId
                    }));
                }
                else {
                    //TODO SEND PUSH NOTIFICATION
                }


                break;


            case "ws_response":
                //Check if there was an error here from the response  

                const { success, topic, message } = message.payload

                if (topic === "chatMessage" && !success) {
                    store.dispatch(removeMessage(JSON.parse(message)?.tempId));
                }
                if (topic === "chatMessage" && success) {
                    store.dispatch(updateMessageStatus({
                        id: message.payload.tempId,
                        changes: {
                            id: message.payload.messageid,
                            status: 'sent'
                        }
                    }));
                }
                break
            // case 'trip_driver_intra':
            //     store.dispatch(messageTypeB(message.payload));
            //     break;

            // case 'trip_driver_inter':
            //     store.dispatch(messageTypeB(message.payload));
            //     break;

            // case 'trip_driver_courier':
            //     store.dispatch(messageTypeB(message.payload));
            //     break;
            // case 'ride_rider_courier':
            //     store.dispatch(messageTypeB(message.payload));
            //     break;

            // case 'ride_rider_intra':
            //     store.dispatch(messageTypeB(message.payload));
            //     break;
            // case 'ride_rider_inter':
            //     store.dispatch(messageTypeB(message.payload));
            //     break;


            default:
                store.dispatch({ type: 'websocket/unknownMessageType', payload: message });
                break;
        }
    });

    return next => (action) => {
        // console.log("action.type", action?.type)
        switch (action.type) {
            case connect?.type:
                webSocketService.updateToken(action.payload.token);
                break;

            case disconnect?.type:
                webSocketService.destroy();
                break;

            case sendMessage?.type:
                if (webSocketService.isOpen()) {
                    console.log(action.payload)
                    webSocketService.send(action.payload);
                }
                break;


            default:
                break;
        }

        return next(action);
    };
};

export default webSocketMiddleware;
