import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface RatingPayload {
    userId: string;
    raterId: string;
    rideId: string;
    rating: number;
}

interface GetRatingsParams {
    ratingId?: string;
    cursor?: string;
    sort?: string;
    dateFrom?: Date;
    dateTo?: Date;
}

interface GetRatingByIdParams {
    id: string;
}

interface UpdateRatingPayload extends Partial<RatingPayload> {
    ratingId?: string;
}

interface DeleteRatingsPayload {
    ratingIds: string[];
}

export const ratingsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createRating: builder.mutation<any, RatingPayload>({
            query: (args) => ({
                url: '/rating/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['ratings'],
        }),

        getRatings: builder.query<any, GetRatingsParams>({
            query: (args) => ({
                url: '/rating',
                params: args,
            }),
            providesTags: ['ratings'],
        }),

        getRatingById: builder.query<any, GetRatingByIdParams>({
            query: (args) => ({
                url: `/rating/${args.id}`,
                method: 'GET',
            }),
            providesTags: ['ratings'],
        }),

        updateRating: builder.mutation<any, UpdateRatingPayload>({
            query: (args) => ({
                url: '/rating/update',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['ratings'],
        }),

        deleteRatings: builder.mutation<any, DeleteRatingsPayload>({
            query: (args) => ({
                url: '/rating/delete',
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: ['ratings'],
        }),
    }),
});

export const {
    useCreateRatingMutation,
    useGetRatingsQuery,
    useGetRatingByIdQuery,
    useUpdateRatingMutation,
    useDeleteRatingsMutation,
} = ratingsApi;
