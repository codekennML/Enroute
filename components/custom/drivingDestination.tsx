import { View, Image } from 'react-native'
import React from 'react'
import { Text } from "@/components/ui/text"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '@/components/ui/button'
import { BadgeCheck, MessageCircle, PhoneOutgoing, Share, ShieldCheck } from "@/lib/icons/icons"
import { Dispatch, SetStateAction } from 'react'
import { router } from 'expo-router'


const DestinationDrive = () => {
  return (
    <View className='p-2 pb-6' >
      <View className='flex-row items-center justify-between'>

        <Text variant={"mediumTitle"} className='  mb-4'>Driving to destination...</Text>

      </View>

      <View className='flex-row justify-between items-center border p-4 rounded-md border-slate-200'>

        <View>
          <View>

            <Text variant={"subhead"} className='font-bold leading-2 tracking-wide'>{` MK67EY`}</Text>
            <Text variant={"body"} >{` Mercedes Benz GLE 450 `}</Text>

          </View>

          <View className=' p-2 rounded-sm flex flex-col justify-end items-center '>
            <Text variant={"subhead"} className='font-semibold'> 04:59  PM</Text>
            <Text variant={"body"} className=''>Est. Arrival </Text>

          </View>
        </View>


        <View className='flex flex-row  gap-x-4 pr-3.5 items-center'>
          <Button variant="ghost" rounded="full" className="bg-primary p-2  flex-row items-center justify-center gap-x-2" onPress={() => { router.push("/map") }}>
            <Share size={20} className="text-white p-2" />
            {/* <Text variant={"footnote"} className='font-medium'>Call</Text> */}
          </Button>



          <Button variant="ghost" rounded="full" className="bg-primary p-2  flex-row items-center justify-center gap-x-2 ">
            <ShieldCheck size={20} className="text-white p-2" />
            {/* <Text variant={"footnote"} className='font-medium'>Chat</Text> */}
          </Button>

        </View>

      </View>


      <View className='border border-slate-200  px-4 pb-3 pt-2 rounded-md   my-3'>
        <Text variant={"subhead"} className='font-semibold pb-3 pt-0'>Your Driver </Text>

        <View className='flex-row  items-center justify-between'>
          <View className='flex-row gap-x-2 '>
            <Avatar alt="user avatar" className='h-12 w-12 rounded-full' >
              <AvatarImage source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kLuVl7_2soHqjgecM56X2AHaLL%26pid%3DApi&f=1&ipt=5ce178d3918a2527d8efd01f8162db3ab0581bb1a3fbf60331bd22cbb9f7a5bb&ipo=images" }} resizeMode='cover' className=' object-cover' />
              <AvatarFallback>
                <Text>Driver Avatar</Text>
              </AvatarFallback>
            </Avatar>
            <View>
              <Text variant={"body"} className='font-semibold'>Akash Vernon </Text>
              <Text>Verified Driver </Text>
            </View>

          </View>
          <View className=''>
            <BadgeCheck className="font-bold text-primary" size={32} />
          </View>
        </View>

      </View>


      {/* Cancel && passengers */}
      <View className='flex flex-row items-center gap-2 mt-3'>
        <Button variant="ghost" rounded="base" className="bg-muted  flex-1" >
          <Text className='text-center py-3' variant="body">View Passengers </Text>
        </Button>
        <Button variant="default" rounded="base" className="  flex-1">
          <Text variant={"body"} color={"none"} className=' text-white text-center py-3 font-semibold'>Get Help</Text>
        </Button>
      </View>

    </View>
  )
}

export default DestinationDrive