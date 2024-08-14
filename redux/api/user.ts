
import { UserInfo, UserUpdateData } from "@/types/types";
import { api } from "./apiSlice";




const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserBasicInfo: builder.query<Partial<UserInfo>, string>({
            query: (_id) => ({
                url: `/users/:${_id}`,

            }),
            providesTags: ['user'],
        }),

        updateUser: builder.mutation<Partial<UserUpdateData>, Partial<UserUpdateData>>({
            query: (args) => ({
                url: `users/update`,
                method: "PATCH",
                body: {
                    ...args
                }
            }),
            invalidatesTags: ["user"]
        })

    })
})


export const { useGetUserBasicInfoQuery, useUpdateUserMutation } = userApi