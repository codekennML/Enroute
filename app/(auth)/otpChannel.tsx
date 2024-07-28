import React, { useRef, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import PhoneInput from 'react-native-phone-number-input';
import { Separator } from "@/components/ui/seperator"
import { MessageSquare } from "@/lib/icons/icons"
import { router } from 'expo-router';

const otpChannel = () => {

  // const [sendMethod, setSendMethod] = useState('sms');

  const [channel, setChannel] = React.useState('SMS');

  const [value, setValue] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const phoneInputRef = useRef<PhoneInput | null>(null)

  return (
    <View className="  p-4  flex flex-col h-full">
      <View className='flex-1 h-full mt-20'>
        <Text variant="heading" className="text-foreground mb-2">One Time Password</Text>
        <Text variant="body" className="text-foreground mb-6 font-medium">
          Select a channel  to recieve your verification code
        </Text>

        <View className={`mb-4 w-full rounded-md border border-gray-300 `} >

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

        <View className='mt-4'>
          <RadioGroup value={value} onValueChange={setValue} className='gap-3'>
            <View className='flex flex-row justify-between '>

              <View className='flex flex-row items-center gap-x-3'>
                <MessageSquare size={28} className={"text-foreground"} />
                <Text variant="body" className="text-foreground mb-1 font-medium">Send via SMS  </Text>
              </View>
              <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />

            </View>
            <Separator className="bg-slate-200" />
            <View className='flex flex-row justify-between'>

              <View className='flex flex-row items-center gap-x-3'>
                <Image
                  source={require("../../assets/images/whatsapp.png")}
                  className="w-8 h-8 "
                />
                <Text variant="body" className="text-foreground mb-2 font-medium">Send via WhatsApp  </Text>
              </View>
              <RadioGroupItem value='Default' aria-labelledby={`message_send_${value}`} />

            </View>

          </RadioGroup>
        </View>
      </View>
      <View>

        <Text variant="callout" className="text-left text-gray-500 mb-4">
          Enroute will not send anything without your consent.
        </Text>

        <Button variant="default" size={"lg"} rounded="base" className=" flex justify-center items-center text-white" onPress={() => {
          router.push({
            pathname: "/(auth)/confirmOTP",
            params: {
              coole: "string"
            }
          })
        }}>
          <Text variant={"body"} className='text-white font-semibold'>  Continue</Text>
        </Button>
      </View>
    </View>
  );
};

export default otpChannel