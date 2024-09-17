import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Alert, View, StyleSheet, Image, Platform } from 'react-native'
import { Text } from "@/components/ui/text"
import { Button } from '@/components/ui/button'
import { router } from 'expo-router'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import AppCamera, { AppCameraRef } from '@/components/ui/imageUpload/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { avatarSchema, createImageSchema } from './schemas'
import { Camera } from 'react-native-vision-camera'
import { Ionicons } from '@expo/vector-icons'
import { Pen, X } from '@/lib/icons/icons'
import Back from '@/components/ui/back'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '@/redux/slices/user'
import { useUploadSingleFileMutation } from '@/redux/api/upload'
import { useWrappedErrorHandling } from '@/lib/useErrorHandling'
import { BACKEND_URL } from '@/redux/api/apiSlice'
import axios from 'axios'
import { showToast } from '@/redux/slices/toast'
import { useAppDispatch } from '@/redux/hooks'


const R2_ACCOUNT_ID = process.env.EXPO_PUBLIC_R2_ACCOUNT_ID

const AvatarStep = () => {

    const dispatch = useAppDispatch()
    const { _id } = useSelector(selectUserInfo)
    const { handleError } = useWrappedErrorHandling()
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const [dispatchAvatarUpload] = useUploadSingleFileMutation()
    const [image, setImage] = useState<string>()
    // const [dispatchProfileImageUpload] = useUpload


    const { control, formState: { errors } } = useForm({
        resolver: zodResolver(avatarSchema)
    });

    const cameraRef = useRef<AppCameraRef>(null)


    useEffect(() => {
        if (image) {
            uploadImage()
        }
    }, [image])


    // const uploadImage = async () => {
    //     try {


    //         //Upload to Cloudinary TODO 
    //         console.log("Final")
    //         if (!image) return

    //         console.log(image, "Image")


    //         const imageData = await fetch(`file://${image}`)

    //         const fileData = await imageData.blob()
    //         console.log(imageData, "MIOOOE")

    //         const formData = new FormData();

    //         const file = {
    //             uri: `${image}`,
    //             type: fileData.type,
    //             name: `avatar/1.jpg`,
    //         };
    //         console.log(file, fileData, "Mliksk", typeof fileData)

    //         formData.append("image", file)
    //         // formData.append("type", fileData.type)
    //         // formData.append("name", "avatar/1.jpg")


    //         const response = await fetch(`${BACKEND_URL}upload`, {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });


    //         const { data, error } = await dispatchAvatarUpload(formData)
    //         console.log(data, error)

    //         if (error) {
    //             console.log(error)
    //             handleError(error)
    //         }

    //         console.log(data)

    //         const { message, uri } = data

    //         if (uri) {
    //             router.replace({
    //                 pathname: "/verification/personalInfo"
    //             })
    //         }

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const uploadImage = async () => {
        try {

            if (!image) return

            const fileUrl = `file://${image}`

            const fileData = await fetch(fileUrl)

            const validation = createImageSchema(16).safeParse(fileData)

            console.log(fileData, "FILEDATA")

            if (!validation.success) {

                dispatch(showToast({
                    message: validation.error.errors[0].message,
                    notification: "danger",
                    type: "foreground",
                    title: ""
                }))

                return;
            }


            const file = {
                uri: fileUrl,
                type: fileData.type,
                name: `${fileData.uri.split('/').pop()}`,
            };


            const bucketName = "verification"

            const formData = new FormData()

            formData.append("image", file as any)
            formData.append("name", bucketName)

            // Simulated upload to a CDN

            const response = await dispatchAvatarUpload({
                file: formData,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
                    setUploadProgress(percentCompleted / 100);
                },
            })

            const { data, error } = response

            if (error) throw { error } as unknown

            const { uri } = data

            const imageUri = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${bucketName}/${uri}`

            setImage(imageUri)
        } catch (error) {
            // setValue("ABCRFG")
            // onChange("ABGRGET")
            const { data } = error
            let message = "Failed to upload file. Please try again"
            if (data) {
                message = data?.message
            }

            setError(name, {
                message,
                type: "random"
            })
            // console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };


    const handleCapturePhoto = async () => {

        if (cameraRef.current) {
            await cameraRef.current?.capturePhoto()
        }

        uploadImage()

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
                    <Text className='font-medium text-center w-[60%] mt-2 text-muted-foreground dark:text-muted-foreground'>Add a clear profile photo so other users can recognize you.</Text>
                    <Text className='text-primary dark:text-primary text-center'>Who can see my profile photo ?</Text>
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


                                    {/* {
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
                                    } */}
                                </View>
                            </View>
                        )}
                    />

                </View>

            </View>
            <View>
                <Button
                    disabled={!!image}
                    variant={"ghost"}
                    onPress={handleCapturePhoto}
                    className=" bg-pink-600/80 rounded-full pb-10 h-20 w-20  border-8 border-gray-300 mb-4"
                >
                </Button>

            </View>
            {/* {
                !image ?
                    
                    : <Button onPress={() => router.push({
                        pathname: "/verification/personalInfo"
                    })} variant={"default"} size={"lg"} rounded="base"

                        disabled={!!image && !!errors?.avatar || !image} className='flex-row w-full items-center justify-center'>
                        <Text variant={"smallTitle"} className=' font-semibold'>Next</Text>
                    </Button>
            } */}
        </View>
    )

}

export default AvatarStep