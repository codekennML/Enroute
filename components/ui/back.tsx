import { View, Text } from 'react-native'
import React from 'react'
import { Button } from './button'
import { router } from 'expo-router'
import { X } from '@/lib/icons/icons'

const Back = () => {

    return (
        <>
            {
                router.canGoBack() &&
                <Button variant={"ghost"} className='flex-row items-center justify-center w-10 mb-4' onPress={() => router.back()}>
                    <X size={35} className="text-foreground" />
                </Button>
            }
        </>
    )
}

export default Back