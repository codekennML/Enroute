import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { Separator } from '@/components/ui/seperator';
import { ChevronDown, Mail } from "@/lib/icons/icons"
// import { CountryPicker } from "react-native-country-codes-picker";
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/redux/slices/user';
import PhoneInput from 'react-native-phone-number-input';

const Login = () => {

    const { countryShortCode } = useLocalSearchParams<{ countryShortCode: string }>()
    const user = useSelector(selectUserInfo)

    const [open, setOpen] = useState(false)
    // const [countryCode, setCountryCode] = useState('');


    const [inputFocused, setInputFocused] = useState<boolean>(false)



    const [value, setValue] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [formattedValue, setFormattedValue] = useState('');
    const [valid, setValid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [showMessage, setShowMessage] = useState(false);



    console.log("conncc", countryCode)
    const { authType } = useLocalSearchParams<{ authType: string }>()


    const phoneInputRef = useRef<PhoneInput | null>(null)

    const handleFocus = (state: boolean) => {
        setInputFocused(state)
        if (state) {
            // phoneInputRef?.current?.focus()
        }
    }

    useEffect(() => {
        setInputFocused(true)
        // phoneInputRef?.current?.focus()
    }, [])


    return (
        <View className='flex flex-col h-full  p-4'>


            <View className="mt-[10%] ">
                <Text variant="heading" className="text-foreground mb-2">{`Welcome ${authType === "driver" ? "driver" : ""} `}</Text>
                <Text variant="body" className="text-foreground mb-6 font-medium">
                    To sign up or log in, enter your mobile number
                </Text>

                <View>




                </View>

                <View className={`mb-4 w-full rounded-md  ${inputFocused ? "border-2  border-blue-600" : "border-gray-300"}`} >



                    <PhoneInput
                        ref={phoneInputRef}
                        defaultValue={value}
                        defaultCode="NG"
                        layout="first"
                        placeholder=''
                        onChangeText={(text) => {
                            setValue(text);
                        }}

                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                            setCountryCode(phoneInputRef.current?.getCountryCode() || '');
                        }}
                        countryPickerProps={{
                            withFilter: false,
                            withAlphaFilter: false,
                            withCallingCode: false,


                            theme: {
                                fontSize: 16,
                                primaryColor: "#134071",
                                primaryColorVariant: "#f1f5f9",
                                onBackgroundTextColor: '#134071',
                                fontWeight: "600",


                            },
                            containerButtonStyle: {
                                padding: 10
                            },

                            filterProps: {
                                backgroundColor: "transparent",
                                borderBottomColor: "#134071",
                                borderBottomWidth: 2,
                                padding: 10
                                // borderRadius: 3,

                                // marginVertical: 3
                            },
                            closeButtonImageStyle: {
                                fontSize: 30,
                                color: "#2563eb",
                                amrginLeft: "auto"
                            }


                        }}
                        textInputStyle={{
                            width: "100%",
                            color: "#134071",
                            fontWeight: "600"
                        }}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            width: "100%"
                        }}
                        countryPickerButtonStyle={{
                            backgroundColor: "transparent",
                            // width: "100%"
                        }}
                        flagButtonStyle={{
                            backgroundColor: "transparent",
                            // width: "100%"
                            borderRightWidth: 1,
                            borderColor: '#f1f4f5'

                        }}
                        textInputProps={{
                            inputMode: "numeric"
                        }}
                        codeTextStyle={{
                            color: "#134071",
                            fontWeight: "600"
                        }}



                        textContainerStyle={{
                            backgroundColor: "transparent",
                            width: "90%"
                        }}
                        disabled={disabled}
                        // withDarkTheme
                        withShadow={false}
                        autoFocus
                    />

                </View>

                <Button variant="default" size={"lg"} rounded={"base"} className="mb-4 flex items-center justify-center" onPress={() => router.push({
                    pathname: "/(auth)/otpChannel"
                })}>
                    <Text variant={"subhead"} color={"secondary"} className='text-white font-semibold '>  Continue</Text>
                </Button>

                <View className='flex flex-row items-center justify-center max-w-full '>
                    <View className='flex-1'>
                        <Separator className='bg-slate-200' />
                    </View>
                    <View className='flex flex-row justify-center items-center px-4'>
                        <Text variant="body" className="text-center mt-0 font-medium">or </Text>
                    </View>
                    <View className='flex-1'>
                        <Separator className='bg-slate-200' />
                    </View>
                </View>

                <Button variant="outline" size={"lg"} rounded={"base"} className="mb-2 flex-row justify-start flex items-center my-3" >
                    <Image
                        source={require("../../assets/images/google.png")}
                        className="w-6 h-6 mr-1"
                    />
                    <Text className='font-medium flex-1 text-center' variant={"body"}>Continue with Google</Text>
                </Button>


                <Button variant="outline" size={"lg"} rounded={"base"} className="mb-2 flex-row justify-start flex items-center" >
                    <Mail size={24} className='text-foreground' />
                    <Text className='font-medium flex-1 text-center' variant={"body"}>Continue with Email</Text>
                </Button>

                <Text variant="footnote" className="mt-4 text-justify font-medium">
                    By signing up, you agree to our <Text variant="footnote" className="text-accent font-medium">Terms of Service</Text> and <Text variant="footnote" className="text-accent font-medium">Privacy Policy.</Text>
                    Please read our Privacy Policy to learn how we use your personal data.
                </Text>
            </View>
        </View>
    );
};

export default Login;