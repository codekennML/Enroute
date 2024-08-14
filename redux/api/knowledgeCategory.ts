import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface KnowledgeBaseCategory {
    name: string;
    isParent: boolean;
    parentId?: string;
}

interface GetKnowledgeBaseCategoryParams {
    categoryId?: string;
    parentId?: string;
    subCategoryId?: string;
    isParent?: boolean;
    cursor?: string;
    sort?: string;
}

interface GetKnowledgeBaseCategoryByIdParams {
    id: string;
}

interface UpdateKnowledgeBaseCategoryPayload extends Partial<KnowledgeBaseCategory> {
    knowledgeBaseCategoryId?: string;
}

interface DeleteKnowledgeBaseCategoriesPayload {
    knowledgeBaseIds: string[];
}

export const knowledgeBaseCategoryApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getKnowledgeBaseCategories: builder.query<any, GetKnowledgeBaseCategoryParams>({
            query: (args) => ({
                url: '/knowledge-base-categories',
                params: args,
            }),
            providesTags: ['knowledgeBaseCategory'],
        }),

        getKnowledgeBaseCategoryById: builder.query<any, GetKnowledgeBaseCategoryByIdParams>({
            query: (args) => ({
                url: `/knowledge-base-categories/${args.id}`,
                method: 'GET',
            }),
            providesTags: ['knowledgeBaseCategory'],
        }),

        createKnowledgeBaseCategory: builder.mutation<any, KnowledgeBaseCategory>({
            query: (args) => ({
                url: '/knowledge-base-categories/create',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['knowledgeBaseCategory'],
        }),

        updateKnowledgeBaseCategory: builder.mutation<any, UpdateKnowledgeBaseCategoryPayload>({
            query: (args) => ({
                url: '/knowledge-base-categories/update',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['knowledgeBaseCategory'],
        }),

        deleteKnowledgeBaseCategory: builder.mutation<any, DeleteKnowledgeBaseCategoriesPayload>({
            query: (args) => ({
                url: '/knowledge-base-categories/delete',
                method: 'DELETE',
                body: args,
            }),
            invalidatesTags: ['knowledgeBaseCategory'],
        }),
    }),
});

export const {
    useGetKnowledgeBaseCategoriesQuery,
    useGetKnowledgeBaseCategoryByIdQuery,
    useCreateKnowledgeBaseCategoryMutation,
    useUpdateKnowledgeBaseCategoryMutation,
    useDeleteKnowledgeBaseCategoryMutation,
} = knowledgeBaseCategoryApi;
