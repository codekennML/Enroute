import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import Back from '@/components/ui/back';
import { Controller, useForm } from 'react-hook-form';

const Login = () => {

    const { countryShortCode } = useLocalSearchParams<{ countryShortCode: string }>()
    const user = useSelector(selectUserInfo)

    const [open, setOpen] = useState(false)
    // const [countryCode, setCountryCode] = useState('');


    const [inputFocused, setInputFocused] = useState<boolean>(false)



    // const [value, setValue] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [formattedValue, setFormattedValue] = useState('');
    const [valid, setValid] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const { control, watch, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange',
        defaultValues: {
            mobile: "",
            countryCode: 234
        }
    })


    console.log("conncc", countryCode)
    const { authType } = useLocalSearchParams<{ authType: string }>()


    const phoneInputRef = useRef<PhoneInput | null>(null)

    // const handleFocus = (state: boolean) => {
    //     setInputFocused(state)
    //     if (state) {
    //         // phoneInputRef?.current?.focus()
    //     }
    // }

    const watchedValues = watch()

    const onSubmit = (value: string) => {
        console.log(watchedValues)
        const countryCode = watchedValues?.countryCode
        const mobile = watchedValues?.mobile

        console.log(countryCode + mobile)
    }

    useLayoutEffect(() => {
        phoneInputRef.current?.setState({
            code: "234",
            // number: nationalNumber,
            countryCode: "NG",
        });
    }, [])

    useEffect(() => {
        setInputFocused(true)
        // phoneInputRef?.current?.
    }, [])

    const handleBlur = () => {
        setInputFocused(false)

    }

    const handleFocus = () => {
        setInputFocused(true)

    }


    return (
        <View className='flex flex-col h-full  p-4'>

            <View className='mt-[8%]'>
                <Back />
            </View>

            <View className="mt-[3%] ">
                <Text variant="heading" className="text-foreground mb-2">{`Welcome ${authType === "driver" ? "driver" : ""} `}</Text>
                <Text variant="body" className="text-foreground mb-6 font-medium">
                    To sign up or log in, enter your mobile number
                </Text>



                {/* <View className={`mb-4 w-full rounded-md  ${inputFocused ? "border-2  border-blue-600" : "border-gray-300"}`} >
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
                            withCallingCode: true,


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
                                marginLeft: "auto"
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
                            inputMode: "numeric",
                            defaultValue: "",
                            onFocus: { handleFocus },
                            onBlur: { handleBlur }
                            // onBlur ={() => setInputFocused(false)}
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

                </View> */}

                <Controller
                    control={control}
                    name="mobile"
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput
                            ref={phoneInputRef}
                            defaultValue={value?.toString()}
                            value={value?.toString()}
                            placeholder=' '
                            // defaultCode={defaultCode}
                            layout="first"

                            onChangeText={(text: string) => {
                                onChange(text)
                            }}
                            onChangeFormattedText={(text: string) => {
                                console.log(text, phoneInputRef?.current?.getCallingCode())
                                const callingCode = phoneInputRef.current?.getCallingCode()
                                if (callingCode) {
                                    setValue('countryCode', parseInt(callingCode))
                                }
                            }}
                            countryPickerProps={{
                                withFilter: false,
                                withAlphaFilter: false,
                                withCallingCode: true,


                                theme: {
                                    fontSize: 16,
                                    primaryColor: "#134071",
                                    primaryColorVariant: "#f1f5f9",
                                    onBackgroundTextColor: '#134071',
                                    fontWeight: "600",


                                },
                                containerButtonStyle: {
                                    // padding: 10
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
                                    marginLeft: "auto"
                                }


                            }}

                            textInputStyle={{
                                width: "100%",
                                color: "#134071",
                                fontWeight: "600",
                                // backgroundColor: "#f5f5f5",
                                // borderWidth: 1

                            }}

                            // placeholderTextColor="pink"
                            containerStyle={{

                                width: "100%"


                            }}
                            countryPickerButtonStyle={{
                                backgroundColor: "transparent",
                                // width: "100%"
                            }}
                            flagButtonStyle={{
                                backgroundColor: "transparent",
                                // width: "100%"
                                // borderRightWidth: 1,
                                // borderColor: '#f1f4f5'

                            }}
                            textInputProps={{
                                inputMode: "numeric",
                                // placeholderTextColor: '#134071',
                                value: value,
                                autoFocus: true,
                                cursorColor: "#FACC15",
                                onBlur: handleBlur,
                                onFocus: handleFocus
                                // style: {
                                //     borderWidth: 1
                                // }
                                // borderRadius: 8
                            }}
                            codeTextStyle={{
                                color: "#134071",
                                fontWeight: "600"
                            }}

                            textContainerStyle={{
                                backgroundColor: "#fffff6",
                                borderColor: errors.mobile?.message || errors.countryCode?.message ? "red" : inputFocused ? "#facc15" : "#fffff6",
                                borderRadius: 8,
                                borderWidth: 2,
                                paddingVertical: 14,
                                // height: "50%",

                                width: "100%"
                            }}
                            // disabled={disabled}
                            // withDarkTheme
                            withShadow={false}

                        />
                    )}
                />

                <Button variant="default" size={"lg"} rounded={"base"} className="my-4 flex items-center justify-center" onPress={onSubmit}>
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

                <Button variant="ghost" size={"lg"} rounded={"base"} className="mb-2 flex-row justify-start flex items-center my-3 bg-accent" >
                    <Image
                        source={require("../../assets/images/google.png")}
                        className="w-6 h-6 mr-1"
                    />
                    <Text className='font-medium flex-1 text-center' variant={"callout"}>Continue with Google</Text>
                </Button>


                <Button variant="ghost" size={"lg"} rounded={"base"} className="mb-2 flex-row justify-start flex items-center bg-accent" >
                    <Mail size={24} className='text-foreground' />
                    <Text className='font-medium flex-1 text-center' variant={"callout"}>Continue with Email</Text>
                </Button>

                <Text variant="footnote" className="mt-4 text-justify font-medium">
                    By signing up, you agree to our <Text variant="footnote" className="text-accent font-medium">Terms of Service</Text> and <Text variant="footnote" className="text-accent font-medium">Privacy Policy. </Text>
                    Please read our privacy policy to learn how we use your personal data.
                </Text>
            </View>
        </View>
    );
};

export default Login;