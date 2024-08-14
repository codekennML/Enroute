import { TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import DynamicSelect from '@/components/ui/select/dynamic'
import { Text } from '@/components/ui/text'
import CustomTextArea from '@/components/custom/CustomTextArea'

const ticketSchema = z.object({
    tag: z.string(),
    // user : {
    //     avatar : z.string(), 
    //     email : z.string().email()
    // },
    rideData: z.object({
        id: z.string(),
        tripId: z.string(),
        driverId: z.string()
    }).optional(),
    subject: z.string(),
    body: z.string()
})

const Ticket = () => {

    const [focusedInput, setFocusedInput] = useState("")

    const [defaultValues, setDefaultValues] = useState({
        tag: "",
        subject: "",
        body: ""
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(ticketSchema),
        mode: "onChange",
        defaultValues: defaultValues
    })

    const ticketsConcern = [
        "Help with a ride",
        "Safety issues",
        "Suggestions",
        "Legal concern",
        "Other"
    ]

    const bodyTextRef = useRef<TextInput>(null)


    return (
        <View>
            <Text className='text-center' variant="heading">Get in touch</Text>
            <View className='my-4'>
                <Controller
                    name="tag"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <View className="pb-4">
                            <Text variant="body" className='font-medium pb-3'>What is the nature of your concern</Text>
                            <DynamicSelect
                                options={ticketsConcern}
                                value={value}
                                onValueChange={onChange}
                                label={value || ""}
                            // label={}
                            />
                            {/* {errors[""] && <Text>{errors[name].message}</Text>} */}
                        </View>
                    )}
                />


            </View>

            <View>
                <Text> </Text>
                <Controller control={control} name="subject" render={({ field: { onChange, value } }) => (
                    <View>
                        <Input
                            // ref={destinationNameRef}
                            placeholder={value ?? ""}
                            onFocus={() => setFocusedInput("subject")}
                            onBlur={() => setFocusedInput("")}
                            value={value}
                            onChangeText={onChange}
                            className={`${focusedInput === "subject" ? "border-blue-600" : ""} bg-accent h-14 py-3 placeholder:text-foreground px-4 placeholder:text-sm placeholder:font-medium text-xs `} />
                    </View>
                )} />
            </View>

            <View>
                <Controller
                    name="body"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <CustomTextArea
                            ref={bodyTextRef}
                            value={value}
                            onChange={onChange}
                            // inputSubtitle='e.g Please describe the nature of your concern clearly'
                            inputTitle='Describe your concerns'
                            placeholder="Please describe the nature of your concern clearly"

                        />
                    )}
                />
            </View>
        </View>
    )
}

export default Ticket