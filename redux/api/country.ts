import { api } from './apiSlice';


// Define interfaces for the request payloads and query parameters
interface Option {
    type: 'text' | 'image';
    format: string;
}

interface CountryDocs {
    name: string;
    options: Option[];
}

interface CountryPayload {
    name: string;
    code: string;
    boundary: number[];
    monthlySubscription: number;
    riderCommission: number;
    driverPercentage: number;
    paymentProcessorbillingPercentage: number;
    currency: string;
    paymentProcessorbillingExtraAmount: number;
    requiredDriverDocs: CountryDocs;
    requiredRiderDocs: CountryDocs;
}

interface GetCountriesParams {
    countryId?: string;
    cursor?: string;
    sort?: string;
    name?: string;
}

interface GetCountryByIdParams {
    id: string;
}

// interface UpdateCountryPayload extends Partial<CountryPayload> {
//   countryId?: string;
// }

// interface DeleteCountriesPayload {
//   countryIds: string[];
// }

export const countryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createCountry: builder.mutation<any, CountryPayload>({
            query: (args) => ({
                url: 'country/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["country"],
        }),

        getCountries: builder.query<any, GetCountriesParams | undefined>({
            query: (args) => {
                console.log(args, "RTr")
                return ({
                    url: 'country',
                    params: args,
                })


            },
            transformResponse: (response) => {
                console.log(response, response.data)
                return response.data
            },
            providesTags: ["country"],
        }),

        getCountryById: builder.query<any, GetCountryByIdParams>({
            query: (args) => ({
                url: `country/${args.id}`,
                method: 'GET',
            }),
            providesTags: ["country"],
        }),

        // updateCountry: builder.mutation<any, UpdateCountryPayload>({
        //   query: (args) => ({
        //     url: '/countries/update',
        //     method: 'PATCH',
        //     body: args,
        //   }),
        //   invalidatesTags: ["country"],
        // }),

        // deleteCountries: builder.mutation<any, DeleteCountriesPayload>({
        //   query: (args) => ({
        //     url: '/countries/delete',
        //     method: 'DELETE',
        //     body: args,
        //   }),
        //   invalidatesTags: ["country"],
        // }),
    }),
});

export const {
    useCreateCountryMutation,
    useGetCountriesQuery,
    useLazyGetCountriesQuery,
    useGetCountryByIdQuery,
    //   useUpdateCountryMutation,
    //   useDeleteCountriesMutation,
} = countryApi;
