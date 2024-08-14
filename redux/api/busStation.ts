import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads
interface Location {
    type: 'Point';
    coordinates: [number, number];
}

interface CreateBusStationPayload {
    name: string;
    placeId: string;
    active: boolean;
    location: Location;
    suggestedBy?: string;
    approvedBy?: string;
    user: string;
}

interface GetBusStationsParams {
    stationId?: string;
    cursor?: string;
    town?: string;
    state?: string;
    country?: string;
    sort?: string;
    active?: boolean;
    dateFrom?: Date;
    dateTo?: Date;
}

interface GetBusStationByIdParams {
    id: string;
}

interface SuggestBusStationPayload {
    user: string;
}

interface ConsiderSuggestedStationPayload {
    stationId: string;
    decision: 'approved' | 'rejected';
}

interface UpdateBusStationPayload extends Omit<CreateBusStationPayload, 'user'> {
    stationId: string;
}

interface DeleteBusStationsPayload {
    busStationIds: string[];
}

interface CalculateBusStationsStatsPayload {
    country?: string;
    town?: string;
    state?: string;
}

export const busStationApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createBusStation: builder.mutation<any, CreateBusStationPayload>({
            query: (args) => ({
                url: '/busStations/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['BusStation'],
        }),

        getBusStations: builder.query<any, GetBusStationsParams>({
            query: (args) => ({
                url: '/busStations',
                params: args,
            }),
            providesTags: ['BusStation'],
        }),

        getBusStationById: builder.query<any, GetBusStationByIdParams>({
            query: (args) => ({
                url: `/busStations/${args.id}`,
                method: 'GET',
            }),
            providesTags: ['BusStation'],
        }),

        suggestBusStation: builder.mutation<any, SuggestBusStationPayload>({
            query: (args) => ({
                url: '/busStations/suggest',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['BusStation'],
        }),

        considerSuggestedStation: builder.mutation<any, ConsiderSuggestedStationPayload>({
            query: (args) => ({
                url: '/busStations/considerSuggestion',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['BusStation'],
        }),

        updateBusStation: builder.mutation<any, UpdateBusStationPayload>({
            query: (args) => ({
                url: '/busStations/update',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['BusStation'],
        }),

        deleteBusStations: builder.mutation<any, DeleteBusStationsPayload>({
            query: (args) => ({
                url: '/busStations/delete',
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: ['BusStation'],
        }),

        calculateBusStationsStats: builder.mutation<any, CalculateBusStationsStatsPayload>({
            query: (args) => ({
                url: '/busStations/stats/calculate',
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: ['BusStation'],
        }),
    }),
});

export const {
    useCreateBusStationMutation,
    useGetBusStationsQuery,
    useGetBusStationByIdQuery,
    useSuggestBusStationMutation,
    useConsiderSuggestedStationMutation,
    useUpdateBusStationMutation,
    useDeleteBusStationsMutation,
    useCalculateBusStationsStatsMutation,
} = busStationApi;
