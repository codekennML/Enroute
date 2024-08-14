import { View, Image } from 'react-native'
import React from 'react'
import { Text } from "@/components/ui/text"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '@/components/ui/button'
import { BadgeCheck, MessageCircle, PhoneOutgoing, Share, ShieldCheck, SquareArrowOutUpRightIcon } from "@/lib/icons/icons"
import { Dispatch, SetStateAction } from 'react'
import { router } from 'expo-router'


const DestinationDrive = () => {
  return (
    <View className='p-2 pb-6' >
      <View className='flex-row items-center justify-between mb-4'>

        <Text variant={"mediumTitle"} className='  '>Driving to destination</Text>
        <Text className='font-semibold text-primary' variant={"subhead"}>41 mins</Text>

      </View>


      <View>
        <View className='flex-row  items-center justify-between gap-x-2'>
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


        </View>

      </View>

      <View className='flex  gap-x-2 mt-3   border-slate-200 rounded-md pb-2  pt-1 mb-1'>
        <View className='flex flex-row gap-x-1  items-center'>

          <View className='border-2 border-red-500 bg-blue-50 h-3 w-3 rounded-full '></View>


          <Text variant={"body"} className='font-semibold pl-2'>Destination</Text>
        </View>

        <View className='flex flex-col '>

          <Text variant="callout" className='text-foreground font-medium  mt-1'>
            1234 Myrle Drive, Brooklyn, NY,11216
          </Text>
        </View>

      </View>

      <View className='flex flex-row items-start justify-between my-4'>
        <View>
          <Text variant={"subhead"} className='font-bold leading-2 tracking-wide'>{` MK67EY`}</Text>
          <Text variant={"body"} >{` Mercedes Benz GLE 450 `}</Text>
        </View>

        {/* <View className='flex flex-row  gap-x-4 pr-3.5 items-center'> */}
        <Button variant="ghost" rounded="base" className="bg-accent p-2  flex-row items-center justify-center gap-x-2" onPress={() => { router.push("/map") }}>
          <SquareArrowOutUpRightIcon size={20} className="text-foreground p-2" />
          <Text variant={"footnote"} className='font-medium'>Share ride details</Text>
        </Button>
      </View>





      {/* Cancel && passengers */}
      <View className='flex flex-row items-center gap-2 mt-3'>
        <Button variant="ghost" rounded="base" className="bg-muted  flex-1" >
          <Text className='text-center py-3' variant="body">View Passengers </Text>
        </Button>
        <Button variant="default" rounded="base" className="  flex-1">
          <Text variant={"body"} color={"light"} className=' text-white text-center py-3 font-semibold'>Get Help</Text>
        </Button>
      </View>

    </View >
  )
}

export default DestinationDrive