import { api } from './apiSlice'; // Adjust the import path as necessary
import { BusStation } from './ride';

// Define interfaces for the request payloads and query parameters
interface RideRequestPayload {
    tripScheduleId?: string;
    driverId: string;
    riderId: string;
    destination: BusStation;
    pickupPoint: BusStation;
    hasLoad: boolean;
    numberOfSeats?: number;
    type: 'ride' | 'travel';
    cancellationData?: {
        cancellationReason?: string;
        driverDistanceFromPickup?: number;
        driverEstimatedETA?: number;
    };
    totalRideDistance: number;
    initialStatus: 'scheduled' | 'live';
    riderBudget: number;
    driverBudget: number;
    driverDecision?: 'accepted' | 'rejected' | 'riderBudget';
    riderDecision?: 'accepted' | 'rejected';
    status: 'created' | 'cancelled' | 'closed';
    friendData?: {
        firstname: string;
        lastname: string;
        countryCode: string;
        mobile: string;
    }[];
}

interface GetRideRequestByTripScheduleParams {
    tripScheduleId?: string;
    cursor?: string;
    driverId: string;
}

interface GetRideRequestByIdParams {
    tripRequestId?: string;
}

interface AcceptRideScheduleRequestDriverPayload {
    rideRequestId: string;
    driverId: string;
}

interface RejectRideScheduleRequestDriverPayload {
    rideRequestId: string;
    driverId: string;
}

interface NegotiateRideScheduleRequestPricePayload {
    rideRequestId: string;
    driverBudget: number;
    driverId: string;
}

interface CancelRideRequestPayload {
    rideRequestId: string;
}

interface GetRideRequestsParams {
    cursor?: string;
    status?: string;
    tripScheduleId?: string;
    rideRequestId?: string;
    driverId?: string;
    sort?: string;
    type?: string;
    forThirdParty?: boolean;
}

interface RideRequestStatsParams {
    dateFrom?: Date;
    dateTo?: Date;
    status: 'created' | 'cancelled' | 'closed';
    type: 'city' | 'travel' | 'thirdParty';
    country?: string;
    state?: string;
    town?: string;
    riderId?: string;
    driverId?: string;
}

export const rideRequestsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createRideScheduleRequest: builder.mutation<any, RideRequestPayload>({
            query: (args) => ({
                url: '/ride_requests/create/schedule',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["rideRequest"],
        }),

        createLiveRideRequest: builder.mutation<any, RideRequestPayload>({
            query: (args) => ({
                url: '/ride_requests/create/live',
                method: 'GET',
                body: args,
            }),
            invalidatesTags: ["rideRequest"],
        }),

        getRideRequestByTripSchedule: builder.query<any, GetRideRequestByTripScheduleParams>({
            query: (args) => ({
                url: '/ride_requests/trip_schedule',
                params: args,
            }),
            providesTags: ["rideRequest"],
        }),

        getRideRequestById: builder.query<any, GetRideRequestByIdParams>({
            query: (args) => ({
                url: `/ride_requests/${args.tripRequestId}`,
                method: 'GET',
            }),
            providesTags: ["rideRequest"],
        }),

        acceptRideScheduleRequestDriver: builder.mutation<any, AcceptRideScheduleRequestDriverPayload>({
            query: (args) => ({
                url: '/ride_requests/driver/accept_schedule',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ["rideRequest"],
        }),

        rejectRideScheduleRequestDriver: builder.mutation<any, RejectRideScheduleRequestDriverPayload>({
            query: (args) => ({
                url: '/ride_requests/driver/reject_request',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ["rideRequest"],
        }),

        negotiateRideScheduleRequestPrice: builder.mutation<any, NegotiateRideScheduleRequestPricePayload>({
            query: (args) => ({
                url: '/ride_requests/driver/negotiate_schedule_fee',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ["rideRequest"],
        }),

        cancelRideRequest: builder.mutation<any, CancelRideRequestPayload>({
            query: (args) => ({
                url: '/ride_requests/cancel',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ["rideRequest"],
        }),

        getRideRequests: builder.query<any, GetRideRequestsParams>({
            query: (args) => ({
                url: '/ride_requests',
                params: args,
            }),
            providesTags: ["rideRequest"],
        }),

        getRideRequestStats: builder.query<any, RideRequestStatsParams>({
            query: (args) => ({
                url: '/ride_requests/stats/calculate',
                params: args,
            }),
            providesTags: ["rideRequest"],
        }),
    }),
});

export const {
    useCreateRideScheduleRequestMutation,
    useCreateLiveRideRequestMutation,
    useGetRideRequestByTripScheduleQuery,
    useGetRideRequestByIdQuery,
    useAcceptRideScheduleRequestDriverMutation,
    useRejectRideScheduleRequestDriverMutation,
    useNegotiateRideScheduleRequestPriceMutation,
    useCancelRideRequestMutation,
    useGetRideRequestsQuery,
    useGetRideRequestStatsQuery,
} = rideRequestsApi;
