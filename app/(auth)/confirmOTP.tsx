import { View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text } from '@/components/ui/text'
import OTPInput from '@/components/ui/otp'
import { Button } from '@/components/ui/button'
import { router, useLocalSearchParams } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useCreateOTPMutation, useUpdateOTPMutation, useVerifyOTPMutation } from '@/redux/api/otp'
import { useChangeUserEmailWithinAccountMutation, useVerifyAccountViaMobileMutation, useVerifyUserEmailMutation } from '@/redux/api/auth'
import Back from '@/components/ui/back'
import { useOtpCountdown } from '@/lib/useOTPCountdown'
import { useErrorHandling, useWrappedErrorHandling } from '@/lib/useErrorHandling'
import formatErrorMessage from '@/lib/formatErrorMessages'

interface ConfirmOTPLocalParams {
    otpId: string,
    mobileVerified?: string,
    userVerified?: string
    firstName?: string,
    user: string,
    otpRoute: "WhatsApp" | "SMS" | "Email"
    type: "login_email" | "login_mobile" | "change_email" | "change_mobile_confirm_email" | "change_mobile_google" | "change_mobile_confirm_new_mobile"

}


const index = () => {

    const { countdown, startCountdown } = useOtpCountdown(60)

    const { error, handleError, wrapWithHandling } = useWrappedErrorHandling()

    const [otpIdentifier, setOtpIdentifier] = useState<string>()

    const [canRequestAnotherOTP, setCanRequestAnotherOTP] = useState(false)

    const [dispatchChangeMobileOTP, { isLoading: changeMobileLoading, isError: changeMobileOTPError }] = useCreateOTPMutation()

    const [dispatchVerifyViaMobile, { isLoading: isVerifyViaMobileLoading, isError: isVerifyViaMobileError }] = useVerifyAccountViaMobileMutation()

    const [dispatchVerifyEmail, { isLoading: isVerifyEmailLoading, isError: isVerifyEmailError }] = useVerifyUserEmailMutation()

    const [dispatchNewOtp, { isLoading: isLoadingNewOTP, isError: isNewOtpError }] = useUpdateOTPMutation()

    const [dispatchVerifyOTP, { isLoading: isVerifyOTPLoading, isError: isVerifyOTPError }] = useVerifyOTPMutation()

    const [changeEmailAuthenticated, { isLoading: isChangeEmailAuthenticatedLoading, isError: isChangeEmailAuthenticatedError }] = useChangeUserEmailWithinAccountMutation()
    const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm<{ otp: number }>()


    const { otpId, mobileVerified, firstName, user, otpRoute, type } = useLocalSearchParams<ConfirmOTPLocalParams>()


    console.log(user)
    useEffect(() => {

        if (error) {
            console.log(error, "Got ther errorors")
            if (error.type === "ValidationError" && error?.reasons) {

                console.log("Validation Errorr", error)
                for (const [key, value] of Object.entries(error.reasons)) {
                    console.log(key, value);
                    setError(key, {
                        message: formatErrorMessage(value)
                    });
                }
            }


        }

    }, [error])


    const handleAction = async ({ otp }: { otp: number }) => {

        switch (type) {

            case "login_email":
            case "login_mobile":

                //A user is trying to log in ,our response will depend on two things 



                const isMobileVerified = mobileVerified === "true"

                if (isMobileVerified) {

                    console.log(mobileVerified)
                    //This is not a new user, which means an otp was sent to the number we have in the db already 
                    console.log("Mizpaa")


                    const { data, error } = await dispatchVerifyViaMobile({
                        otpId: otpId!,
                        otp: otp,
                        user,
                        isNonMobileSignup: false,
                    }).unwrap()


                    if (error) {
                        handleError(error)
                    }

                    console.log(data)
                    const { firstName, verified } = data

                    if (!firstName && !verified) {
                        //Begin their verification process
                        router.replace({
                            pathname: "/verification"
                        })
                    } else {
                        router.replace({
                            pathname: "/"
                        })
                    }




                } else {
                    console.log("Runner", type)
                    //This is a new user, Navigate them to enter and validate their phone number, for email login , its a new user

                    if (type === "login_email") {

                        const { data, error } = await dispatchVerifyEmail({ otpId: otpId!, otp })

                        if (error) {
                            handleError(error)
                        }

                        const { next, _id } = data

                        if (_id) {
                            router.replace({
                                pathname: "/otpChannel",
                                params: {
                                    type: "create_mobile_email_account",
                                    user: _id,
                                    otpMethod: "SMS"
                                }
                            })
                        }
                    }

                    if (type === "login_mobile") {

                        //This will come directly from the login component, not otpChannel because this user is new 

                        //This is a new mobile user , we need to verify their account 
                        const { data, error } = await dispatchVerifyViaMobile({
                            otpId: otpId!,
                            otp: otp,
                            isNonMobileSignup: true, //This verifies the mobile
                            user: user!
                        }).unwrap()

                        if (error) {
                            handleError(error)
                        }

                        //We do not expect a duplicate account of another role sice that only happens when a user tries to change thrir mobile and not on login ,  except the user tries to game the system here, in which case this endpoint will throw, isExistingUserWithAnotherRole error
                        console.log(data)
                        const { next } = data //Next is either a rediret to home or to verification

                        router.replace({
                            pathname: next
                        })

                    }
                }


                break


            case "change_email":
                const changeEmailResponse = await changeEmailAuthenticated({
                    otpId: otpId!,
                    otp
                })

                const { next, message } = changeEmailResponse.data

                if (next === "email_changed") {
                    console.log("emailChanged")
                    //Naviagate to email changed successfully page  
                    // router.replace({
                    //     pathname: "/settings/personal/email/edit/success"
                    // })
                }
                break

            case "change_mobile_confirm_email":

                const otpVerifyResponse = await dispatchVerifyOTP({
                    otpId: otpId!,
                    otp
                })

                const { user: otpVerifedUser } = otpVerifyResponse.data

                if (user && user === otpVerifedUser) {
                    //Navigate to otpChannel to get the new phone number , where we will check if you are trying to impersonate another account
                    router.replace({
                        pathname: "/otpChannel",
                        params: {
                            type: "change_mobile_email_account",
                            user,
                            otpMethod: "SMS"
                        }
                    })

                }

                break

            case "change_mobile_confirm_new_mobile":
            case "change_mobile_google":

                const confirmNewMobileResponse = await dispatchVerifyViaMobile({
                    otpId: otpId!,
                    otp,
                    isNonMobileSignup: true, //Need this to be true so that the new mobile gets updated along with the countryCode
                    user: user!
                })
                //todo naviagte to handle duplicate screen if there is a duplicate response, remember to set the isNonMobileSignup to false
                console.log(confirmNewMobileResponse)

                //Navigate to account dashboard if the user is verified 

                const { firstName, verified } = confirmNewMobileResponse.data

                if (!firstName && !verified) {
                    //Begin their verification process
                    router.replace({
                        pathname: "/verification"
                    })
                }

                else {

                    //You want to allow the user go to the dashboard now
                    router.replace({
                        pathname: "/"
                    })
                }




                break


            default:
                break
        }
    }

    const handleOTPConfirmation = async ({ otp }: { otp: number }) => {

        console.log(otp)

        const wrappedAction = wrapWithHandling(handleAction)
        await wrappedAction({ otp })

    }

    const resendOTP = async () => {

        const data = {
            otpId: otpId!,
            type: otpRoute!
        }

        const response = await dispatchNewOtp(data).unwrap()
        const { otpId: resentOTPId } = response
        startCountdown()
        setOtpIdentifier(resentOTPId)

        return response
    }

    const handleResendOTP = useCallback(() => {
        wrapWithHandling(resendOTP)
    }, [])




    const handleChangeMobile = () => {
        console.log("Mobile Change")
    }

    useEffect(() => {

        if (countdown === 0) {
            setCanRequestAnotherOTP(true)
        }
    }, [countdown])

    useEffect(() => {
        //Anytime this page comes in focus, an otp has already been sent
        setCanRequestAnotherOTP(false)
        startCountdown()
    }, [])




    return (
        <View className=" bg-white p-4  flex flex-col h-full">
            <View className='mt-6'>

                <Back />
            </View>


            <View className='flex-1 h-full mt-2 '>

                <Text variant="heading" className="text-foreground mb-2">{`${firstName ? `Hello ${firstName}` : `Enter the code`}`}</Text>


                <Text variant="body" className="text-foreground mb-2 font-medium">
                    Please enter your verification code to continue.
                </Text>

                {

                    type !== "login_mobile" && <Button variant={"link"} onPress={handleChangeMobile} rounded={"full"} className=' py-1  h-12 px-4 pl-0 bg-white '>

                        <Text variant='body' className='underline font-medium' >Changed your mobile? </Text>
                    </Button>
                }


                <View className={`mb-4 w-full mt-1.5 `} >
                    <Controller name="otp" control={control} render={({ field }) => (

                        <OTPInput length={4}

                            onComplete={(value) => {
                                handleSubmit(() => handleOTPConfirmation({ otp: parseInt(value) }))();
                            }}

                        />

                    )} />
                </View>

                <View className='mt-1  items-start justify-end'>
                    <Button variant={"ghost"} size={"sm"} rounded={"full"} disabled={!canRequestAnotherOTP} className={` my-1 flex flex-row items-center justify-start  h-10 px-4 bg-accent `}

                    // onPress={handleResendOTP}
                    >
                        <Text variant={"body"} className={`font-medium px-0 ${canRequestAnotherOTP ? "text-foreground" : "text-foreground/80"} `}> {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}</Text>
                    </Button>



                </View>
            </View>

        </View>
    )
}

export default index
