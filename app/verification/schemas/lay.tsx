// { "name": "vehicle_type", "displayName": "Vehicle type", "options": { "type": "select", "options": ["Bike", "Car", "Bus", "Mini van", "Large van", "Mini truck", "Large truck"], "schemaType": "string", "required": true } },

"truck" : [
    { "name": "truck_ownership_cert", "displayName": "Ownership Certificate", "options": { "type": "image", "schemaType": "string", "required": true } },
    { "name": "truck_name", "displayName": "Name of truck", "options": { "type": "text", "schemaType": "string", "required": true } },
    { "name": "truck_model", "displayName": "Truck model", "options": { "type": "text", "schemaType": "string", "required": true } },
    { "name": "truck_year", "displayName": "Truck Manufacture Year", "options": { "type": "text", "schemaType": "number", "required": "true" } },
    { "name": "truck_license_plate", "displayName": "License plate no.", "options": { "type": "text", "schemaType": "string", "required": true } },
    { "name": "truck_carriage_length", "displayName": "Truck carriage length -  Length of Carry Area", "info": "- Length of carrying area", "options": { "type": "text", "schemaType": "number", "required": true } },
    { "name": "truck_carriage_width", "displayName": "Truck carriage width ", "info": "Width of carrying area", "options": { "type": "text", "schemaType": "number", "required": true } },
    { "name": "truck_carriage_height", "displayName": "Truck carriage width ", "info": "Height of carrying area", "options": { "type": "text", "schemaType": "number", "required": true } },
    , { "name": "truck_color", "displayName": "Truck color", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "truck_exterior_front", "displayName": "Truck Image  - Exterior Front", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "truck_exterior_back", "displayName": "Truck Image - Exterior Back", "info": "Ensure license plate is showing in this image and well-lit", "options": { "type": "image", "schemaType": "string", "required": true } },
    { "name": "truck_exterior_left", "displayName": "Truck Image - Exterior Left", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "truck_exterior_right", "displayName": "Truck Image -  Exterior Right ", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "truck_interior_front", "displayName": "Truck Image -  Interior Front", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "inspection_provider", "displayName": "Inspection Provider", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "inspection_id", "displayName": "Inspection ID Number", "options": { "type": "text", "schemaType": "string" } }, { "name": "inspection_issued_at", "displayName": "Inspection Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "inspection_expires_at", "displayName": "Inspection Expiry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "inspection_image", "displayName": "Inspection Report Image", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "insurance_provider", "displayName": "Insurance Provider", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "insurance_id", "displayName": "Insurance ID", "options": { "type": " text", "schemaType": "string", "required": true } }, { "name": "insurance_issued_at", "displayName": "Insurance Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "insurance_expires_at", "displayName": "Insurance Expiry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "insurance_image", "displayName": "Insurance Image", "options": { "type": "date", "schemaType": "string", "required": true } }],


// const user =

