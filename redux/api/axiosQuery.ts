import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError, AxiosHeaders } from 'axios'
import * as SecureStore from 'expo-secure-store'

const baseQueryAxiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
})

const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
        },
        unknown,
        unknown
    > =>
        async ({ url, method, data, params, headers }) => {
            try {
                // Add request interceptor before making the request
                baseQueryAxiosInstance.interceptors.request.use(async function (config) {
                    const accessToken = await SecureStore.getItemAsync('X_A_T');
                    const refreshToken = await SecureStore.getItemAsync('X_R_T');

                    // Add the headers to the request
                    if (config.headers) {
                        (config.headers as AxiosHeaders).set('x-a-t', accessToken ?? '');
                        (config.headers as AxiosHeaders).set('x-r-t', refreshToken ?? '');
                    }

                    return config;
                }, function (error) {
                    // Do something with request error
                    return Promise.reject(error);
                });

                // Add response interceptor
                baseQueryAxiosInstance.interceptors.response.use(async function (response) {
                    // You can handle responses here if needed
                    const { data } = response
                    const { tokens, ...rest } = data

                    if (tokens) {
                        await SecureStore.setItemAsync('x_a_t', `${tokens?.accessToken}`);
                        await SecureStore.setItemAsync('x_r_t', `${tokens?.refreshToken}`);
                    }

                    response.data = rest

                    return response;
                }, function (error) {
                    console.log("axiosBQError", error)
                    // Any status codes that falls outside the range of 2xx cause this function to trigger
                    // Do something with response error
                    return Promise.reject(error);
                });

                // Make the actual request
                const result = await baseQueryAxiosInstance({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                });

                return { data: result.data };
            } catch (axiosError) {
                const err = axiosError as AxiosError;
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        }

export default axiosBaseQuery;
