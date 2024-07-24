import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosQuery";
// import { BACKEND_URL } from "@env";

// console.log(BACKEND_URL)
const BACKEND_URL = process.env.BACKEND_URL

export const api = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: BACKEND_URL }),
    tagTypes: ["search", "user", "trips", "ride", "document", "rideRequest", "package", "settlement",],
    endpoints: () => ({}),
});