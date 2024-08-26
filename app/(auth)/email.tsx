import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { router, useLocalSearchParams } from 'expo-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { useHandleUserCanUpdateLoginDataMutation, useSignInEmailMutation } from '@/redux/api/auth'
import { useCreateOTPMutation } from '@/redux/api/otp'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '@/redux/slices/user'


interface EmailParams {
    type: "login" | "change_mobile" | "change_email"
}

const email = () => {

    const [error, setError] = useState("")
    const user = useSelector(selectUserInfo)
    // const [email, setemail] = useState('')
    const [focusedInput, setFocusedInput] = useState("")
    const emailRef = useRef<TextInput>(null)

    const { type } = useLocalSearchParams<EmailParams>()


    const { control, formState: { errors } } = useForm({
        mode: "onBlur",
        defaultValues: {
            email: ""
        },
        resolver: zodResolver(z.object({
            email: z.string().email("Please enter a valid email address")
        }))
    })

    //THis is for signing in via email 
    const [dispatchEmailSignIn, { isLoading: isLoadingEmailSignIn, isError: isEmailSiginError }] = useSignInEmailMutation()

    //This is for creating a change of mobile
    const [createChangeInfoOTP, { isLoading: isChangeInfoLoading, isError: isChangeInfoError }] = useCreateOTPMutation()

    const [checkCanChangeLoginEmail, { isLoading: isCanChangeLoginEmailLoading, isError: isCanChangeLoginEmailError }] = useHandleUserCanUpdateLoginDataMutation()


    const onSubmit = async (data: { email: string }) => {

        if (type === "change_mobile") {

            const response = await createChangeInfoOTP({
                type: "Email",
                email: data.email,
                next: "otpChannel" //Not the pin entry screen, the otpchannel is the next screen to visit after we have confirmed the email
            })

            const { otpId } = response.data

            router.replace({
                pathname: "confirmOTP",
                params: {
                    otpId,
                    otpRoute: "Email",
                    type: "change_mobile_confirm_email"
                }
            })



        }

        if (type === "change_email") {

            //This would usually be done after the user has logged in , from settings , so we need to confirm if this email has already been taken 

            const response = await checkCanChangeLoginEmail({
                email: data.email
            })

            const { otpId, route } = response.data

            router.push({
                pathname: "/confirmOTP",
                params: {
                    type: "change_email",
                    otpId,
                    otpRoute: route

                }
            })


        }

        if (type === "login") {
            //First, the user can be new or old, we need to know whether to send them to go add their mobile after verification or to just send the otp to their mobile 

            const response = await dispatchEmailSignIn({
                email: data.email
            })

            const { mobileVerified, emailVerified, otpId, firstName, verified } = response.data


            router.push({
                pathname: "/confirmOTP",
                params: {
                    otpId,
                    mobileVerified,
                    type: "login_email",
                    firstName,
                    emailVerified,
                    userVerified: verified

                }
            })

        }
    }


    return (
        <View className="bg-white p-4 flex flex-col h-full">
            <View className='flex-1 h-full mt-10 '>
                <Text variant="heading" className="text-foreground mb-2">Verify Your E-mail</Text>
                <Text variant="body" className="text-foreground mb-2 font-medium">
                    Please enter your email address
                </Text>
                <View className={`mb-4 w-full`}>
                    <Input
                        ref={emailRef}
                        value={email}
                        autoFocus={true}
                        className={` border-none border-0  h-14 bg-accent border-transparent font-medium text-[8px]  cursor:text-gray-500 text-muted-foreground px-2 py-1 ${focusedInput === "firstName" ? "border-2  border-primary" : ""} mt-4 placeholder:text-foreground`}
                        placeholder="E-mail"
                        onFocus={() => setFocusedInput('firstName')}
                        onBlur={() => setFocusedInput("")}
                        // onSubmitEditing={(e) => handleDestinationSubmit(e.nativeEvent.text)}
                        // onChangeText={(text) => handleChange(text, "destination")}
                        aria-labelledbyledBy='email_error_abel'
                        aria-errormessage='email_error_label'

                        style={{
                            fontSize: 14
                        }}
                    />

                    {
                        errors["email"] &&
                        <Text>{errors.email.message}</Text>
                    }

                </View>

            </View>

            <View>

                <Text variant="callout" className="text-left text-gray-500 mb-4">
                    Purplemetro will not send anything without your consent.
                </Text>

                <Button variant="default" size={"lg"} rounded="base" className=" flex justify-center items-center text-white" onPress={() => {
                    router.push({
                        pathname: "(auth)/confirmOTP",
                        // params: {
                        //     coole: "string"
                        // }
                    })
                }}>
                    <Text variant={"body"} className='text-white font-semibold'>  Continue</Text>
                </Button>
            </View>
        </View>
    )
}

export default email