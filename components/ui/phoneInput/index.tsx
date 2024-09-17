import React, { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Controller, UseFormSetValue } from 'react-hook-form';
import { COLOR_THEME } from '@/lib/constants';
import { Text } from "@/components/ui/text"


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

    console.log()

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
                        defaultCode={defaultCode}
                        layout="first"

                        onChangeText={(text: string) => {
                            onChange(text)
                        }}
                        onChangeFormattedText={(text: string) => {
                            console.log(text, internalRef?.current?.getCallingCode())
                            const callingCode = internalRef.current?.getCallingCode()
                            if (callingCode) {
                                setValue('countryCode', callingCode)
                            }
                        }}

                        countryPickerProps={{
                            withFilter: false,
                            withAlphaFilter: false,
                            withCallingCode: false,



                            theme: {
                                fontSize: 16,
                                primaryColor: COLOR_THEME.light.foreground,
                                primaryColorVariant: "#f1f5f9",
                                onBackgroundTextColor: COLOR_THEME.light.foreground,
                                fontWeight: "normal",

                            },
                            containerButtonStyle: {

                            },

                            filterProps: {
                                backgroundColor: "transparent",
                                borderBottomColor: COLOR_THEME.light.foreground,
                                borderBottomWidth: 2,
                                padding: 10

                            },
                            closeButtonImageStyle: {
                                fontSize: 30,
                                color: COLOR_THEME.light.foreground,
                                marginLeft: "auto"
                            }
                        }}

                        textInputStyle={{
                            width: "100%",
                            color: COLOR_THEME.light.foreground,
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
                            cursorColor: COLOR_THEME.light.foreground,
                            onBlur: handleBlur,
                            onFocus: handleFocus

                        }}
                        codeTextStyle={{
                            color: COLOR_THEME.light.foreground,
                            fontWeight: "600"
                        }}

                        textContainerStyle={{
                            // backgroundColor: COLOR_THEME.light.accent,
                            borderColor: errors?.mobile?.message || errors?.countryCode?.message ? COLOR_THEME.light.destructive : inputFocused ? COLOR_THEME.light.primary : "",
                            borderRadius: 8,
                            borderWidth: 1,
                            paddingVertical: 12,
                            width: "100%"
                        }}
                        // disabled={disabled}
                        // withDarkTheme
                        withShadow={false}

                    />
                )}
            />
            {errors[name] && (
                <Text variant={"footnote"} className='text-destructive mt-2'>{errors[name]?.message as string}</Text>
            )}
        </View>
    );
});

export default MobileInput;