{
    "_id": { "$oid": "66cf22008fa6aa0746ea3f63" },
    "code": { "$numberInt": "234" },
    "monthlySubscription": { "$numberInt": "0" },
    "paymentProcessorbillingPercentage": { "$numberInt": "0" },
    "paymentProcessorbillingExtraAmount": { "$numberInt": "0" },
    "currency": "NGN",
    "riderCommission": { "$numberInt": "150" },
    "requiredDriverDocs": [
        {
            "name": "firstname",
            "displayName": "First Name",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "lastname",
            "displayName": "Last Name",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "avatar",
            "displayName": "Last Name",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "gender",
            "displayName": "gender",
            "options": {
                "type": "select",
                "options": ["Male", "Female"],
                "schemaType": "string",
                "required": true
            }
        },
        {
            "name": "apartment",
            "displayName": "Apt./Suite No.",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "street",
            "displayName": "Street Name",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "address",
            "displayName": "Home address",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },


        {
            "name": "id_type", "displayName": "ID document",
            "options": { "type": "select", "options": ["National ID Card", "International Passport"], "schemaType": "string", "required": true }
        }, { "name": "id_number", "displayName": "Identification Number", "options": { "type": "number", "schemaType": "string", "required": true } }, { "name": "id_issued_at", "displayName": "Issue date", "options": { "type": "date", "schemaType": "string", "required": true } },
        { "name": "id_expires_at", "displayName": "Expiry date", "options": { "type": "date", "schemaType": "string", "required": false } }, { "name": "id_image_back", "displayName": "Identification Image - Back", "options": { "type": "image", "schemaType": "string", "required": true } },
        { "name": "id_image_front", "displayName": "Identification Image - Front", "options": { "type": "image", "schemaType": "string", "required": true } },

        {
            "name": "driver_license",
            "displayName": "Driver License",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },


        {
            "name": "license_issued_at",
            "displayName": "License Issued Date",
            "options": {
                "type": "date",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "license_expires_at",
            "displayName": "License Expiry Date",
            "options": {
                "type": "date",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "license_front",
            "displayName": "License Image - Front",
            "options": {
                "type": "date",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "license_front",
            "displayName": "License Image - Back",
            "options": {
                "type": "date",
                "schemaType": "string",
                "required": true
            }
        }
    ],

    "requiredRiderDocs": [
        {
            "name": "firstname",
            "displayName": "First Name",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "lastname",
            "displayName": "Last Name",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "avatar",
            "displayName": "Last Name",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "gender",
            "displayName": "gender",
            "options": {
                "type": "select",
                "options": ["Male", "Female"],
                "schemaType": "string",
                "required": true
            }
        },
        {
            "name": "apartment",
            "displayName": "Apt./Suite No.",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "street",
            "displayName": "Street Name",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        {
            "name": "address",
            "displayName": "Home address",
            "options": {
                "type": "text",
                "schemaType": "string",
                "required": true
            }
        },

        { "name": "id_type", "displayName": "ID document", "options": { "type": "select", "options": ["National ID Card", "International Passport"], "schemaType": "string", "required": true } }, { "name": "id_number", "displayName": "Identification Number", "options": { "type": "number", "schemaType": "string", "required": true } }, { "name": "id_issued_at", "displayName": "Issue date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "id_expires_at", "displayName": "Expiry date", "options": { "type": "date", "schemaType": "string", "required": false } }, { "name": "id_image_back", "displayName": "Identification Image - Back", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "id_image_front", "displayName": "Identification Image - Front", "options": { "type": "image", "schemaType": "string", "required": true } }],
    "name": "Nigeria",
    "boundary": [{ "lat": { "$numberDecimal": "13.8856449" }, "lng": { "$numberDecimal": "14.677982" } }, { "lat": { "$numberDecimal": "4.1821001" }, "lng": { "$numberDecimal": "2.676932" } }],
    "isoCode": "NG",
    "driverPercentage": { "$numberInt": "10" },

    "serviceRequiredDocs": {
        "rideDispatch": [],

        "dispatch": [{ "name": "hackney_permit_id", "displayName": "Hackney Permit ID", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "hackney_permit_issued_at", "displayName": "Hackney Permit Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "hackney_permit_expires_at", "displayName": "Hackney Permit Exipry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "hackney_permit_image", "displayName": "Hackney Permit Image", "options": { "type": "image", "schemaType": "string", "required": true } }],

        "haulage": [{ "name": "hackney_permit_id", "displayName": "Hackney Permit ID", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "hackney_permit_issued_at", "displayName": "Hackney Permit Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "hackney_permit_expires_at", "displayName": "Hackney Permit Exipry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "hackney_permit_image", "displayName": "Hackney Permit Image", "options": { "type": "image", "schemaType": "string", "required": true } }]

    },

    "vehicleRequiredDocs": {

        "car": [
            { "name": "car_ownership_cert", "displayName": "Ownership Certificate", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "vehicle_name", "displayName": "Name of Vehicle", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "vehicle_model", "displayName": "Vehicle model", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "vehicle_year", "displayName": "Vehicle year", "options": { "type": "text", "schemaType": "number", "required": "true" } }, { "name": "vehicle_license_plate", "displayName": "License plate no.", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "vehicle_seats", "displayName": "No. of seats", "options": { "type": "text", "schemaType": "number", "required": true } }, { "name": "vehicle_color", "displayName": "Vehicle color", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "vehicle_exterior_front", "displayName": "Vehicle Image  - Exterior Front", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "vehicle_exterior_back", "displayName": "Vehicle Image - Exterior Back", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "vehicle_exterior_left", "displayName": "Vehicle Image - Exterior Left", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "vehicle_exterior_right", "displayName": "Vehicle Image -  Exterior Right ", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "vehicle_interior_front", "displayName": "Vehicle Image -  Interior Front", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "vehicle_interior_back", "displayName": "Vehicle Image - Interior Back", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "inspection_provider", "displayName": "Inspection Provider", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "inspection_id", "displayName": "Inspection ID Number", "options": { "type": "text", "schemaType": "string" } }, { "name": "inspection_issued_at", "displayName": "Inspection Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "inspection_expires_at", "displayName": "Inspection Expiry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "inspection_image", "displayName": "Inspection Report Image", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "insurance_provider", "displayName": "Insurance Provider", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "insurance_id", "displayName": "Insurance ID", "options": { "type": " text", "schemaType": "string", "required": true } }, { "name": "insurance_issued_at", "displayName": "Insurance Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "insurance_expires_at", "displayName": "Insurance Expiry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "insurance_image", "displayName": "Insurance Image", "options": { "type": "date", "schemaType": "string", "required": true } }],


        "truck": [
            {
                "name": "vehicle_ownership_cert", "displayName": "Ownership Certificate", "options": { "type": "image", "schemaType": "string", "required": true }
            },
            { "name": "vehicle_name", "displayName": "Name of vehicle", "options": { "type": "text", "schemaType": "string", "required": true } },
            { "name": "vehicle_year", "displayName": "Vehicle manufacture year", "options": { "type": "text", "schemaType": "number", "required": "true" } },
            { "name": "vehicle_license_plate", "displayName": "License plate no.", "options": { "type": "text", "schemaType": "string", "required": true } },
            { "name": "vehicle_carriage_length", "displayName": "Vehicle carriage length", "info": " -  Length of carriage area", "options": { "type": "text", "schemaType": "number", "required": true } },
            { "name": "vehicle_carriage_width", "displayName": "Vehicle carriage width", "info": " -  Width of carriage area", "options": { "type": "text", "schemaType": "number", "required": true } },
            , { "name": "vehicle_color", "displayName": "Vehicle color", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "vehicle_exterior_front", "displayName": "Vehicle Image  - Exterior Front", "options": { "type": "image", "schemaType": "string", "required": true } },
            { "name": "vehicle_exterior_back", "displayName": "Vehicle Image - Exterior Back", "info": "Ensure license plate is showing in this image and well-lit", "options": { "type": "image", "schemaType": "string", "required": true } },

            { "name": "vehicle_model", "displayName": "Van model", "options": { "type": "text", "schemaType": "string", "required": true } },
            , { "name": "vehicle_exterior_left", "displayName": "Vehicle Image - Exterior Left", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "truck_exterior_right", "displayName": "Van Image -  Exterior Right ", "options": { "type": "image", "schemaType": "string", "required": true } },
            { "name": "vehicle_interior_front", "displayName": "Vehicle Image -  Interior Front", "options": { "type": "image", "schemaType": "string", "required": true } },
            { "name": "inspection_provider", "displayName": "Inspection Provider", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "inspection_id", "displayName": "Inspection ID Number", "options": { "type": "text", "schemaType": "string" } },
            { "name": "inspection_issued_at", "displayName": "Inspection Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } },
            { "name": "inspection_expires_at", "displayName": "Inspection Expiry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "inspection_image", "displayName": "Inspection Report Image", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "insurance_provider", "displayName": "Insurance Provider", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "insurance_id", "displayName": "Insurance ID", "options": { "type": " text", "schemaType": "string", "required": true } }, { "name": "insurance_issued_at", "displayName": "Insurance Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "insurance_expires_at", "displayName": "Insurance Expiry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "insurance_image", "displayName": "Insurance Image", "options": { "type": "date", "schemaType": "string", "required": true } }],


        "bike": [
            { "name": "bike_ownership_cert", "displayName": "Ownership Certificate", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "bike_name", "displayName": "Name of Bike", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "bike_model", "displayName": "Bike model", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "bike_year", "displayName": "Bike manufacture year", "options": { "type": "text", "schemaType": "number", "required": "true" } }, { "name": "bike_license_plate", "displayName": "License plate no.", "options": { "type": "text", "schemaType": "string", "required": true } },
            { "name": "inspection_provider", "displayName": "Inspection Provider", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "inspection_id", "displayName": "Inspection ID Number", "options": { "type": "text", "schemaType": "string" } },
            { "name": "inspection_issued_at", "displayName": "Inspection Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } },
            { "name": "inspection_expires_at", "displayName": "Inspection Expiry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "inspection_image", "displayName": "Inspection Report Image", "options": { "type": "image", "schemaType": "string", "required": true } }, { "name": "insurance_provider", "displayName": "Insurance Provider", "options": { "type": "text", "schemaType": "string", "required": true } }, { "name": "insurance_id", "displayName": "Insurance ID", "options": { "type": " text", "schemaType": "string", "required": true } }, { "name": "insurance_issued_at", "displayName": "Insurance Issue Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "insurance_expires_at", "displayName": "Insurance Expiry Date", "options": { "type": "date", "schemaType": "string", "required": true } }, { "name": "insurance_image", "displayName": "Insurance Image", "options": { "type": "date", "schemaType": "string", "required": true } }
        ]

    }
}

































{
    "_id": {
        "$oid": ""
    },
    "name": "Rivers",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}





{
    "_id": {
        "$oid": "66d0577c5fed1004c1d1dad7"
    },
    "name": "Abuja",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}


{
    "_id": {
        "$oid": "66d0577c5fed1004c1d1dad7"
    },
    "name": "Oyo",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}


{
    "_id": {
        "$oid": ""
    },
    "name": "Kano",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": ""
    },
    "name": "Imo",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": ""
    },
    "name": "Plateau",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": ""
    },
    "name": "Abia",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": ""
    },
    "name": "Delta",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": ""
    },
    "name": "Oyo",
        "country": {
        "$oid": "Akwaibom"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": ""
    },
    "name": "Cross River",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": ""
    },
    "name": "Enugu",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": "66d0577c5fed1004c1d1dad7"
    },
    "name": "Edo",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": "66d0577c5fed1004c1d1dad7"
    },
    "name": "Kwara",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": "66d0577c5fed1004c1d1dad7"
    },
    "name": "Ogun",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": "66d0577c5fed1004c1d1dad7"
    },
    "name": "Kaduna",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}

{
    "_id": {
        "$oid": ""
    },
    "name": "Anambra",
        "country": {
        "$oid": "66cf22008fa6aa0746ea3f63"
    },
    "requiredDriverDocs": [

    ],
        "boundary": [
            {
                "lat": {
                    "$numberDecimal": "6.7027591"
                },
                "lng": {
                    "$numberDecimal": "3.4696459"
                }
            },
            {
                "lat": {
                    "$numberDecimal": "6.393351099999999"
                },
                "lng": {
                    "$numberDecimal": "3.0982732"
                }
            }
        ],
            "location": {
        "type": "Point",
            "coordinates": [
                "6.5480282",
                "3.1191496"
            ]
    },
    "serviceRequiredDocs": {
        "dispatch": [],
            "haulage": [],
                "rideDispatch": [],
                    "ride_only": []
    },
    "vehicleRequiredDocs": {
        "car": [],
            "truck": [],
                "bike": []
    }
}