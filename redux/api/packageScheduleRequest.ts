import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface PackageScheduleRequestPayload {
    packageScheduleId: string;
    budget: number;
    body: string;
    status: 'accepted' | 'rejected' | 'cancelled' | 'created';
}

interface ApprovePackageScheduleRequestPayload {
    packageScheduleId: string;
    packageRequestId: string;
}

interface GetPackageScheduleRequestParams {
    packageScheduleId?: string;
    cursor?: string;
    pickupTown?: string;
    sort?: string;
    expiresAt?: Date;
    budget?: {
        max?: number;
        min?: number;
    };
    status?: string;
    dateFrom?: Date;
    dateTo?: Date;
}

interface GetPackageRequestScheduleByIdParams {
    id: string;
}

interface CancelPackageScheduleRequestPayload {
    scheduleRequestId: string;
}

interface DeletePackageScheduleRequestPayload {
    scheduleRequestIds: string[];
}

export const packageScheduleRequestApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPackageScheduleRequest: builder.mutation<any, PackageScheduleRequestPayload>({
            query: (args) => ({
                url: '/package_schedule_request/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['packageScheduleRequest'],
        }),

        approvePackageScheduleRequest: builder.mutation<any, ApprovePackageScheduleRequestPayload>({
            query: (args) => ({
                url: '/package_schedule_request/approve/schedule',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['packageScheduleRequest'],
        }),

        cancelPackageScheduleRequest: builder.mutation<any, CancelPackageScheduleRequestPayload>({
            query: (args) => ({
                url: '/package_schedule_request/cancel/schedule',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['packageScheduleRequest'],
        }),

        getPackageScheduleRequests: builder.query<any, GetPackageScheduleRequestParams>({
            query: (args) => ({
                url: '/package_schedule_request',
                params: args,
            }),
            providesTags: ['packageScheduleRequest'],
        }),

        getPackageScheduleRequestById: builder.query<any, GetPackageRequestScheduleByIdParams>({
            query: (args) => ({
                url: `/package_schedule_request/${args.id}`,
                method: 'GET',
            }),
            providesTags: ['packageScheduleRequest'],
        }),

        deletePackageScheduleRequests: builder.mutation<any, DeletePackageScheduleRequestPayload>({
            query: (args) => ({
                url: '/package_schedule_request/delete',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['packageScheduleRequest'],
        }),
    }),
});

export const {
    useCreatePackageScheduleRequestMutation,
    useApprovePackageScheduleRequestMutation,
    useCancelPackageScheduleRequestMutation,
    useGetPackageScheduleRequestsQuery,
    useGetPackageScheduleRequestByIdQuery,
    useDeletePackageScheduleRequestsMutation,
} = packageScheduleRequestApi;
