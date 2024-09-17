import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { router, useLocalSearchParams } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { useHandleUserCanUpdateLoginDataMutation, useSignInEmailMutation } from '@/redux/api/auth'
import { useCreateOTPMutation } from '@/redux/api/otp'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '@/redux/slices/user'
import Back from '@/components/ui/back'
import axios from 'axios'
import { useWrappedErrorHandling } from '@/lib/useErrorHandling'


interface EmailParams {
    type: "login" | "change_mobile" | "change_email"
}

const email = () => {

    const { type } = useLocalSearchParams<EmailParams>()
    const [inlineError, setInlineError] = useState("")

    const { error, handleError } = useWrappedErrorHandling()
    const userInfo = useSelector(selectUserInfo)
    const [focusedInput, setFocusedInput] = useState("")
    const emailRef = useRef<TextInput>(null)

    const { control, handleSubmit, formState: { errors }, setError } = useForm({
        mode: "onBlur",
        defaultValues: {
            email: ""
        },
        resolver: zodResolver(z.object({
            email: z.string().email("Please enter a valid email address")
        }))
    })


    useEffect(() => {
        setFocusedInput("email")
    }, [])
    // //THis is for signing in via email 
    const [dispatchEmailSignIn, { isLoading: isLoadingEmailSignIn, isError: isEmailSiginError }] = useSignInEmailMutation()

    //This is for creating a change of mobile
    const [createChangeInfoOTP, { isLoading: isChangeInfoLoading, isError: isChangeInfoError }] = useCreateOTPMutation()

    const [checkCanChangeLoginEmail, { isLoading: isCanChangeLoginEmailLoading, isError: isCanChangeLoginEmailError }] = useHandleUserCanUpdateLoginDataMutation()


    const onSubmit = async (data: { email: string }) => {

        // if (type === "change_mobile") {
        //     const response = await createChangeInfoOTP({
        //         type: "Email",
        //         email: data.email,
        //         next: "otpChannel" //Not the pin entry screen, the otpchannel is the next screen to visit after we have confirmed the email
        //     })

        //     const { otpId } = response.data

        //     router.replace({
        //         pathname: "confirmOTP",
        //         params: {
        //             otpId,
        //             otpRoute: "Email",
        //             type: "change_mobile_confirm_email"
        //         }
        //     })

        // }

        // if (type === "change_email") {

        //     //This would usually be done after the user has logged in , from settings , so we need to confirm if this email has already been taken 

        //     const response = await checkCanChangeLoginEmail({
        //         email: data.email
        //     })

        //     const { otpId, route } = response.data

        //     router.push({
        //         pathname: "/confirmOTP",
        //         params: {
        //             type: "change_email",
        //             otpId,
        //             otpRoute: route

        //         }
        //     })


        // }


        if (type === "change_email") {

            try {

                if (!userInfo) {
                    throw new Error("You do not have appropriate permission to perform this action")
                }
                const response = await checkCanChangeLoginEmail({
                    email: data.email
                })

                const { data: emailData, error } = response

                if (error) {
                    if (error?.status === 409) {
                        setError("email", {
                            message: error?.data?.message || error?.message,
                            type: "random"
                        })
                    } else {
                        handleError(error)

                    }

                    return
                }
                const { otpId } = emailData

                router.replace({
                    pathname: "/confirmOTP",
                    params: {
                        type: "change_email",
                        otpId,
                        otpRoute: "Email"
                    }
                })


            } catch (err) {
                handleError(err)
            }
        }


        if (type === "login") {


            const response = await dispatchEmailSignIn({
                email: data.email
            })

            console.log(response)

            const { data: emailSignInData } = response

            const { mobileVerified, emailVerified, otpId, firstName, verified, user } = emailSignInData


            router.replace({
                pathname: "/confirmOTP",
                params: {
                    otpId,
                    mobileVerified,
                    type: "login_email",
                    firstName,
                    emailVerified,
                    otpRoute: mobileVerified ? "WhatsApp" : "Email",
                    userVerified: verified,
                    user
                }
            })

        }
    }

    return (
        <View className="bg-white p-6 flex flex-col h-full">
            <View className='flex-1 h-full mt-6 '>
                <Back iconType='arrow' iconSize={24} />
                <Text variant="heading" className="text-foreground mb-2 mt-4">Verify your email</Text>
                <Text variant="body" className="text-muted-foreground mb-2 font-medium">
                    Please enter your email address to continue
                </Text>
                <View className={`mb-4 w-full`}>

                    <Controller name="email" control={control} render={
                        ({ field: { onChange, value } }) => {
                            return <Input
                                ref={emailRef}
                                value={value}
                                autoFocus={true}
                                className={`  h-12   font-medium text-[8px]  cursor:text-gray-500 text-foreground px-4  ${focusedInput === "email" ? "border border-primary  " : ""} mt-4 placeholder:text-muted-foreground`}
                                onChangeText={onChange}
                                onFocus={() => setFocusedInput('email')}
                                onBlur={() => setFocusedInput("")}
                                aria-labelledbyledBy='email_error_abel'
                                aria-errormessage='email_error_label'
                                style={{
                                    fontSize: 14
                                }}
                            />
                        }
                    } />

                    {
                        !!errors["email"] &&
                        <Text variant={"footnote"} className='text-destructive mt-2'>{errors.email.message}</Text>
                    }

                </View>

            </View>

            <View>

                <Text variant="callout" className="text-left text-gray-500 mb-4">
                    Purplemetro will not send anything without your consent.
                </Text>

                <Button variant="default" size={"lg"} rounded="base" className=" flex justify-center items-center text-white"

                    onPress={handleSubmit(onSubmit)}
                >
                    <Text variant={"body"} className='text-white font-semibold'>  Continue</Text>
                </Button>
            </View>
        </View>
    )
}

export default email