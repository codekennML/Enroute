

import { api } from "./apiSlice";

// Define the response type from the server (adjust based on your actual API response)
interface UploadResponse {
    message: string;
    uri?: string; // Adjust if your API returns something different
}

// Inject the new endpoint
const uploadApi = api.injectEndpoints({
    endpoints: (builder) => ({
        uploadSingleFile: builder.mutation<any, any>({
            query: ({ file, onUploadProgress }) => {

                console.log(file, onUploadProgress, typeof file, "IOIEJSNSBBD")
                return {
                    url: `upload`,
                    method: 'POST',
                    data: file,
                    formData: true,
                    onUploadProgress,
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'multipart/form-data'
                    },

                }
            },
            transformResponse: (response) => {
                console.log(response)
                return response
            },
            invalidatesTags: ['upload'], // Invalidate cache if needed
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useUploadSingleFileMutation,
} = uploadApi;







