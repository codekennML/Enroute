import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Controller, UseFormSetValue } from 'react-hook-form';
import { COLOR_THEME } from '@/lib/constants';


interface PhoneInputProps<T> {
    control: any;  // The control object from React Hook Form
    name: string;
    defaultCode?: string;
    defaultCountryCode?: string;
    errors: Record<string, unknown>;
    setValue: UseFormSetValue<{ [x: string]: string | number }>
}

const MobileInput = forwardRef((props: PhoneInputProps, ref) => {
    const { control, name, defaultCode, defaultCountryCode, errors, setValue } = props;
    const [inputFocused, setInputFocused] = useState<boolean>(false)
    const internalRef = useRef<PhoneInput>(null);


    useLayoutEffect(() => {
        if (defaultCode && defaultCountryCode) {
            internalRef.current?.setState({
                code: defaultCode,
                // number: nationalNumber,
                countryCode: defaultCountryCode,
            });

        } else {
            internalRef.current?.setState({
                code: "234",
                // number: nationalNumber,
                countryCode: "NG",
            });
        }
    }, [])



    // Expose the internal ref to the parent component if needed
    useImperativeHandle(ref, () => internalRef.current);


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
        <View>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <PhoneInput
                        ref={internalRef}
                        defaultValue={value?.toString()}
                        value={value?.toString()}
                        placeholder=' '
                        // defaultCode={defaultCode}
                        layout="first"

                        onChangeText={(text: string) => {
                            onChange(text)
                        }}
                        onChangeFormattedText={(text: string) => {
                            console.log(text, internalRef?.current?.getCallingCode())
                            const callingCode = internalRef.current?.getCallingCode()
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
                                primaryColor: "#350566",
                                primaryColorVariant: "#f1f5f9",
                                onBackgroundTextColor: '#350566',
                                fontWeight: "600",

                            },
                            containerButtonStyle: {

                            },

                            filterProps: {
                                backgroundColor: "transparent",
                                borderBottomColor: "#350566",
                                borderBottomWidth: 2,
                                padding: 10

                            },
                            closeButtonImageStyle: {
                                fontSize: 30,
                                color: "#2563eb",
                                marginLeft: "auto"
                            }


                        }}

                        textInputStyle={{
                            width: "100%",
                            color: "#350566",
                            fontWeight: "600",


                        }}


                        containerStyle={{

                            width: "100%"


                        }}
                        countryPickerButtonStyle={{
                            backgroundColor: "transparent",
                            // width: "100%"
                        }}
                        flagButtonStyle={{
                            backgroundColor: "transparent",


                        }}
                        textInputProps={{
                            inputMode: "numeric",
                            value: value,
                            autoFocus: true,
                            cursorColor: "#350566",
                            onBlur: handleBlur,
                            onFocus: handleFocus

                        }}
                        codeTextStyle={{
                            color: "#350566",
                            fontWeight: "600"
                        }}

                        textContainerStyle={{
                            backgroundColor: COLOR_THEME.light.accent,
                            borderColor: errors?.mobile?.message || errors?.countryCode?.message ? "red" : inputFocused ? COLOR_THEME.light.primary : "",
                            borderRadius: 8,
                            borderWidth: 2,
                            paddingVertical: 14,

                            width: "100%"
                        }}
                        // disabled={disabled}
                        // withDarkTheme
                        withShadow={false}

                    />
                )}
            />
            {errors[name] && (
                <Text style={{ color: 'red' }}>{errors[name] as string}</Text>
            )}
        </View>
    );
});

export default MobileInput;