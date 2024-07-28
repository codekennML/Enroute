import { Slot } from 'expo-router';
import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { View, SafeAreaView } from 'react-native'
// import MultiStepForm from './multistep';


const dynamicField = [
    {
        id: 1,
        name: "id_type",
        displayName: "Identification document",
        options: {
            type: "radio",
            options: [
                "National ID Card",
                "International Passport"
            ],
            schemaType: "string"
        }
    },

    // {
    //     id: 2,
    //     name: "id_number",
    //     displayName: "Identification Number",
    //     options: {
    //         type: "text",
    //         schema: "z.object({id_number : z.string() })"
    //     }
    // },
    // {
    //     id: 3,
    //     name: "id_image_back",
    //     displayName: "Identification Image - Back",
    //     options: {
    //         type: "image",
    //         schema: "z.object({id_image_back : z.string() })"
    //     }
    // },

    // {
    //     id: 4,
    //     name: "id_image_back",
    //     displayName: "Identification Image - Front",
    //     options: {
    //         type: "image",
    //         schema: "z.object({id_image_back : z.string() })"
    //     }
    // },

    // {
    //     id: 4,
    //     name: "id_issued_at",
    //     displayName: "Issue date",
    //     options: {
    //         type: "image",
    //         schema: "z.object({id_issued_at : z.string() })"
    //     }
    // },

    // {
    //     id: 5,
    //     name: "id_expires_at",
    //     displayName: "Issue date",
    //     options: {
    //         type: "image",
    //         schema: "z.object({id_expires_at : z.string() })"
    //     }
    // }

]

export default function VerificationLayout() {

    return <SafeAreaView>


        {/* <MultiStepForm dynamicFields={dynamicField} /> */}

        <Slot />


    </SafeAreaView>
}

