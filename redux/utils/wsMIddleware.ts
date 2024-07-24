import { PayloadAction } from '@reduxjs/toolkit';
// src/middleware/webSocketMiddleware.ts

import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import WebSocketService from './websockets';
import { connect, disconnect, sendMessage, open, close, error } from '../slices/websocket';
import { addOffers } from '../slices/offers';




const webSocketMiddleware: Middleware = (store: MiddlewareAPI<Dispatch<AnyAction>>) => {
    const webSocketService = WebSocketService.getInstance();

    webSocketService.setMessageHandler((message) => {
        switch (message.type) {

            case 'offer':
                store.dispatch(addOffers(message.payload));
                break;
            case 'offerFinal':
                // store.dispatch(messageTypeA(message.payload));
                break;

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
        console.log("action.type", action?.type)
        switch (action.type) {
            case connect?.type:
                webSocketService.updateToken(action.payload.token);
                break;

            case disconnect?.type:
                webSocketService.destroy();
                break;

            case sendMessage?.type:
                if (webSocketService.isOpen()) {
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
