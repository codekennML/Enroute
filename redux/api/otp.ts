import { api } from './apiSlice'; // Adjust the import path as necessary

// Define interfaces for the request payloads and query parameters
interface CreateOTPRequest {
    type: 'SMS' | 'WhatsApp' | 'Email';
    countryCode?: number;
    mobile?: number;
    email?: string;
    user?: string;
    next?: string;
}

interface UpdateOTPRequest {
    otpId: string;
    type: 'SMS' | 'WhatsApp' | 'Email';
}

interface VerifyOTPRequest {
    otpId: string;
    otp: number;
}

export const otpApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createOTP: builder.mutation<any, CreateOTPRequest>({
            query: (args) => ({
                url: '/otp/create_otp',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["otp"],
        }),

        verifyOTP: builder.mutation<any, VerifyOTPRequest>({
            query: (args) => ({
                url: '/otp/verify_otp',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["otp"],
        }),

        updateOTP: builder.mutation<any, UpdateOTPRequest>({
            query: (args) => ({
                url: '/otp/update_otp',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["otp"],
        }),
    }),
});

export const {
    useCreateOTPMutation,
    useVerifyOTPMutation,
    useUpdateOTPMutation,
} = otpApi;
