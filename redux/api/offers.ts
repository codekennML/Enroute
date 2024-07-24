import { OfferCardProps } from "@/components/custom/driverPriceCard";
import WebSocketService from "../utils/websockets";
import { api } from "./apiSlice"
import { offersAdapter } from "../slices/offers";
import { EntityId, EntityState } from "@reduxjs/toolkit";


export const offersApi = api.injectEndpoints({
    endpoints: (builder) => ({

        streamOffers: builder.query<OfferCardProps[], { token: string }>({

            //Connect the websocket instance here first with the user query searching for the drivers and then stream the response 
            queryFn: () => ({ data: [] }),

            async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved, cacheDataLoaded }: any) {

                const wsService = WebSocketService.getInstance();
                wsService.updateToken(arg.token);

                // Handle incoming WebSocket messages
                const handleMessage = (message: any) => {
                    if (message?.type !== "driverPackageStream") return


                    updateCachedData((draft: EntityState<OfferCardProps, EntityId>) => {
                        //@ts-expect-error //cant infer type of draft
                        offersAdapter.upsertOne(draft, {
                            ...message,
                            expiresAt: Date.now() + 60_000,
                        });
                    });


                }

                // Set the message handler
                wsService.setMessageHandler(handleMessage);

                // Clean up when the cache entry is removed
                await cacheEntryRemoved;

                // Remove the message handler
                wsService.setMessageHandler(null);

                // Close the WebSocket connection if necessary
                wsService.destroy();


            },
        }),


    }),
})
