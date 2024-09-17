
import axios from 'axios'
import { api } from './apiSlice'
// import { MAPS_API_KEY } from '@env'
import { Location } from '@/types/types'
import { locations } from '@/components/constants/predictions'
import { store } from '../store'
import { busStationApi } from './busStation'
import { statesApi } from './states'
import { ROLES } from '@/lib/config/enum'
import { townsApi } from './towns'

const MAPS_API_KEY = process.env.EXPO_PUBLIC_MAPS_API_KEY
const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN



export type AutoCompleteQuery = {
    input: string,
    location: { lat: number, lng: number },
    radius: number
    type: string
    component?: string,
    establishment?: string
    country?: string
} | undefined

const mapsClient = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
    headers: {
        'Content-Type': 'application/json'

    },
    withCredentials: true
})

const handleGoogleMapsCalls = async (url: string, type: string) => {
    console.log(url)
    const response = await mapsClient.get(url)

    if (response?.status === 200) {
        const result = { predictions: JSON.stringify(response?.data?.predictions), type, searchType: "google" }
        return { data: result }

    } else {
        return {
            error: response.statusText || "Failed to fetch places."
        }
    }

}


export const mapsApi = api.injectEndpoints({
    endpoints: (builder) => ({

        getAutoCompleteData: builder.query({
            queryFn: async (args, api, extraOptions, baseQuery) => {
                try {

                    let response;

                    // Google Maps URL
                    const url = `/place/autocomplete/json?input=${args.input}&component=${args.component}&key=${MAPS_API_KEY}`;

                    // Determine which service to call
                    if (args?.type === "origin" || (args?.service === "ride" && store.getState().search?.charter)) {
                        //Call google maps to get user initial location if its different from what we have, also for others to book for friends 
                        response = await handleGoogleMapsCalls(url, args?.type);
                        return response

                    } else if (args?.service === "ride") {
                        // Call the backend to autocomplete bus stops
                        const busResponse = await api.dispatch(busStationApi.endpoints.autoCompleteBusStations.initiate(args.input));
                        if (busResponse?.data) {
                            response = { data: { predictions: busResponse.data, searchType: "stations" } };

                            return response

                        } else {
                            return { error: busResponse.error || "Failed to fetch bus stops." };
                        }
                    } else if (args?.service === "travel") {
                        // Autocomplete states
                        const stateResponse = await api.dispatch(townsApi.endpoints.autoComplete.initiate({
                            townName: args.input,
                        }));
                        if (stateResponse?.data) {
                            response = { data: { predictions: stateResponse.data, searchType: "towns" }, };
                        } else {
                            return { error: stateResponse.error || "Failed to fetch states." };
                        }
                    } else if (args?.service === "courier" || store.getState().user?.roles === ROLES.DRIVER) {
                        response = await handleGoogleMapsCalls(url, args?.type);
                        return response
                    } else {
                        return { data: JSON.stringify([]), searchType: null }; // Return an empty array if no condition is met
                    }

                    // Return the response properly
                    return { data: response?.data };

                } catch (error) {
                    console.log(error, 'ERROROOORORO');
                    return { error: "An error occurred while fetching autocomplete data." };
                }
            }
        }),

        getGeocodedLocation: builder.query({
            queryFn: async (args: Partial<Location> & { type: "destination" | "origin", isManual: boolean } | null) => {

                try {

                    let response

                    if (args?.coordinates && !args?.isManual) {

                        const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${args.coordinates[0]}&latitude=${args.coordinates[1]}&access_token=${MAPBOX_TOKEN}`


                        response = await axios.get(url)


                    }

                    if (args?.placeId) {
                        const result = await mapsClient.get(`/geocode/json?place_id=${args.placeId}&key=${MAPS_API_KEY}`)

                        response = result?.data

                    }

                    if (args?.coordinates && args?.isManual) {

                        const geocoder = await mapsClient.get(`/geocode/json?latlng=${args.coordinates[1]},${args.coordinates[0]}&key=${MAPS_API_KEY}`)

                        response = geocoder?.data
                    }

                    // const returnData = JSON.stringify({ results: response?.data?.results, status: response?.data?.status, type: args.type })

                    const returnData = JSON.stringify({
                        results: response, status: args ? "OK" : null, type: args ? args.type : null
                    })


                    return { data: returnData }

                } catch (error) {

                    console.log(error)
                    return { error: "No location matching this query was found" }
                }

            }
        })
    }),
})

export const {
    useLazyGetAutoCompleteDataQuery,
    useLazyGetGeocodedLocationQuery,
    useGetAutoCompleteDataQuery, useGetGeocodedLocationQuery } = mapsApi