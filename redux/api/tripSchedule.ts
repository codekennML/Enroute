import { api } from './apiSlice';
import { Place } from './packageSchedule';

// Define interfaces for request payloads and query parameters

interface TripSchedulePayload {
    driverId: string;
    origin: Place;
    destination: Place;
    departureTime: Date;
    seatAllocationsForTrip: number;
    route: string;
    status: 'created' | 'cancelled';
}

interface GetTripScheduleParams {
    scheduleId?: string;
    cursor?: string;
    sort?: string;
    driverId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    town?: string;
    state?: string;
    country?: string;
}

interface GetTripScheduleByIdParams {
    tripScheduleId: string;
}

interface CancelTripSchedulePayload {
    tripScheduleId: string;
}

interface UpdateTripDepartureTimePayload {
    tripScheduleId: string;
    departureTime: Date;
}

interface DeleteTripSchedulePayload {
    tripScheduleIds: string[];
}

interface TripScheduleStatsParams {
    dateFrom?: Date;
    dateTo?: Date;
    status?: 'created' | 'cancelled' | 'started';
    country?: string;
    state?: string;
    town?: string;
}

export const tripScheduleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createTripSchedule: builder.mutation<any, TripSchedulePayload>({
            query: (args) => ({
                url: '/trip-schedule/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['tripSchedule'],
        }),

        getTripSchedules: builder.query<any, GetTripScheduleParams>({
            query: (args) => ({
                url: '/trip-schedule',
                params: args,
            }),
            providesTags: ['tripSchedule'],
        }),

        getTripScheduleById: builder.query<any, GetTripScheduleByIdParams>({
            query: (args) => ({
                url: `/trip-schedule/${args.tripScheduleId}`,
                method: 'GET',
            }),
            providesTags: ['tripSchedule'],
        }),

        cancelTripSchedule: builder.mutation<any, CancelTripSchedulePayload>({
            query: (args) => ({
                url: '/trip-schedule/cancel',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['tripSchedule'],
        }),

        updateTripDepartureTime: builder.mutation<any, UpdateTripDepartureTimePayload>({
            query: (args) => ({
                url: '/trip-schedule/update_time',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['tripSchedule'],
        }),

        deleteTripSchedules: builder.mutation<any, DeleteTripSchedulePayload>({
            query: (args) => ({
                url: '/trip-schedule/delete',
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: ['tripSchedule'],
        }),

        getTripScheduleStats: builder.query<any, TripScheduleStatsParams>({
            query: (args) => ({
                url: '/trip-schedule/stats/calculate',
                params: args,
            }),
            providesTags: ['tripSchedule'],
        }),
    }),
});

export const {
    useCreateTripScheduleMutation,
    useGetTripSchedulesQuery,
    useGetTripScheduleByIdQuery,
    useCancelTripScheduleMutation,
    useUpdateTripDepartureTimeMutation,
    useDeleteTripSchedulesMutation,
    useGetTripScheduleStatsQuery,
} = tripScheduleApi;
