import React, { useEffect, useState } from 'react'
import {
    GoogleSignin,

    statusCodes,
} from '@react-native-google-signin/google-signin';
import { View, Image } from 'react-native'
import { Button } from '@/components/ui/button';
import { Text } from "@/components/ui/text"
import { useSignInGoogleMutation } from '@/redux/api/auth';
import { router } from 'expo-router';
import { useWrappedErrorHandling } from '@/lib/useErrorHandling';
import { useAppDispatch } from '@/redux/hooks';
import { showToast } from '@/redux/slices/toast';



GoogleSignin.configure({
    webClientId: '610693434846-7ahe8iii1gcpt9fhpgbnf30ujfedivq7.apps.googleusercontent.com',
    // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.

    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    // scopes=[]

});

const SignInGoogle = () => {

    const { error, handleError, wrapWithHandling } = useWrappedErrorHandling()



    const dispatch = useAppDispatch()




    const [dispatchGoogleSignIn, { isLoading, isError }] = useSignInGoogleMutation()

    const triggerGoogleLogin = async ({ id, token, email }: { id: string, token: string, email: string }) => {

        if (!token || token === "") {


            dispatch(showToast({
                message: "An error has occurred.Please try again",
                notification: "danger",
                type: "foreground",
                title: "Something went wrong"
            }))

            return
        }


        const response = await dispatchGoogleSignIn({ id, email, token }).unwrap()

        console.log(response, "Response")


        const { data, error } = response

        const { user, mobile, countryCode, firstName, mobileVerified, otpId, email: googleUserEmail } = response

        if (error) {
            handleError(error)
        }

        console.log(response, "Google response")

        if (!mobileVerified) {
            router.push({
                pathname: "/otpChannel",
                params: {
                    type: "create_mobile_google_account",
                    user,
                    otpMethod: "SMS"
                }
            })
        } else {

            router.push({
                pathname: "/confirmOTP",
                params: {
                    mobile,
                    countryCode,
                    mobileVerified,
                    otpId,
                    firstName,
                    user,                   // googleUser: user,
                    email,
                    type: "login_mobile",
                    otpMethod: "WhatsApp",
                }

            })
        }
        // console.log(response, "MIZASD")

    }

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const { idToken, user } = userInfo

            const { id, email } = user
            console.log(userInfo, "userInfo");

            const wrappedGoogleLogin = wrapWithHandling(triggerGoogleLogin)
            await wrappedGoogleLogin({ id, token: idToken as string, email })


        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {

                handleError({
                    data: {
                        message: "Google sign in cancelled"
                    },
                    status: 715
                })


                // user cancelled the login flow
                //Show alert dialog, login cancelled

            } else if (error.code === statusCodes.IN_PROGRESS) {

                handleError({
                    data: {
                        message: "Google authentication already in progress"
                    },
                    status: 715
                })
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated

                handleError({
                    data: {
                        message: "You need to have Google play services enabled to use this app on your device."
                    },
                    status: 715
                })



            } else {
                // some other error happened 
                console.log(JSON.stringify(error))

                handleError({
                    data: {
                        message: "An unknown error has occured. Please try again"
                    },
                    status: 715
                })



            }
        }
    };


    return (
        <Button onPress={signIn} variant="ghost" size={"lg"} rounded={"base"} className="mb-2 flex-row justify-start flex items-center my-3 bg-accent txt" >
            <Image
                source={require("../../../assets/images/google.png")}
                className="w-6 h-6 mr-1"
            />
            <Text className='font-medium flex-1 text-center text-foreground' variant={"footnote"}>Continue with Google</Text>
        </Button>

    )
}

export default SignInGoogle