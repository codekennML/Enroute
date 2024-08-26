import React, { useLayoutEffect, useRef, useState } from 'react'
import { Alert, View, StyleSheet, Image } from 'react-native'
import { Text } from "@/components/ui/text"
import { Button } from '@/components/ui/button'
import { router } from 'expo-router'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import AppCamera, { AppCameraRef } from '@/components/ui/imageUpload/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { avatarSchema } from './schemas'
import { Camera } from 'react-native-vision-camera'
import { Ionicons } from '@expo/vector-icons'
import { Pen, X } from '@/lib/icons/icons'
import Back from '@/components/ui/back'

const AvatarStep = () => {

    const [image, setImage] = useState<string>()

    console.log(image)
    const { control, formState: { errors } } = useForm({
        resolver: zodResolver(avatarSchema)
    });

    const cameraRef = useRef<AppCameraRef>(null)

    const handleCapturePhoto = () => {
        if (cameraRef.current) {
            cameraRef.current?.capturePhoto()
        }
    };

    const handleRemoveImage = () => {
        console.log(cameraRef, "here")
        if (cameraRef.current) {
            cameraRef.current.removeImage();
        }
    };

    return (
        <View className='py-3 px-6  flex-col h-full justify-between items-center'>

            <View className='flex-1 mt-[10%]'>
                <View>
                    <Back iconSize={32} />
                    <Text className='text-[22px] font-semibold text-center'>Photo Verification </Text>
                </View>
                <View className=' flex items-center justify-center text-justify'>
                    <Text className='font-medium text-center w-[60%] mt-4'>Add a profile photo so other users can recognize you.</Text>
                    <Text className='text-primary text-center'>Who can see my profile photo ?</Text>
                </View>

                <View className=' pt-6 flex-col justify-start items-center '>
                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <View className="w-full mb-4">
                                <View className="flex-row items-center justify-center relative">

                                    <View className={`w-[180px] h-[180px] rounded-full relative overflow-hidden  ${image ? "invisible" : "visible"}                                    `}>
                                        <AppCamera ref={cameraRef} onImageChange={onChange} image={image} setImage={setImage} />


                                        {errors.avatar && (
                                            <Text className="text-red-500 text-xs mt-1">
                                                {/* ts-expect-error ts-issue */}
                                                {errors?.avatar?.message}
                                            </Text>
                                        )}
                                    </View>


                                    {
                                        image && <View className='w-[180px] h-[180px]  rounded-full absolute  '  >
                                            <Image
                                                source={{ uri: image }}
                                                className="w-full h-full rounded-full"
                                                resizeMode="cover"
                                            />

                                            <Button
                                                onPress={handleRemoveImage}
                                                variant={"ghost"}
                                                size={"icon"}
                                                className="absolute bottom-3 right-3 bg-primary rounded-full w-8 h-8 p-1 flex items-center justify-center "
                                            >
                                                <Pen size={16} color="white" />
                                            </Button>
                                        </View>
                                    }
                                </View>
                            </View>
                        )}
                    />

                </View>

            </View>
            {
                !image ?
                    <View>
                        <Button
                            disabled={!!image}
                            variant={"ghost"}
                            onPress={handleCapturePhoto}
                            className=" bg-primary rounded-full pb-10 h-20 w-20  border-8 border-gray-300 mb-4"
                        >
                        </Button>

                    </View> : <Button onPress={() => router.push({
                        pathname: "/verification/personalInfo"
                    })} variant={"default"} size={"lg"} rounded="base"

                        disabled={!!image && !!errors?.avatar || !image} className='flex-row w-full items-center justify-center'>
                        <Text variant={"smallTitle"} className=' font-semibold'>Next</Text>
                    </Button>
            }
        </View>
    )

}

export default AvatarStep