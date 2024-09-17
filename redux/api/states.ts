import { GetStateByIdParams } from './states';
// types/stateTypes.ts

import { api } from "./apiSlice";

export interface StateDocOption {
    type: 'text' | 'image';
    format: string;
}

export interface StateDocs {
    name: string;
    options: StateDocOption[];
}

export interface State {
    name: string;
    country: string;
    requiredDriverDocs: StateDocs;
    requiredRiderDocs: StateDocs;
}

export interface GetStatesQueryParams {
    country?: string;
    cursor?: string;
    sort?: string;
    name?: string;
}

export interface GetStateByIdParams {
    id: string;
}

export type GetStateDocs = GetStateByIdParams & { serviceType: string, userRole: number }

export interface UpdateStatePayload extends Partial<State> {
    stateId: string;
}

export interface AutoCompleteState {
    countryId: string,
    stateName: string
}



export const statesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createState: builder.mutation<any, State>({
            query: (args) => ({
                url: 'state/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['state'],
        }),

        getStates: builder.query<any, GetStatesQueryParams>({
            query: (params) => ({
                url: 'state',
                method: 'GET',
                params,
            }),
            transformResponse: (response) => {
                const { data } = response.data
                return data
            },
            providesTags: ['state'],
        }),

        autoComplete: builder.query<any, AutoCompleteState>({
            query: (args) => ({
                url: `state/autocomplete/?countryId=${args.countryId}&stateName=${args.stateName}`,
                method: 'GET',
            }),
            providesTags: ['state'],
        }),


        getStateById: builder.query<any, GetStateByIdParams>({
            query: ({ id }) => ({
                url: `state/${id}`,
                method: 'GET',
            }),
            providesTags: ['state'],
        }),

        getStateRequiredDocs: builder.query<any, GetStateDocs>({
            query: ({ id, serviceType, userRole }) => ({
                url: `state/getStateRequiredDocs`,
                method: 'GET',
                params: {
                    id,
                    serviceType,
                    userRole
                }
            }),
            keepUnusedDataFor: 300000,
            providesTags: ['state'],
        }),

        updateState: builder.mutation<any, UpdateStatePayload>({
            query: (args) => ({
                url: 'state/update',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['state'],
        }),

        // deleteStates: builder.mutation<any, DeleteStatesPayload>({
        //     query: (args) => ({
        //         url: 'states/delete',
        //         method: 'DELETE',
        //         body: args,
        //     }),
        //     invalidatesTags: ['state'],
        // }),
    }),
});

export const {
    useCreateStateMutation,
    useGetStatesQuery,
    useGetStateByIdQuery,
    useUpdateStateMutation,
    useGetStateRequiredDocsQuery,
    useLazyGetStateRequiredDocsQuery
    // useDeleteStatesMutation,
} = statesApi;