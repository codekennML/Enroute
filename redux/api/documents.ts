import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface DocumentPayload {
    userId: string;
    vehicleId?: string;
    name: string;
    imageUrl: string[];
    isVerified?: boolean;
    verificationResponse?: Record<string, unknown>;
    issued?: Date;
    expiry?: Date;
    isRejected?: boolean;
    archived?: boolean;
    fieldData?: Record<string, string>;
    rejectionFeedback?: string;
    status?: 'pending' | 'assessed' | 'none';
    approvedBy?: string;
    country: string;
}

interface FindDocumentsParams {
    isVerified?: boolean;
    status?: 'pending' | 'assessed';
    cursor?: string;
    name?: string;
    user?: string;
    sort?: string;
}

interface GetPendingUserDocumentsParams {
    user: string;
    cursor: string;
}

interface GetDocumentByIdParams {
    id: string;
}

interface MarkDocumentApprovedParams {
    documentId: string;
}

interface MarkDocumentRejectedParams {
    documentId: string;
    adminId: string;
    rejectionFeedback: string;
}

interface GetDocumentStatsParams {
    userId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    status?: 'pending' | 'assessed';
    country?: string;
}

const documentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createDocument: builder.mutation<void, DocumentPayload>({
            query: (payload) => ({
                url: '/documents/create',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ["document"],
        }),

        findDocuments: builder.query<void, FindDocumentsParams>({
            query: (params) => ({
                url: '/documents',
                method: 'GET',
                params,
            }),
            providesTags: ["document"],
        }),

        getPendingUserDocuments: builder.query<void, GetPendingUserDocumentsParams>({
            query: (params) => ({
                url: '/documents/user/pending',
                method: 'GET',
                params,
            }),
            providesTags: ["document"],
        }),

        getDocumentById: builder.query<void, GetDocumentByIdParams>({
            query: ({ id }) => ({
                url: `/documents/${id}`,
                method: 'GET',
            }),
            providesTags: ["document"],
        }),

        markDocumentApproved: builder.mutation<void, MarkDocumentApprovedParams>({
            query: ({ documentId }) => ({
                url: '/documents/approve',
                method: 'PATCH',
                body: { documentId },
            }),
            invalidatesTags: ["document"],
        }),

        markDocumentRejected: builder.mutation<void, MarkDocumentRejectedParams>({
            query: (payload) => ({
                url: '/documents/reject',
                method: 'PATCH',
                body: payload,
            }),
            invalidatesTags: ["document"],
        }),

        getDocumentStats: builder.query<void, GetDocumentStatsParams>({
            query: (params) => ({
                url: '/documents/stats/calculate',
                method: 'GET',
                params,
            }),
            providesTags: ["document"],
        }),
    }),
});

export const {
    useCreateDocumentMutation,
    useFindDocumentsQuery,
    useGetPendingUserDocumentsQuery,
    useGetDocumentByIdQuery,
    useMarkDocumentApprovedMutation,
    useMarkDocumentRejectedMutation,
    useGetDocumentStatsQuery,
} = documentsApi;
