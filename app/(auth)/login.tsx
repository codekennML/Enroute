import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Separator } from '@/components/ui/seperator';
import { ChevronDown, Mail } from "@/lib/icons/icons"
import { useSelector } from 'react-redux';
import { selectUserInfo, setCountry } from '@/redux/slices/user';
import PhoneInput from 'react-native-phone-number-input';
import Back from '@/components/ui/back';
import { Controller, useForm } from 'react-hook-form';
import { useColorScheme } from '@/lib/useColorScheme';
import { useLazyVerifyExistingMobileQuery, useSignInMobileMutation } from '@/redux/api/auth';
import { COLOR_THEME } from '@/lib/constants';
import SignInGoogle from './google';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import MobileInput from '@/components/ui/phoneInput';
import { useWrappedErrorHandling } from '@/lib/useErrorHandling';

import formatErrorMessage from '@/lib/formatErrorMessages';


const Login = () => {


    const { appId } = useLocalSearchParams<{ appId: string }>()
    const { error, handleError, wrapWithHandling } = useWrappedErrorHandling()
    const [inputFocused, setInputFocused] = useState<string>("")
    const [canRunExistingAccountCheck, setCanRunExistingAccountCheck] = useState(false)
    const [countryIdCode, setCountryIdCode] = useState("")
    const { colorScheme } = useColorScheme()
    const { countryShortCode } = useLocalSearchParams<{ countryShortCode: string }>()
    const [open, setOpen] = useState(true)
    // const [signInMobileData, setMobileSignInData] = useState<{ mobile: number, countryCode: number }>()
    const [skip, setSkip] = useState(true)
    const phoneInputRef = useRef<PhoneInput | null>(null)

    const user = useSelector(selectUserInfo)

    const { authType } = useLocalSearchParams<{ authType: string }>()

    const { control, watch, handleSubmit, setError, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(z.object({
            mobile: z.string({ message: "Mobile number is required" }) // Error for empty string
                .regex(/^\d+$/, "Mobile is required and must contain only digits") // Error for non-digit characters
                .refine((value) => value !== undefined, { message: "Mobile number is required" }), // Error for undefined

            countryCode: z.string({ message: "Country Code is required" }) // Error for empty string
                .regex(/^\d+$/, "Country Code is required and must contain only digits") // Error for non-digit characters
                .refine((value) => value !== undefined, { message: "Country code is required" }),
            countryIdCode: z.string().optional()
        })),
        mode: 'onChange',
        defaultValues: {
            mobile: "",
            countryCode: "234",
            countryIdCode: "NG"
        }
    })

    const watchedValues = watch()
    console.log(watchedValues, errors)

    useEffect(() => {
        setSkip(false)
    }, [])

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


    const [triggerExistingMobileVerify, { data: existingMobileData, error: isExistingMobileError, isLoading: isExistingMobileLoading }] = useLazyVerifyExistingMobileQuery()

    const [dispatchMobileSignIn, { isLoading: isMobileSignInLoading, isError }] = useSignInMobileMutation()

    const [isLoading, setIsLoading] = useState(isExistingMobileLoading || isMobileSignInLoading)

    async function handleLogin(mobile: number, countryCode: number) {

        // console.log(signInMobileData, "NOWWWWW")

        const { data, error } = await triggerExistingMobileVerify({
            mobile,
            countryCode
        })


        if (error) {
            // console.log(error)
            handleError(error)
            return
        }

        const { user, mobileVerified } = data

        if (user && mobileVerified) {
            router.push({
                pathname: "/otpChannel",
                params: {
                    otpMethod: "WhatsApp",
                    mobile,
                    countryCode,
                    user,
                    type: "login_mobile",
                    countryIdCode
                }
            })

        } else {
            setCanRunExistingAccountCheck(false)
            //User does not exist so we can only create the  user with sms otp
            const response = await dispatchMobileSignIn({
                mobile,
                countryCode,
                otpMode: "SMS"
            }).unwrap()

            console.log(response)

            const { otpId, firstName, mobileVerified } = response

            router.push({
                pathname: "/confirmOTP",
                params: {
                    otpId,
                    mobileVerified,
                    firstName,
                    otpRoute: "SMS",
                    type: "login_mobile"
                    // otpMethod: "mobile"

                }
            })
        }

    }

    const handleSubmission = async (countryCode: string, mobile: string) => {

        console.log("Two")

        const number = `${countryCode}${mobile}`

        setCountryIdCode(countryIdCode)

        const checkIsValid = phoneInputRef?.current?.isValidNumber(number)

        if (!checkIsValid) {
            setError("mobile", {
                type: "manual",
                message: "Mobile number is not valid for the selected region."
            })
            return
        }

        setCanRunExistingAccountCheck(true)


        await handleLogin(parseInt(mobile), parseInt(countryCode))
    }

    const onSubmit = async ({ mobile, countryCode, countryIdCode }) => {

        console.log(typeof mobile, typeof countryCode)
        const wrappedHandleSubmission = wrapWithHandling(handleSubmission);
        const response = wrappedHandleSubmission(countryCode, mobile);

    }

    const handleSignInEmail = () => {
        console.log("Pushed")
        router.push({
            pathname: "/email",
            params: {
                type: "login"
            }
        })
    }

    useEffect(() => {
        setInputFocused("mobileInput")
    }, [])

    const handleBlur = () => {
        setInputFocused("")

    }

    const handleFocus = () => {
        setInputFocused("mobileInput")
    }

    return (
        <View className='flex flex-col h-full  p-6'>

            <View className='mt-[8%]'>
                <Back />
            </View>

            <View className="mt-[3%] ">
                <Text variant="heading" className="text-foreground mb-2">{authType === "rider" ? "Welcome" : "Welcome Driver"}</Text>
                <Text variant="body" className="text-muted-foreground mb-6 font-medium">
                    To sign up or log in, enter your mobile number
                </Text>

                <MobileInput ref={phoneInputRef} setValue={setValue} control={control} name="mobile" errors={errors} handleFocus={handleFocus} handleBlur={handleBlur} inputFocused={inputFocused} />


                <Button variant="default" size={"lg"} rounded={"base"} disabled={isLoading} className="my-5 flex items-center justify-center" onPress={handleSubmit(onSubmit)}>
                    <Text variant={"subhead"} color={"light"} className='font-semibold '> Continue</Text>
                </Button>

                <View className='flex flex-row items-center justify-center max-w-full '>
                    <View className='flex-1'>
                        <Separator className='bg-slate-200' />
                    </View>
                    <View className='flex flex-row justify-center items-center px-4'>
                        <Text variant="body" className="text-center mt-0 font-medium text-foreground">or </Text>
                    </View>
                    <View className='flex-1'>
                        <Separator className='bg-slate-200' />
                    </View>
                </View>

                <SignInGoogle />

                <Button variant="ghost" size={"lg"} rounded={"base"} className="mb-2 flex-row justify-start flex items-center bg-accent"
                    onPress={handleSignInEmail}

                >
                    <Mail size={24} className='text-muted-foreground' />
                    <Text variant={"subhead"} className='font-medium flex-1 text-center text-foreground text-md' >Continue with Email</Text>
                </Button>

                <Text variant="footnote" className="mt-4 text-justify font-medium text-muted-foreground">
                    By signing up, you agree to our <Text variant="footnote" className="text-primary font-medium">Terms of Service</Text> and <Text variant="footnote" className="text-primary font-medium">Privacy Policy. </Text>
                    Please read our privacy policy to learn how we use your personal data.
                </Text>
            </View>
        </View>
    );
};

export default Login;