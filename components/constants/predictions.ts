import { Prediction } from "@/types/types"

export const predictions: Prediction[] = [{
    description: "Kennedy Station, Scarborough, ON, Canada",
    matched_substrings: [{ length: 3, offset: 0 }],
    place_id: "ChIJy9eHzzzO1IkRcIE8BT1z4Jc",
    reference: "ChIJy9eHzzzO1IkRcIE8BT1z4Jc",
    structured_formatting: {
        main_text: "Kennedy Station",
        main_text_matched_substrings: [{ length: 3, offset: 0 }],
        secondary_text: "Scarborough, ON, Canada"
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
        main_text: "Kennington Station (Stop KA)",
        main_text_matched_substrings: [{ length: 3, offset: 0 }],
        secondary_text: "London, UK"
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
        main_text: "Kensal Rise Station (Stop KH)",
        main_text_matched_substrings: [{ length: 3, offset: 0 }],
        secondary_text: "London, UK"
    },
    terms: [
        { offset: 0, value: "Kensal Rise Station (Stop KH)" },
        { offset: 31, value: "London" },
        { offset: 39, value: "UK" }
    ],
    types: ["bus_station", "point_of_interest", "establishment", "transit_station"]
},
{
    description: "Kengeri Police Station, Fort Kengeri, Kengeri, Bengaluru, Karnataka",
    matched_substrings: [{ length: 3, offset: 0 }],
    place_id: "ChIJQUoq-CU_rjsR30zS8psNPIQ",
    reference: "ChIJQUoq-CU_rjsR30zS8psNPIQ",
    structured_formatting: {
        main_text: "Kengeri Police Station",
        main_text_matched_substrings: [{ length: 3, offset: 0 }],
        secondary_text: "Fort Kengeri, Kengeri, Bengaluru, Karnataka"
    },
    terms: [
        { offset: 0, value: "Kengeri Police Station" },
        { offset: 24, value: "Fort Kengeri" },
        { offset: 38, value: "Kengeri" },
        { offset: 47, value: "Bengaluru" },
        { offset: 58, value: "Karnataka" }
    ],
    types: ["bus_station", "transit_station", "establishment", "point_of_interest"]
},
{
    description: "Kenley Station, Kenley, UK",
    matched_substrings: [{ length: 3, offset: 0 }],
    place_id: "ChIJKZ-pot39dUgRhtqHkrR3sgQ",
    reference: "ChIJKZ-pot39dUgRhtqHkrR3sgQ",
    structured_formatting: {
        main_text: "Kenley Station",
        main_text_matched_substrings: [{ length: 3, offset: 0 }],
        secondary_text: "Kenley, UK"
    },
    terms: [
        { offset: 0, value: "Kenley Station" },
        { offset: 16, value: "Kenley" },
        { offset: 24, value: "UK" }
    ],
    types: ["bus_station", "point_of_interest", "establishment", "transit_station"]
}
]