
import axios from 'axios'
import { api } from './apiSlice'
// import { MAPS_API_KEY } from '@env'
import { Location } from '@/types/types'
import { locations } from '@/components/constants/predictions'

// const MAPS_API_KEY = "AIzaSyB_iTzHfE1k6sThxZoB97JaUY-HY-jNk98"


export type AutoCompleteQuery = {
    input: string,
    location: { lat: number, lng: number },
    radius: number
    type: string
    component: string,
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

export const mapsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAutoCompleteData: builder.query({
            queryFn: async (args: Omit<AutoCompleteQuery, "radius" | "location"> & { service: string, role: number } | undefined) => {



                let response

                try {


                    if (args?.service === "courier"
                        // || args?.role === ROLES.DRIVER
                    ) {


                        response = {
                            predictions: [
                                {
                                    description: "Kensington Market, Toronto, ON, Canada",
                                    matched_substrings: [{ length: 3, offset: 0 }],
                                    place_id: "ChIJ1ePv9UE1K4gRZZEbC1O1Pss",
                                    reference: "ChIJ1ePv9UE1K4gRZZEbC1O1Pss",
                                    structured_formatting: {
                                        main_text: "Kensington Market",
                                        main_text_matched_substrings: [{ length: 3, offset: 0 }],
                                        secondary_text: "Toronto, ON, Canada"
                                    },
                                    terms: [
                                        { offset: 0, value: "Kensington Market" },
                                        { offset: 19, value: "Toronto" },
                                        { offset: 28, value: "ON" },
                                        { offset: 32, value: "Canada" }
                                    ],
                                    types: ["neighborhood", "political"]
                                },
                                {
                                    description: "Kenmore Square, Boston, MA, USA",
                                    matched_substrings: [{ length: 3, offset: 0 }],
                                    place_id: "ChIJfX7K1olw44kRVPZCHxzwkSc",
                                    reference: "ChIJfX7K1olw44kRVPZCHxzwkSc",
                                    structured_formatting: {
                                        main_text: "Kenmore Square",
                                        main_text_matched_substrings: [{ length: 3, offset: 0 }],
                                        secondary_text: "Boston, MA, USA"
                                    },
                                    terms: [
                                        { offset: 0, value: "Kenmore Square" },
                                        { offset: 15, value: "Boston" },
                                        { offset: 23, value: "MA" },
                                        { offset: 27, value: "USA" }
                                    ],
                                    types: ["neighborhood", "political"]
                                },
                                {
                                    description: "Kent Street, Sydney, NSW, Australia",
                                    matched_substrings: [{ length: 3, offset: 0 }],
                                    place_id: "ChIJVVVVVVVuEmsRbbNRNnbOV6k",
                                    reference: "ChIJVVVVVVVuEmsRbbNRNnbOV6k",
                                    structured_formatting: {
                                        main_text: "Kent Street",
                                        main_text_matched_substrings: [{ length: 3, offset: 0 }],
                                        secondary_text: "Sydney, NSW, Australia"
                                    },
                                    terms: [
                                        { offset: 0, value: "Kent Street" },
                                        { offset: 12, value: "Sydney" },
                                        { offset: 20, value: "NSW" },
                                        { offset: 25, value: "Australia" }
                                    ],
                                    types: ["route"]
                                },
                                {
                                    description: "Kensington Gardens, London, UK",
                                    matched_substrings: [{ length: 3, offset: 0 }],
                                    place_id: "ChIJQ1QPVl4FdkgRZZEbC1O1Pss",
                                    reference: "ChIJQ1QPVl4FdkgRZZEbC1O1Pss",
                                    structured_formatting: {
                                        main_text: "Kensington Gardens",
                                        main_text_matched_substrings: [{ length: 3, offset: 0 }],
                                        secondary_text: "London, UK"
                                    },
                                    terms: [
                                        { offset: 0, value: "Kensington Gardens" },
                                        { offset: 20, value: "London" },
                                        { offset: 27, value: "UK" }
                                    ],
                                    types: ["park", "point_of_interest", "establishment"]
                                },
                                {
                                    description: "Kennebunkport, ME, USA",
                                    matched_substrings: [{ length: 3, offset: 0 }],
                                    place_id: "ChIJ77vLKMqO4okRF6BfL1z3q48",
                                    reference: "ChIJ77vLKMqO4okRF6BfL1z3q48",
                                    structured_formatting: {
                                        main_text: "Kennebunkport",
                                        main_text_matched_substrings: [{ length: 3, offset: 0 }],
                                        secondary_text: "ME, USA"
                                    },
                                    terms: [
                                        { offset: 0, value: "Kennebunkport" },
                                        { offset: 15, value: "ME" },
                                        { offset: 19, value: "USA" }
                                    ],
                                    types: ["locality", "political"]
                                }
                            ], type: args?.type, status: "OK"
                        }

                        // let url = `/place/autocomplete/json?input=${args.input}&component=${args.component}&key=${MAPS_API_KEY}`

                        // if (args?.establishment) url = url += `&types=${args.establishment}`

                        //Make Google maps autocomplete call 



                    } else {
                        //Call our db for autocomplete of the state or town of the country


                        response = {
                            predictions: locations.slice(0, 2),
                            type: args?.type,
                            status: "OK"
                        }

                    }


                    // const results = {
                    //     predictions: response?.data?.predictions,
                    //     type: args.type,
                    //     status: response?.data?.status
                    // }

                    const results = {
                        predictions: response.predictions,
                        type: response.type,
                        status: response.status
                    }

                    return { data: JSON.stringify(results) }


                } catch (error) {

                    console.log(error)
                    return { error: "No bus stops matching this query was found" }

                }

            }

        }),

        getGeocodedLocation: builder.query({
            queryFn: async (args: Partial<Location> & { type: "destination" | "origin" } | null) => {

                try {

                    let response


                    if (args?.lat && args?.lng) {

                        // response = await mapsClient.get(`/geocode/json?latlng=${args.lat},${args.lng}&key=${MAPS_API_KEY}`)


                        response = [
                            { "address_components": [{ "long_name": "X9WJ+9P", "short_name": "X9WJ+9P", "types": ["plus_code"] }, { "long_name": "Subalo", "short_name": "Subalo", "types": ["locality", "political"] }, { "long_name": "Shinawu/Tunbuyan", "short_name": "Shinawu/Tunbuyan", "types": ["administrative_area_level_3", "political"] }, { "long_name": "Baruten", "short_name": "Baruten", "types": ["administrative_area_level_2", "political"] }, { "long_name": "Kwara", "short_name": "KW", "types": ["administrative_area_level_1", "political"] }, { "long_name": "Nigeria", "short_name": "NG", "types": ["country", "political"] }, { "long_name": "242103", "short_name": "242103", "types": ["postal_code"] }], "formatted_address": "X9WJ+9P Subalo, Nigeria", "geometry": { "bounds": { "northeast": { "lat": 8.996, "lng": 3.381875 }, "southwest": { "lat": 8.995875, "lng": 3.38175 } }, "location": { "lat": 8.9959457, "lng": 3.3818409 }, "location_type": "GEOMETRIC_CENTER", "viewport": { "northeast": { "lat": 8.997286480291502, "lng": 3.383161480291502 }, "southwest": { "lat": 8.994588519708499, "lng": 3.380463519708498 } } }, "place_id": "GhIJBC9EmOz9IUARoDMOmgIOC0A", "plus_code": { "compound_code": "X9WJ+9P Subalo, Nigeria", "global_code": "6FW5X9WJ+9P" }, "types": ["plus_code"] }
                        ]

                    }

                    if (args?.placeId) {
                        // response =  await mapsClient.get(`/geocode/json?place_id=${args.placeId}&key=${MAPS_API_KEY}`)
                        console.log("Ran PlaceId")

                        response = [
                            { "address_components": [{ "long_name": "Lucio", "short_name": "Lugbe", "types": ["plus_code"] }, { "long_name": "Lughe", "short_name": "Lughe", "types": ["locality", "political"] }, { "long_name": "Shinawu/Tunbuyan", "short_name": "Shinawu/Tunbuyan", "types": ["administrative_area_level_3", "political"] }, { "long_name": "Baruten", "short_name": "Baruten", "types": ["administrative_area_level_2", "political"] }, { "long_name": "Kwara", "short_name": "KW", "types": ["administrative_area_level_1", "political"] }, { "long_name": "Nigeria", "short_name": "NG", "types": ["country", "political"] }, { "long_name": "242103", "short_name": "242103", "types": ["postal_code"] }], "formatted_address": "Mile 12 Bus station, Nigeria", "geometry": { "bounds": { "northeast": { "lat": 8.996, "lng": 3.381875 }, "southwest": { "lat": 8.995875, "lng": 3.38175 } }, "location": { "lat": 8.9959457, "lng": 3.3818409 }, "location_type": "GEOMETRIC_CENTER", "viewport": { "northeast": { "lat": 8.997286480291502, "lng": 3.383161480291502 }, "southwest": { "lat": 8.994588519708499, "lng": 3.380463519708498 } } }, "place_id": "GhIJBC9EmOz9IUARoDMOmgIOC0A", "plus_code": { "compound_code": "X9WJ+9P Lughe, Nigeria", "global_code": "6FW5X9WJ+9P" }, "types": ["plus_code"] }
                        ]


                    }

                    // const returnData = JSON.stringify({ results: response?.data?.results, status: response?.data?.status, type: args.type })

                    console.log(args?.type, response)

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

export const { useGetAutoCompleteDataQuery, useGetGeocodedLocationQuery } = mapsApi