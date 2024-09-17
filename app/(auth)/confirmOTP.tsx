import { View, Image } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Text } from '@/components/ui/text'
import OTPInput from '@/components/ui/otp'
import { Button } from '@/components/ui/button'
import { router, useLocalSearchParams } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { useCreateOTPMutation, useUpdateOTPMutation, useVerifyOTPMutation } from '@/redux/api/otp'
import { useChangeUserEmailWithinAccountMutation, useChangeUserMobileWithinAccountMutation, useVerifyAccountViaMobileMutation, useVerifyUserEmailMutation } from '@/redux/api/auth'
import Back from '@/components/ui/back'
import { useOtpCountdown } from '@/lib/useOTPCountdown'
import { useErrorHandling, useWrappedErrorHandling } from '@/lib/useErrorHandling'
import formatErrorMessage from '@/lib/formatErrorMessages'
import * as SecureStore from "expo-secure-store"
import { useAppDispatch } from '@/redux/hooks'
import { selectUserInfo, updateOtherUserData } from '@/redux/slices/user'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup'
import { Separator } from '@/components/ui/seperator'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { MessageSquareMore, X } from '@/lib/icons/icons'
import { Sheet, useSheetRef } from '@/components/ui/sheets'
import { useSelector } from 'react-redux'


interface ConfirmOTPLocalParams {
    otpId: string,
    mobileVerified?: string,
    userVerified?: string
    emailVerified: string
    firstName?: string,
    user: string,
    otpRoute: "WhatsApp" | "SMS" | "Email"
    type: "login_email" | "login_mobile" | "change_email" | "change_mobile"
}

interface FormProps {
    otp: number | undefined
    otpRoute: "WhatsApp" | "SMS" | "Email"
}

