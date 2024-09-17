import { api } from "./apiSlice";

export interface Place {
    // Define the Place schema fields according to your placeSchema
}

export interface Trip {
    driverId: string;
    origin: Place;
    destination: Place;
    distance: number;
    totalfare?: number;
    seatAllocationsForTrip: number;
    route: string;
    initialStatus: 'none' | 'scheduled';
    status: 'cancelled' | 'ongoing' | 'completed' | 'crashed';
}

export interface GetTripsQueryParams {
    tripId?: string;
    driverId?: string;
    town?: string;
    state?: string;
    country?: string;
    cursor?: string;
}

export interface CanStartTripParams {
    id: string;
}

export interface GetDriverTripsParams {
    id: string;
}

export interface GetTripByIdParams {
    id: string;
}

export interface UpdateTripPayload {
    tripId: string;
    origin?: Place;
    destination?: Place;
    status?: 'crashed' | 'completed' | 'paused' | 'ongoing';
}

export interface CreateTripFromSchedulePayload {
    tripScheduleId: string;
}

export interface EndTripPayload {
    tripId: string;
    driverId: string;
}

export interface DeleteTripsPayload {
    tripIds: string[];
}

export interface StatsQueryParams {
    startDate: string; // Based on dateSeekSchema
    endDate: string;   // Based on dateSeekSchema
    country?: string;
    state?: string;
    town?: string;
    type?: 'cancelled' | 'ongoing' | 'completed' | 'crashed';
    user?: string;
    userType?: 'driver' | 'rider';
}




export const tripsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createTrip: builder.mutation<any, Trip>({
            query: (args) => ({
                url: '/trips/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['trip'],
        }),

        createTripFromSchedule: builder.mutation<any, CreateTripFromSchedulePayload>({
            query: (args) => ({
                url: '/trips/create_from_schedule',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['trip'],
        }),

        getTrips: builder.query<any, GetTripsQueryParams>({
            query: (params) => ({
                url: '/trips',
                method: 'GET',
                params,
            }),
            providesTags: ['trip'],
        }),

        getDriverTrips: builder.query<any, GetDriverTripsParams>({
            query: ({ id }) => ({
                url: `/trips/driver/${id}`,
                method: 'GET',
            }),
            providesTags: ['trip'],
        }),

        canStartTrip: builder.mutation<any, CanStartTripParams>({
            query: (args) => ({
                url: '/trips/canStartTrip',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['trip'],
        }),

        getTripById: builder.query<any, GetTripByIdParams>({
            query: ({ id }) => ({
                url: `/trips/${id}`,
                method: 'GET',
            }),
            providesTags: ['trip'],
        }),

        updateTrip: builder.mutation<any, UpdateTripPayload>({
            query: (args) => ({
                url: '/trips/update_trip',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['trip'],
        }),

        endTrip: builder.mutation<any, EndTripPayload>({
            query: (args) => ({
                url: '/trips/end',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['trip'],
        }),

        deleteTrips: builder.mutation<any, DeleteTripsPayload>({
            query: (args) => ({
                url: '/trips/delete',
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: ['trip'],
        }),

        getTripsStats: builder.query<any, StatsQueryParams>({
            query: (params) => ({
                url: '/trips/stats/calculate',
                method: 'GET',
                params,
            }),
            providesTags: ['trip'],
        }),
    }),
});

export const {
    useCreateTripMutation,
    useCreateTripFromScheduleMutation,
    useGetTripsQuery,
    useGetDriverTripsQuery,
    useCanStartTripMutation,
    useGetTripByIdQuery,
    useUpdateTripMutation,
    useEndTripMutation,
    useDeleteTripsMutation,
    useGetTripsStatsQuery,
} = tripsApi;