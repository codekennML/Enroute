import React, { useEffect, useRef, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radiogroup';
import PhoneInput from 'react-native-phone-number-input';
import { Separator } from "@/components/ui/seperator"
import { MessageSquare } from "@/lib/icons/icons"
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { COLOR_THEME } from '@/lib/constants';
import { useCreateOTPMutation } from '@/redux/api/otp';
import { useCheckDuplicateAccountOfAnotherRoleMutation, useSignInMobileMutation, useVerifyAccountViaMobileMutation } from '@/redux/api/auth';
import MobileInput from '@/components/ui/phoneInput';
import Back from '@/components/ui/back';
import { useWrappedErrorHandling } from '@/lib/useErrorHandling';
import formatErrorMessage from '@/lib/formatErrorMessages';

interface OtpParams {
  type?: "change_mobile_google_account" | "change_mobile_email_account" | "login_mobile" | "create_mobile_email_account" | "create_mobile_google_account",
  user: string
  otpMethod: "WhatsApp" | "SMS"
  mobile?: string,
  countryCode?: string
  countryIdCode?: string

}

const otpChannel = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [inlineError, setInlineErrors] = useState("")
  const [inputFocused, setInputFocused] = useState<string>("")
  const phoneInputRef = useRef<PhoneInput | null>(null)
  const { error, handleError, wrapWithHandling } = useWrappedErrorHandling()

  const [dispatchCreateOTP, { isLoading: isLoadingCreateOTP, isError: IsCreateOTPError, error: createOTPError }] = useCreateOTPMutation()

  const [dispatchCheckDuplicateAccountRole, { isLoading: isCheckDupAccountLoading, isError: isCheckDupAccountError, error: checkDupAccountError }] = useCheckDuplicateAccountOfAnotherRoleMutation()

  const [dispatchMobileSignIn, { isLoading: isMobileSignInLoading, isError: isMobileSignInError }] = useSignInMobileMutation()

  const [dispatchVerifyViaMobile, { isLoading: isVerifyViaMobileLoading, isError: isVerifyViaMobileError }] = useVerifyAccountViaMobileMutation()

  const { type, user, otpMethod, mobile, countryCode, countryIdCode } = useLocalSearchParams<OtpParams>()


  // console.log(countryCode, countryIdCode, mobile, "BiLLE")
  const { control, handleSubmit, watch, formState: { errors }, setValue, setError } = useForm({
    mode: "onChange",
    defaultValues: {
      mobile: mobile ? mobile : "",
      countryCode: countryCode ?? 234,
      channel: otpMethod ?? "WhatsApp",
      countryCodeId: countryIdCode ?? "NG"
    }
  })

  const watchedValues = watch()

  // console.log(watchedValues)

  const handleBlur = () => {
    setInputFocused("")
  }

  const handleFocus = () => {
    setInputFocused("mobileInput")

  }

  useEffect(() => {
    setInputFocused("mobileInput")
  }, [])



  useEffect(() => {

    if (error) {

      if (error.type === "ValidationError" && error?.reasons) {

        for (const [key, value] of Object.entries(error.reasons)) {
          setError(key, {
            message: formatErrorMessage(value)
          });
        }
      }

    }


  }, [error])

  useEffect(() => {
    const loading = isCheckDupAccountError || isLoadingCreateOTP

    setIsLoading(isLoading)

  }, [isCheckDupAccountLoading, isLoadingCreateOTP])


  const processSubmission = async (
    mobile: string,
    countryCode: string,
    channel: "SMS" | "WhatsApp"
  ) => {

    const number = `${countryCode}${mobile}`

    const checkIsValid = phoneInputRef?.current?.isValidNumber(number)

    if (!checkIsValid) {
      setError("mobile", {
        type: "manual",
        message: "Mobile number is not valid for the selected region."
      })
      return
    }

    await handleAction({
      mobile: parseInt(mobile),
      countryCode: parseInt(countryCode),
      channel: channel
    })
  }


  const onError = (data) => {
    console.log(data, 'error')
  }

  const onSubmit = async (data: {
    mobile: string,
    countryCode: string,
    channel: "SMS" | "WhatsApp"
    countryCodeId: string
  }) => {

    console.log(data)

    const wrappedResponse = wrapWithHandling(processSubmission)
    const response = await wrappedResponse(
      parseInt(data.mobile),
      parseInt(data.countryCode),
      data.channel
    )

  }


  const handleAction = async (data: {
    mobile: number,
    countryCode: number,
    channel: "SMS" | "WhatsApp"
  }) => {

    switch (type) {

      case "change_mobile_google_account":
      case "change_mobile_email_account":


        //First we need to verify if the number is not asssociated with an account of another role, say the user is a driver and trying to change into  a number registered to a rider account, since 

        const isDuplicateOfAnotherRole = await dispatchCheckDuplicateAccountRole({
          mobile: data.mobile,
          countryCode: data.countryCode,
          user: user!
        }).unwrap()

        if (checkDupAccountError) {
          //todo
          //Set the error here 
        }

        const changeMobileInfoResponse = await dispatchCreateOTP({
          mobile: data.mobile,
          countryCode: data.countryCode,
          type: data.channel
        })

        const { otpId } = changeMobileInfoResponse.data

        if (otpId) {
          router.replace({
            pathname: "/confirmOTP",
            params: {
              otpId,
              otpRoute: "SMS",
              type: "change_mobile_confirm_new_mobile",
            }
          })
        }

        break

      case "login_mobile":

        const loginMobileResponse = dispatchMobileSignIn({
          mobile: data.mobile,
          countryCode: data.countryCode,
          otpMode: otpMethod!

        }).unwrap()

        const { otpId: mobileLoginOtpId, firstName, mobileVerified } = loginMobileResponse

        router.replace({
          pathname: "/confirmOTP",
          params: {
            otpId: mobileLoginOtpId,
            firstName,
            otpRoute: "SMS",
            type: "login_mobile",
            mobile

          }

        })



        break

      // case "new_mobile_mobile_account" :
      case "create_mobile_email_account":
      case "create_mobile_google_account":

        //This user will not have an option to select a method, they ,must verify via sms since they are creating a new mobile

        //Send an otp via the create otp channel and verify it using dispatch verify via mobile

        console.log(type)
        console.log(data)
        console.log("Here")

        const { data: createOTPData, error } = await dispatchCreateOTP({
          user: user,
          type: "SMS",
          countryCode: data.countryCode,
          mobile: data.mobile
        })

        if (error) {
          handleError(error)
          return
        }

        console.log("Ziba")

        //IF there is data here, we should be getting an otpId 
        const { otpId: createdOtpId } = createOTPData.data.data
        console.log(createOTPData)

        router.replace({
          pathname: "/confirmOTP",
          params: {
            otpId: createdOtpId,
            user,
            type: "login_mobile",
            mobileVerified: false,
            userVerified: false,
            otpRoute: "SMS",
          }
        })

        console.log("Jayba")


        break

      default:
        break

    }

  }

  const canShowOptions = type === "login_mobile"


  return (
    <View className="  p-4  flex flex-col h-full">

      <View className='flex-1 h-full mt-8'>
        <Back />
        <Text variant="heading" className="text-foreground mt-2 mb-2">{canShowOptions ? "One Time Password" : "Verify your mobile number"}</Text>
        <Text variant="body" className="text-foreground mb-6 font-medium">
          {canShowOptions ? "Select a channel  to receive your verification code" : "Enter your mobile number to continue"}
        </Text>

        <View className={`mb-4 w-full rounded-md`} >

          <MobileInput
            ref={phoneInputRef}
            setValue={setValue}
            control={control}
            name='mobile'
            defaultCode={countryCode}
            defaultCountryCode={countryIdCode}
            errors={errors}
            inputFocused={inputFocused}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />

        </View>
        {
          canShowOptions && <View className='mt-4'>
            <Controller name="channel" control={control} render={({ field: { onChange, value } }) => (
              <RadioGroup value={value} onValueChange={onChange} className='gap-y-3'>
                <View className='flex flex-row justify-between '>

                  <View className='flex flex-row items-center gap-x-3'>
                    <MessageSquare size={28} className={"text-foreground"} />
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
        }

      </View>
      <View>

        <Text variant="callout" className="text-left text-gray-500 mb-4">
          Enroute will not send anything without your consent.
        </Text>

        <Button variant="default" size={"lg"} rounded="base" className=" flex justify-center items-center text-white" onPress={
          handleSubmit(onSubmit, onError)}
        >
          <Text variant={"body"} className='text-white font-semibold'>  Continue</Text>
        </Button>
      </View>
    </View>
  );
};

export default otpChannel