const index = () => {

    const { countdown, startCountdown } = useOtpCountdown(10)

    const { error, handleError, wrapWithHandling } = useWrappedErrorHandling()

    const dispatch = useAppDispatch()
    const userInfo = useSelector(selectUserInfo)

    const sheetRef = useSheetRef()


    const [canRequestAnotherOTP, setCanRequestAnotherOTP] = useState(false)

    // const [dispatchChangeMobileOTP, { isLoading: changeMobileLoading, isError: changeMobileOTPError }] = useCreateOTPMutation()

    const [dispatchVerifyViaMobile, { isLoading: isVerifyViaMobileLoading, isError: isVerifyViaMobileError }] = useVerifyAccountViaMobileMutation()

    const [dispatchVerifyEmail, { isLoading: isVerifyEmailLoading, isError: isVerifyEmailError }] = useVerifyUserEmailMutation()

    const [dispatchNewOtp, { isLoading: isLoadingNewOTP, isError: isNewOtpError }] = useUpdateOTPMutation()

    const [dispatchVerifyOTP, { isLoading: isVerifyOTPLoading, isError: isVerifyOTPError }] = useVerifyOTPMutation()

    const [changeEmailAuthenticated, { isLoading: isChangeEmailAuthenticatedLoading, isError: isChangeEmailAuthenticatedError }] = useChangeUserEmailWithinAccountMutation()

    const [changeMobileAuthenticated, { isLoading: isChangeMobileAuthenticatedLoading, isError: isChangeMobileAuthenticatedError }] = useChangeUserMobileWithinAccountMutation()


    const { otpId, mobileVerified, firstName, user, otpRoute, type, emailVerified } = useLocalSearchParams<ConfirmOTPLocalParams>()


    const { control, watch, handleSubmit, formState: { errors }, setValue, setError } = useForm<FormProps>({
        defaultValues: {
            otpRoute: otpRoute!
        }
    })

    const [otpIdentifier, setOtpIdentifier] = useState<string>(otpId!)


    // console.log(user)
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

            if (error.type === "ValidationError" && !error?.reasons && error?.message) {
                setError("otp", {
                    message: error.message,
                    type: "random"
                })
            }
        }

    }, [error])


    const handleAction = async ({ otp }: { otp: number }) => {

        console.log(mobileVerified, "VERFFF")

        switch (type) {

            case "login_email":
            case "login_mobile":

                //A user is trying to log in ,our response will depend on two things 

                const isMobileVerified = mobileVerified === "true"

                if (isMobileVerified) {

                    // console.log(mobileVerified)
                    //This is not a new user, which means an otp was sent to the number we have in the db already 
                    console.log("Mizpaa")


                    const { data, error } = await dispatchVerifyViaMobile({
                        otpId: otpIdentifier,
                        otp: otp,
                        isNonMobileSignup: false,
                    }).unwrap()


                    if (error) {
                        console.log("Finanec")
                        handleError(error)
                    }

                    const { next, avatar, roles, user, firstName, verified } = data //Next is either a rediret to home or to verification

                    //Set the user ID into secure store for when we need to revalidate the data on app waking 
                    await SecureStore.setItemAsync("avin_coma_us_pm-tye", user)
                    //Set the user info into state 

                    await dispatch(updateOtherUserData({
                        roles,
                        avatar,
                        firstName,
                        verified,
                        _id: user
                    }))


                    router.replace({
                        pathname: next
                    })

                } else {
                    console.log("Runner", type)
                    //This is a new user, Navigate them to enter and validate their phone number, for email login , its a new user

                    if (type === "login_email") {
                        // console.log(otpId, otp)

                        console.log("Miha")

                        if (emailVerified) {

                            //Verify the otp 

                            const response = await dispatchVerifyOTP({
                                otp,
                                otpId: otpIdentifier
                            })

                            const { data, error } = response

                            if (error) {
                                console.log("Fidec")
                                return handleError(error)
                            }

                            //The user has a verified email but no verified mobile so we navigate to otp channel for them to bind mobile to their account 

                            return router.replace({
                                pathname: "/otpChannel",
                                params: {
                                    user,
                                    otpMethod: "SMS",
                                    type: "create_mobile_email_account"
                                }
                            })
                        }

                        const response = await dispatchVerifyEmail({ otpId: otpIdentifier, otp })
                        const { data, error } = response

                        console.log(response, data, "WEratet")

                        if (error) {
                            console.log("lddnanec")
                            return handleError(error)
                        }
                        const { next, _id } = data.data

                        router.replace({
                            pathname: `/${next}`, //Next is otpChannel
                            params: {
                                type: "create_mobile_email_account",
                                user: _id,
                                otpMethod: "SMS"
                            }
                        })

                    }

                    if (type === "login_mobile") {

                        // This is a new mobile user , we need to verify their account 
                        try {
                            const response = await dispatchVerifyViaMobile({
                                otpId: otpIdentifier,
                                otp: otp,
                                isNonMobileSignup: true,
                            }).unwrap()

                            const { next } = response //Next is either a rediret to home or to verification
                            const { avatar, roles, user, firstName, verified } = response

                            // //Set the user ID into secure store for when we need to revalidate the data on app waking 
                            await SecureStore.setItemAsync("avin_coma_us_pm-tye", user)
                            //Set the user info into state 

                            await dispatch(updateOtherUserData({
                                roles,
                                avatar,
                                firstName,
                                verified,
                                _id: user
                            }))
                            console.log(next)

                            return router.replace({
                                pathname: next
                            })

                        } catch (dispatchError) {
                            //A conflict  error will happen with a duplicate account
                            const data = dispatchError?.data

                            console.log(data, "VHHHhHA")

                            if (data?.next === "duplicateAccount") {

                                const { users, currentUser, isNonMobileSignup, mobile, countryCode, alterToken } = data

                                // Move to the duplicate acoount roles screen here 
                                return router.replace({
                                    pathname: "/duplicateAccount",
                                    params: {
                                        users: JSON.stringify(users),
                                        currentUser: JSON.stringify(currentUser),
                                        isNonMobileSignup,
                                        mobile,
                                        countryCode,
                                        alterToken
                                    }

                                })

                            } else {
                                handleError(dispatchError)
                            }

                        }
                    }
                }

                break


            case "change_email":
            case "change_mobile":

                try {

                    if (!userInfo) {
                        throw new Error("You do not have appropriate permission to perform this action")
                    }

                    if (type === "change_email") {

                        const response = await changeEmailAuthenticated({
                            otpId: otpIdentifier,
                            otp
                        })

                        const { data: emailData, error } = response.data
                        if (error) {
                            console.log(error, "Error")
                            return handleError(error)
                        }

                        if (emailData?.next === "email_changed") {
                            console.log("emailChanged")
                            //Naviaate to email changed successfully page  
                            // router.replace({
                            //     pathname: "/settings/personal/email/edit/success"
                            // })     if (error) {
                            return handleError(error)
                        }


                        const { next, message } = emailData

                        if (next === "email_changed") {
                            console.log("emailChanged")
                            //Naviaate to email changed successfully page  
                            // router.replace({
                            //     pathname: "/settings/personal/email/edit/success"
                            // })
                        }
                    }

                    if (type === "change_mobile") {

                        const response = await changeMobileAuthenticated({
                            otpId: otpIdentifier,
                            otp
                        })
                        console.log(response)
                        const { data: mobileData, error } = response.data
                        if (error) {
                            console.log(error, "Error")
                            return handleError(error)
                        }

                        if (mobileData?.next === "mobile_changed") {
                            console.log("mobileChanged")
                            //Naviaate to email changed successfully page  
                            // router.replace({
                            //     pathname: "/settings/personal/email/edit/success"
                            // })
                        }

                    }



                } catch (e) {
                    console.log("Mizla")
                    handleError(error)
                }


                break

            // case "change_mobile_confirm_email":

            //     const otpVerifyResponse = await dispatchVerifyOTP({
            //         otpId: otpIdentifier,
            //         otp
            //     })

            //     const { user: otpVerifedUser } = otpVerifyResponse.data

            //     if (user && user === otpVerifedUser) {
            //         //Navigate to otpChannel to get the new phone number , where we will check if you are trying to impersonate another account
            //         router.replace({
            //             pathname: "/otpChannel",
            //             params: {
            //                 type: "change_mobile_email_account",
            //                 user,
            //                 otpMethod: "SMS"
            //             }
            //         })

            //     }

            //     break

            // case "change_mobile_confirm_new_mobile":
            // case "change_mobile_google":

            //     const confirmNewMobileResponse = await dispatchVerifyViaMobile({
            //         otpId: otpIdentifier,
            //         otp,
            //         isNonMobileSignup: true, //Need this to be true so that the new mobile gets updated along with the countryCode
            //         // user: user!
            //     })
            //     //todo naviagte to handle duplicate screen if there is a duplicate response, remember to set the isNonMobileSignup to false
            //     console.log(confirmNewMobileResponse)

            //     //Navigate to account dashboard if the user is verified 

            //     const { firstName, verified } = confirmNewMobileResponse.data

            //     if (!firstName && !verified) {
            //         //Begin their verification process
            //         router.replace({
            //             pathname: "/verification"
            //         })
            //     }

            //     else {

            //         //You want to allow the user go to the dashboard now
            //         router.replace({
            //             pathname: "/"
            //         })
            //     }



            //     break

            case "change_mobile":

                break

            default:
                break
        }
    }

    const handleOTPConfirmation = async ({ otp }: { otp: number }) => {

        // console.log(otp)

        const wrappedAction = wrapWithHandling(handleAction)
        await wrappedAction({ otp })

    }

    const resendOTP = async (info: FormProps) => {

        console.log("Ran", otpRoute)
        const data = {
            otpId: otpIdentifier,
            type: info.otpRoute
        }

        const response = await dispatchNewOtp(data).unwrap()

        console.log(response, "resendOTP Reesponse")
        const { otpId: resentOTPId } = response.data
        setCanRequestAnotherOTP(false)
        startCountdown()
        setOtpIdentifier(resentOTPId)

        return response
    }

    const handleResendOTP = async (data: FormProps) => {
        console.log("run")
        sheetRef?.current?.close()
        const response = wrapWithHandling(resendOTP)
        await response(data)
    }


    const onError = (data: any) => {
        console.log(data)
    }

    const handleResendOptions = async () => {


        //Check if we should bring up the resend options bottom sheet or not 
        const watchedRoute = watch("otpRoute")
        const isMobileVerified = mobileVerified === "true"

        console.log(watchedRoute, isMobileVerified)

        const canShowBottomSheet = isMobileVerified && watchedRoute !== "Email"

        if (canShowBottomSheet) {
            sheetRef.current?.present()
        } else {

            handleSubmit(handleResendOTP, onError)()
        }

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
        <>
            <View className=" bg-white p-6  flex flex-col h-full">
                <View className='mt-6'>

                    <Back />
                </View>


                <View className='flex-1 h-full mt-6 '>

                    <Text variant="heading" className="text-foreground mb-2">{`${firstName ? `Hello ${firstName}` : `Enter the code`}`}</Text>


                    <Text variant="body" className="text-muted-foreground mb-2 font-medium">
                        Please enter your verification code to continue.
                    </Text>



                    <View className={`mb-4 w-full mt-1.5 `} >
                        <Controller name="otp" control={control} render={({ field }) => (

                            <OTPInput length={4}

                                onComplete={(value) => {
                                    handleSubmit(() => handleOTPConfirmation({ otp: parseInt(value) }))();
                                }}

                            />

                        )} />
                        {errors["otp"] && <Text variant={"body"} className='mt-3 text-destructive pl-2' >{errors?.otp?.message}</Text>}
                    </View>

                    <View className='mt-1  items-start justify-end'>
                        <Button variant={"ghost"} size={"sm"} rounded={"full"} disabled={!canRequestAnotherOTP} className={` my-1 flex flex-row items-center justify-start  h-10 px-4 bg-accent `}

                            onPress={handleResendOptions}
                        >
                            <Text variant={"body"} className={`font-medium px-0 ${canRequestAnotherOTP ? "text-foreground" : "text-foreground/80"} `}> {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}</Text>
                        </Button>

                    </View>
                </View>



            </View>


            <Sheet
                snapPoints={["30%"]}
                enablePanDownToClose={false}
                ref={sheetRef}
                enableOverDrag={false}
            >
                <BottomSheetScrollView scrollEnabled={false} style={{
                    paddingHorizontal: 20

                }}>
                    <View className='flex-row flex-1 items-center'>
                        <Button variant={"ghost"} className='flex-row items-center justify-center ' onPress={() => sheetRef?.current?.close()}>
                            <X size={35} className='text-foreground' />
                        </Button>
                        <Text className='text-foreground flex-1 items-center text-center ' variant={"mediumTitle"} >Receive your otp </Text>
                    </View>
                    <View className=' mt-6 mb-4 '>
                        <Controller name="otpRoute" control={control} render={({ field: { onChange, value } }) => (
                            <RadioGroup value={value} onValueChange={onChange} className='gap-y-3'>
                                <View className='flex flex-row justify-between '>

                                    <View className='flex flex-row items-center gap-x-3'>
                                        <MessageSquareMore size={28} className={"text-foreground"} />
                                        <Text variant="body" className="text-foreground mb-1 font-medium">Send via SMS  </Text>
                                    </View>

                                    <RadioGroupItem value='SMS' aria-labelledby={`message_send_${value}`} />

                                </View>
                                <Separator className="bg-slate-200" />

                                <View>
                                    <View className='flex flex-row justify-between'>

                                        <View className='flex flex-row items-center gap-x-3'>
                                            <Image
                                                source={require("../../assets/images/whatsapp.png")}
                                                className="w-7 h-7 "
                                            />
                                            <Text variant="body" className="text-foreground mb-2 font-medium">Send via WhatsApp  </Text>
                                        </View>
                                        <RadioGroupItem value='WhatsApp' aria-labelledby={`message_send_${value}`} />

                                    </View>

                                </View>


                            </RadioGroup>

                        )} />
                    </View>
                    <Button onPress={handleSubmit(handleResendOTP)} variant={"default"} size={"lg"} rounded={"base"} className='flex-row justify-center items-center mb-4'>
                        <Text color={"light"} className='font-semibold' variant={"subhead"}>
                            Resend OTP
                        </Text>
                    </Button>

                </BottomSheetScrollView >
            </Sheet>

        </>
    )
}

export default index
