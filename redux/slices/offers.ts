import { OfferCardProps } from "@/components/custom/driverPriceCard";
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { store } from "../store";

// Create an entity adapter for OfferCardProps
export const offersAdapter = createEntityAdapter({
    selectId: (offer: OfferCardProps) => offer.id,
    sortComparer: (a, b) => {
        if (!a.estimatedArrivalTimeInMinutes && !b.estimatedArrivalTimeInMinutes) return 0;
        if (!a.estimatedArrivalTimeInMinutes) return -1;
        if (!b.estimatedArrivalTimeInMinutes) return 1;


        if (a.estimatedArrivalTimeInMinutes < b.estimatedArrivalTimeInMinutes) return -1;
        if (a.estimatedArrivalTimeInMinutes > b.estimatedArrivalTimeInMinutes) return 1;
        return 0;
    }
});

// Create the initial state using the adapter's getInitialState method
const initialState = offersAdapter.getInitialState();

// Create a slice
const offersSlice = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        addOffers: offersAdapter.addMany,
        addOffer: (state, action: PayloadAction<OfferCardProps>) => {
            const newOffer = action.payload;
            if (!state.entities[newOffer.id]) {
                state.ids.unshift(newOffer.id);
                state.entities[newOffer.id] = newOffer;
            }
        },
        removeAllOffers: offersAdapter.removeAll,
        updateOffer: offersAdapter.updateOne,
        removeOffer: offersAdapter.removeOne,
    },
});

// Export the actions
export const { addOffers, addOffer, updateOffer, removeOffer, removeAllOffers } = offersSlice.actions;

// Create selectors
const offerSelectors = offersAdapter.getSelectors<RootState>(
    (state) => state.offers
);

// Export selectors for usage
export const selectAllOffers = offerSelectors.selectAll;
export const selectOfferById = offerSelectors.selectById;

export default offersSlice.reducer;
