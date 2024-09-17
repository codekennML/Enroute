import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosQuery";
import { Platform } from "react-native"
// import { BACKEND_URL } from "@env";

// console.log(BACKEND_URL)
export const BACKEND_URL = Platform.OS === "ios" ? "http://127.0.0.1:350/api/" : "http://10.0.2.2:3500/api/"

export const api = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({ baseUrl: BACKEND_URL }),
    tagTypes: ["search", "user", "trip", "ride", "document", "rideRequest", "settlement", "auth", "busstation", "country", "state", "town", "knowledgeBase", "knowledgeBaseCategory", "chat", "otp", "packageSchedule", "packageScheduleRequest", "ratings", "sos", "ticket", "tripSchedule", "vehicle", "upload"],
    endpoints: () => ({}),
});