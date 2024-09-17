import { updateStations } from '../slices/busStations';
import { store } from '../store';
import { getInitialBusStationsSchema } from './../../../../route/src/routes/schemas/busStation';
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
            invalidatesTags: ['busstation'],
        }),

        getBusStations: builder.query<any, GetBusStationsParams>({
            query: (args) => ({
                url: '/busStations',
                params: args,
            }),
            providesTags: ['busstation'],
        }),

        autoCompleteBusStations: builder.query<any, string>({
            query: (args) => ({
                url: `bus_station/autocomplete/?query=${encodeURIComponent(args)}`,
                method: "GET"
            }),
            transformResponse: (response) => {

                return { data: response?.data }
            },
            // transformErrorResponse: ()

            providesTags: ['busstation'],
        }),

        getInitialBusStations: builder.query<any, { lat?: number, lng?: number, state?: string, country: string }>({
            query: (args) => {

                const params = new URLSearchParams();

                // Add parameters conditionally to avoid `undefined` values
                if (args.lat !== undefined) params.append('lat', args.lat.toString());
                if (args.lng !== undefined) params.append('lng', args.lng.toString());
                if (args.state) params.append('state', args.state);
                params.append('country', args.country);

                return {
                    url: `bus_station/get_initial_station/?${params.toString()}`,
                    method: "GET"
                };
            },
            transformResponse: (response) => {
                const { data } = response
                store.dispatch(updateStations(data))
            },
            providesTags: ['busstation'],
        }),

        getBusStationById: builder.query<any, GetBusStationByIdParams>({
            query: (args) => ({
                url: `/bus_station/${args.id}`,
                method: 'GET',
            }),
            providesTags: ['busstation'],
        }),

        suggestBusStation: builder.mutation<any, SuggestBusStationPayload>({
            query: (args) => ({
                url: '/bus_station/suggest',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['busstation'],
        }),

        considerSuggestedStation: builder.mutation<any, ConsiderSuggestedStationPayload>({
            query: (args) => ({
                url: '/bus_station/considerSuggestion',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['busstation'],
        }),

        updateBusStation: builder.mutation<any, UpdateBusStationPayload>({
            query: (args) => ({
                url: '/bus_station/update',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['busstation'],
        }),

        deleteBusStations: builder.mutation<any, DeleteBusStationsPayload>({
            query: (args) => ({
                url: '/bus_station/delete',
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: ['busstation'],
        }),

        calculateBusStationsStats: builder.mutation<any, CalculateBusStationsStatsPayload>({
            query: (args) => ({
                url: '/bus_station/stats/calculate',
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: ['busstation'],
        }),
    }),
});

export const {
    useAutoCompleteBusStationsQuery,
    useGetInitialBusStationsQuery,
    useCreateBusStationMutation,
    useGetBusStationsQuery,
    useGetBusStationByIdQuery,
    useSuggestBusStationMutation,
    useConsiderSuggestedStationMutation,
    useUpdateBusStationMutation,
    useDeleteBusStationsMutation,
    useCalculateBusStationsStatsMutation,
} = busStationApi;
