

import { api } from './apiSlice'; // Adjust the import path as necessary

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({

        verifyExistingMobile: builder.query<any, { mobile: number; countryCode: number }>({
            query: (args) => ({
                url: '/auth/existingMobile',
                method: 'GET',
                body: args,
            }),
            providesTags: ["auth"],
        }),

        signInMobile: builder.mutation<any, { mobile: number; countryCode: number }>({
            query: (args) => ({
                url: '/auth/mobile',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        signInEmail: builder.mutation<any, { email: string }>({
            query: (args) => ({
                url: '/auth/email',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        verifyUserEmail: builder.mutation<any, { otpId: string; otp: number }>({
            query: (args) => ({
                url: '/auth/email/verify',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        checkDuplicateAccountOfAnotherRole: builder.mutation<any, { mobile?: number; countryCode?: number; user: string }>({
            query: (args) => ({
                url: '/auth/verify_duplicate/account_roles',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        handleDuplicateRolesAccount: builder.mutation<any, {
            user: string;
            isNonMobileSignup: boolean;
            selectedAccount?: { id?: string; firstName?: string };
            accountToArchive: { id: string; firstName?: string };
            deviceId: string;
            deviceOS: string;
            deviceBrowser: string;
            deviceIP: string;
        }>({
            query: (args) => ({
                url: '/auth/authenticate_duplicate',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        verifyAccountViaMobile: builder.mutation<any, {
            otpId: string;
            otp: number;
            isNonMobileSignup: boolean;
            deviceId: string;
            deviceOS: string;
            deviceBrowser: string;
            deviceIP: string;
        }>({
            query: (args) => ({
                url: '/auth/authenticate_with_mobile',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        signInGoogle: builder.mutation<any, { id: string; token: string; email: string }>({
            query: (args) => ({
                url: '/auth/login/google',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        signInFacebook: builder.mutation<any, void>({
            query: () => ({
                url: '/auth/login/facebook',
                method: 'POST',
            }),
            invalidatesTags: ["auth"],
        }),

        handleUserCanUpdateLoginData: builder.mutation<any, {
            mobile?: number;
            countryCode?: number;
            email?: string;
            isVet: boolean;
        }>({
            query: (args) => ({
                url: '/auth/verify_duplicate_auth_data',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        changeUserEmailWithinAccount: builder.mutation<any, { otpId: string; otp: number }>({
            query: (args) => ({
                url: '/auth/update_user/email',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        changeUserMobileWithinAccount: builder.mutation<any, { otpId: string; otp: number }>({
            query: (args) => ({
                url: '/auth/update_user/mobile',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        logout: builder.mutation<any, { user: string }>({
            query: (args) => ({
                url: '/auth/logout',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ["auth"],
        }),

        revokeTokens: builder.mutation<any, void>({
            query: () => ({
                url: '/auth/revoke/tokens',
                method: 'POST',
            }),
            invalidatesTags: ["auth"],
        }),
    }),
});

export const {

    useSignInMobileMutation,
    useSignInEmailMutation,
    useLazyVerifyExistingMobileQuery,
    useVerifyUserEmailMutation,
    useCheckDuplicateAccountOfAnotherRoleMutation,
    useHandleDuplicateRolesAccountMutation,
    useVerifyAccountViaMobileMutation,
    useSignInGoogleMutation,
    useSignInFacebookMutation,
    useHandleUserCanUpdateLoginDataMutation,
    useChangeUserEmailWithinAccountMutation,
    useChangeUserMobileWithinAccountMutation,
    useLogoutMutation,
    useRevokeTokensMutation,
} = authApi;
