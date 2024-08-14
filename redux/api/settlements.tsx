import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface InitializeSettlementPaymentPayload {
    amount: number;
    processor: 'Paystack' | 'Stripe';
    driverId: string;
    driverEmail?: string;
    driverPushId?: string;
    data?: Record<string, any>;
    rides?: string[];
    isPaymentInit: boolean;
    refunded: boolean;
    workerCreated?: boolean;
    settlements?: {
        type: 'commission' | 'subscription';
        amount: number;
    }[];
    type: 'commission' | 'subscription' | 'both';
}

interface WebhookPayload {
    event: string;
    data: Record<string, any>;
}

interface GetSettlementsForDriverParams {
    cursor?: string;
    driverId: string;
}

interface GetSingleSettlementParams {
    id: string;
}

interface UpdateSettlementPayload {
    status: string;
    settlementId: string;
}

interface DeleteSettlementsPayload {
    settlementIds: string[];
}

interface GetSettlementAdminParams {
    maxAmount?: number;
    minAmount?: number;
    processor?: 'Paystack' | 'Stripe';
    driverId?: string;
    sort?: string;
    cursor?: string;
    status?: 'created' | 'success' | 'failed';
    rides?: string[];
}

interface GetSettlementStatsParams {
    driverId?: string;
    sort?: string;
    type?: string;
    amountFrom: number;
    amountTo?: number;
    dateFrom?: Date;
    dateTo?: Date;
}

export const settlementsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        initializeSettlementPayments: builder.mutation<any, InitializeSettlementPaymentPayload>({
            query: (args) => ({
                url: '/settlements/initialize',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['settlement'],
        }),

        getSingleSettlement: builder.query<any, GetSingleSettlementParams>({
            query: (args) => ({
                url: `/settlements/${args.id}`,
                method: 'GET',
            }),
            providesTags: ['settlement'],
        }),

        getSettlementsForDriver: builder.query<any, GetSettlementsForDriverParams>({
            query: (args) => ({
                url: '/settlements/driver',
                params: args,
            }),
            providesTags: ['settlement'],
        }),

        // updateSettlement: builder.mutation<any, UpdateSettlementPayload>({
        //   query: (args) => ({
        //     url: '/settlements/update',
        //     method: 'PATCH',
        //     body: args,
        //   }),
        //   invalidatesTags: ['settlement'],
        // }),

        // calculateSettlementStats: builder.query<any, GetSettlementStatsParams>({
        //   query: (args) => ({
        //     url: '/settlements/stats/calculate',
        //     params: args,
        //   }),
        //   providesTags: ['settlement'],
        // }),

        // deleteSettlements: builder.mutation<any, DeleteSettlementsPayload>({
        //   query: (args) => ({
        //     url: '/settlements/delete',
        //     method: 'DELETE',
        //     body: args,
        //   }),
        //   invalidatesTags: ['settlement'],
        // }),
    }),
});

export const {
    useInitializeSettlementPaymentsMutation,
    //   useSettlementsWebhookHandlerQuery,
    //   useGetSettlementsAdminQuery,
    useGetSingleSettlementQuery,
    useGetSettlementsForDriverQuery,
    //   useUpdateSettlementMutation,
    //   useCalculateSettlementStatsQuery,
    //   useDeleteSettlementsMutation,
} = settlementsApi;
