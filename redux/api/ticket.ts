import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface TicketPayload {
    tag: string;
    user: {
        avatar: string;
        email: string;
    };
    rideData?: {
        id: string;
        tripId: string;
        driverId: string;
    };
    subject: string;
    body: string;
}

export const ticketsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createTicket: builder.mutation<any, TicketPayload>({
            query: (args) => ({
                url: '/tickets',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['ticket'],
        }),

        // getTickets: builder.query<any, void>({
        //   query: () => ({
        //     url: '/tickets',
        //     method: 'GET',
        //   }),
        //   providesTags: ['Ticket'],
        // }),

        // getTicketById: builder.query<any, { id: string }>({
        //   query: (args) => ({
        //     url: `/tickets/${args.id}`,
        //     method: 'GET',
        //   }),
        //   providesTags: ['Ticket'],
        // }),

        // updateTicket: builder.mutation<any, { id: string; update: Partial<TicketPayload> }>({
        //   query: ({ id, update }) => ({
        //     url: `/tickets/${id}`,
        //     method: 'PATCH',
        //     body: update,
        //   }),
        //   invalidatesTags: ['Ticket'],
        // }),

        // deleteTicket: builder.mutation<any, { id: string }>({
        //   query: (args) => ({
        //     url: `/tickets/${args.id}`,
        //     method: 'DELETE',
        //   }),
        //   invalidatesTags: ['Ticket'],
        // }),
    }),
});

export const {
    useCreateTicketMutation,
    // useGetTicketsQuery,
    // useGetTicketByIdQuery,
    // useUpdateTicketMutation,
    // useDeleteTicketMutation,
} = ticketsApi;
