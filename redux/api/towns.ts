import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface TownPayload {
    name: string;
    state: string;
    country: string;
    requiredDriverDocs: {
        name: string;
        options: {
            type: 'text' | 'image';
            format: string;
        }[];
    };
    requiredRiderDocs: {
        name: string;
        options: {
            type: 'text' | 'image';
            format: string;
        }[];
    };
}

interface GetTownsParams {
    countryId?: string;
    cursor?: string;
    sort?: string;
    state?: string;
    country?: string;
}

interface GetTownByIdParams {
    id: string;
}

interface UpdateTownPayload extends Partial<TownPayload> {
    townId: string;
}

interface DeleteTownsPayload {
    townIds: string[];
}

export const townsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // createTown: builder.mutation<any, TownPayload>({
        //   query: (args) => ({
        //     url: '/towns/create',
        //     method: 'POST',
        //     body: args,
        //   }),
        //   invalidatesTags: ["town"],
        // }),

        getTowns: builder.query<any, GetTownsParams>({
            query: (args) => ({
                url: '/towns',
                params: args,
            }),
            providesTags: ["town"],
        }),

        getTownById: builder.query<any, GetTownByIdParams>({
            query: (args) => ({
                url: `/towns/${args.id}`,
                method: 'GET',
            }),
            providesTags: ["town"],
        }),

        // updateTown: builder.mutation<any, UpdateTownPayload>({
        //   query: (args) => ({
        //     url: `/towns/update`,
        //     method: 'PATCH',
        //     body: args,
        //   }),
        //   invalidatesTags: ["town"],
        // }),

        // deleteTowns: builder.mutation<any, DeleteTownsPayload>({
        //   query: (args) => ({
        //     url: '/towns/delete',
        //     method: 'DELETE',
        //     body: args,
        //   }),
        //   invalidatesTags: ["town"],
        // }),
    }),
});

export const {
    //   useCreateTownMutation,
    useGetTownsQuery,
    useGetTownByIdQuery,
    //   useUpdateTownMutation,
    //   useDeleteTownsMutation,
} = townsApi;
