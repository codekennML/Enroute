import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface Recipient {
    firstname: string;
    lastname: string;
    countryCode: number;
    mobile: number;
}

interface PackageDetails {
    recipient: Recipient;
    comments: string;
}

interface Place {
    name: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    state?: string;
    town?: string;
    country?: string;
    placeId: string;
}

interface PackageSchedulePayload {
    createdBy: string;
    type: 'HTH' | 'STS';
    budget: number;
    acceptedBudget?: number;
    packageDetails: PackageDetails;
    dueAt: Date;
    expiresAt: Date;
    status: 'filled' | 'created' | 'expired';
    totalDistance: number;
    destinationAddress: Place;
    pickupAddress: Place;
}

interface GetPackageSchedulesParams {
    packageScheduleId?: string;
    cursor?: string;
    pickupTown?: string;
    destinationTown?: string;
    sort?: string;
    expiresAt?: Date;
    budget?: {
        max: number;
        min: number;
    };
    type?: string;
    dateFrom?: Date;
    dateTo?: Date;
}

interface GetPackageByIdParams {
    id: string;
}

interface CancelPackageSchedulePayload {
    scheduleId: string;
}

interface DeletePackageSchedulesPayload {
    scheduleIds: string[];
}

interface GetPackageScheduleStatsParams {
    dateFrom?: Date;
    dateTo?: Date;
    country?: string;
    state?: string;
    town?: string;
    minBudget?: string;
    maxBudget?: number;
    type?: 'HTH' | 'STS';
}

export const packageScheduleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPackageSchedule: builder.mutation<any, PackageSchedulePayload>({
            query: (args) => ({
                url: '/package_schedule/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['packageSchedule'],
        }),

        getPackageSchedules: builder.query<any, GetPackageSchedulesParams>({
            query: (args) => ({
                url: '/package_schedule',
                params: args,
            }),
            providesTags: ['packageSchedule'],
        }),

        getPackageById: builder.query<any, GetPackageByIdParams>({
            query: (args) => ({
                url: `/package_schedule/${args.id}`,
                method: 'GET',
            }),
            providesTags: ['packageSchedule'],
        }),

        cancelPackageSchedule: builder.mutation<any, CancelPackageSchedulePayload>({
            query: (args) => ({
                url: '/package_schedule/cancel',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['packageSchedule'],
        }),

        deletePackageSchedules: builder.mutation<any, DeletePackageSchedulesPayload>({
            query: (args) => ({
                url: '/package_schedule/delete',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['packageSchedule'],
        }),

        getPackageScheduleStats: builder.query<any, GetPackageScheduleStatsParams>({
            query: (args) => ({
                url: '/package_schedule/stats/schedule',
                method: 'POST',
                body: args,
            }),
            providesTags: ['PackageSchedule'],
        }),
    }),
});

export const {
    useCreatePackageScheduleMutation,
    useGetPackageSchedulesQuery,
    useGetPackageByIdQuery,
    useCancelPackageScheduleMutation,
    useDeletePackageSchedulesMutation,
    useGetPackageScheduleStatsQuery,
} = packageScheduleApi;
