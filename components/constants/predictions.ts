import { Prediction } from "@/types/types"
import { Location } from "@/types/types";

export const predictions: Prediction[] = [{
    description: "Kennedy Station, Scarborough, ON, Canada",
    matched_substrings: [{ length: 3, offset: 0 }],
    place_id: "ChIJy9eHzzzO1IkRcIE8BT1z4Jc",
    reference: "ChIJy9eHzzzO1IkRcIE8BT1z4Jc",
    structured_formatting: {
        main_text: "Ikorodu",
        main_text_matched_substrings: [{ length: 3, offset: 0 }],
        secondary_text: "Lagos, Nigeria"
    },
    terms: [
        { offset: 0, value: "Kennedy Station" },
        { offset: 17, value: "Scarborough" },
        { offset: 30, value: "ON" },
        { offset: 34, value: "Canada" }
    ],
    types: ["bus_station", "point_of_interest", "establishment", "transit_station"]
},
{
    description: "Kennington Station (Stop KA), London, UK",
    matched_substrings: [{ length: 3, offset: 0 }],
    place_id: "ChIJQfokAJoEdkgRvY4Oi6JeP_o",
    reference: "ChIJQfokAJoEdkgRvY4Oi6JeP_o",
    structured_formatting: {
        main_text: "Eti-Osa",
        main_text_matched_substrings: [{ length: 3, offset: 0 }],
        secondary_text: "Lagos, Nigeria"
    },
    terms: [
        { offset: 0, value: "Kennington Station (Stop KA)" },
        { offset: 30, value: "London" },
        { offset: 38, value: "UK" }
    ],
    types: ["bus_station", "transit_station", "establishment", "point_of_interest"]
},
{
    description: "Kensal Rise Station (Stop KH), London, UK",
    matched_substrings: [{ length: 3, offset: 0 }],
    place_id: "ChIJF6rtwTgQdkgRUm5HeZ8gWo4",
    reference: "ChIJF6rtwTgQdkgRUm5HeZ8gWo4",
    structured_formatting: {
        main_text: "Ikeja",
        main_text_matched_substrings: [{ length: 3, offset: 0 }],
        secondary_text: "Lagos, Nigeria"
    },
    terms: [
        { offset: 0, value: "Kensal Rise Station (Stop KH)" },
        { offset: 31, value: "London" },
        { offset: 39, value: "UK" }
    ],
    types: ["bus_station", "point_of_interest", "establishment", "transit_station"]
}

    // {
    //     description: "Kenley Station, Kenley, UK",
    //     matched_substrings: [{ length: 3, offset: 0 }],
    //     place_id: "ChIJKZ-pot39dUgRhtqHkrR3sgQ",
    //     reference: "ChIJKZ-pot39dUgRhtqHkrR3sgQ",
    //     structured_formatting: {
    //         main_text: "Kenley Station",
    //         main_text_matched_substrings: [{ length: 3, offset: 0 }],
    //         secondary_text: "Kenley, UK"
    //     },
    //     terms: [
    //         { offset: 0, value: "Kenley Station" },
    //         { offset: 16, value: "Kenley" },
    //         { offset: 24, value: "UK" }
    //     ],
    //     types: ["bus_station", "point_of_interest", "establishment", "transit_station"]
    // }
]

export const locations: Location[] = [
    {
        placeId: "ChIJQA7mnpNawokRE3Yh9wZLq2o",
        name: "New York, NY, USA",
        town: "New York",
        state: "New York",
        country: "USA",
        coordinates: [40.712776, -74.005974]
    },
    {
        placeId: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
        name: "Los Angeles, CA, USA",
        town: "Los Angeles",
        state: "California",
        country: "USA",
        coordinates: [34.052235, -118.243683]
    },
    {
        placeId: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
        name: "London, UK",
        town: "London",
        state: "England",
        country: "UK",
        coordinates: [51.507351, -0.127758]
    },
    {
        placeId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
        name: "Paris, France",
        town: "Paris",
        state: "Île-de-France",
        country: "France",
        coordinates: [48.856613, 2.352222]
    },
    {
        placeId: "ChIJ51cu8IcbXWARiRtXIothAS4",
        name: "Tokyo, Japan",
        town: "Tokyo",
        state: "Tokyo",
        country: "Japan",
        coordinates: [35.689487, 139.691711]
    },
    {
        placeId: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
        name: "Sydney, Australia",
        town: "Sydney",
        state: "New South Wales",
        country: "Australia",
        coordinates: [-33.868820, 151.209290]
    },
    {
        placeId: "ChIJAVkDPzdOqEcRcDteW0YgIQQ",
        name: "Berlin, Germany",
        town: "Berlin",
        state: "Berlin",
        country: "Germany",
        coordinates: [52.520008, 13.404954]
    },
    {
        placeId: "ChIJybDUc_xKtUYRTM9XV8zWRD0",
        name: "Moscow, Russia",
        town: "Moscow",
        state: "Moscow",
        country: "Russia",
        coordinates: [55.755825, 37.617298]
    },
    {
        placeId: "ChIJLbZ-NFv9DDkRzk0gTkm3wlI",
        name: "New Delhi, India",
        town: "New Delhi",
        state: "Delhi",
        country: "India",
        coordinates: [28.613939, 77.209021]
    },
    {
        placeId: "ChIJ1QHgVu9ZzpQRgqHcn9zz28M",
        name: "São Paulo, Brazil",
        town: "São Paulo",
        state: "São Paulo",
        country: "Brazil",
        coordinates: [-23.550520, -46.633308]
    }
];


