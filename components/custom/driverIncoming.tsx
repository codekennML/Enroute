import { View, Image } from 'react-native'
import React from 'react'
import { Text } from "@/components/ui/text"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Star, SendHorizonal, PhoneOutgoing, ShieldCheck, MessageCircle } from '@/lib/icons/icons'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction } from 'react'
import { router } from 'expo-router'

interface DriverIncomingProps {
  timeToArrival: number
  carName: string
  licensePlate: string
  openPassengersSheet: (isOpen: boolean) => void
  openCancelRideSheet: (isOpen: boolean) => void
}

const DriverIncoming: React.FC<DriverIncomingProps> = ({
  timeToArrival,
  carName,
  licensePlate,
  openCancelRideSheet,
  openPassengersSheet
}) => {
  return (
    <View className='pb-0' >
      <View className='flex flex-row justify-between items-center'>
        <View className='flex flex-1 '>
          <Text variant={"subhead"} className='font-bold'>{`Arriving in ${timeToArrival} mins`}</Text>

          <Text variant={"body"} className=''>{` 4 passengers onboard `}</Text>
        </View>
        <View>
          <Text variant={"subhead"} className='font-bold leading-2 tracking-wide'>{` ${licensePlate} `}</Text>
          <Text variant={"body"} >{` ${carName} `}</Text>


        </View>

      </View>


      {/* Avatar perch  */}
      <View className='flex flex-row items-center justify-between mt-3 py-3  '>

        <View className=' flex flex-row items-center gap-x-2 '>

          <Avatar alt="user avatar" className='h-12 w-12 rounded-md' >
            <AvatarImage source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.kLuVl7_2soHqjgecM56X2AHaLL%26pid%3DApi&f=1&ipt=5ce178d3918a2527d8efd01f8162db3ab0581bb1a3fbf60331bd22cbb9f7a5bb&ipo=images" }} resizeMode='cover' className='object-fit' />
            <AvatarFallback>
              <Text>Driver Avatar</Text>
            </AvatarFallback>
          </Avatar>

          <View>

            <Text className='text-foreground font-semibold' variant={"body"}>A. Vernon</Text>
            <View className='flex flex-row items-center '>

              <Text className='text-foreground font-medium' variant={"callout"}>1240 trips</Text>
              <Text className='text-foreground font-medium pr-1' variant={"body"}>(4.8)</Text>
            </View>
          </View>

        </View>


        <View className='flex flex-row  items-end gap-x-4 pr-3.5'>
          <Button variant="ghost" rounded="full" className="bg-primary p-2  flex-row items-center justify-center gap-x-2" onPress={() => { router.push("/map") }}>
            <PhoneOutgoing size={20} className="text-white p-2" />
            {/* <Text variant={"footnote"} className='font-medium'>Call</Text> */}
          </Button>



          <Button variant="ghost" rounded="full" className="bg-primary p-2  flex-row items-center justify-center gap-x-2 ">
            <MessageCircle size={20} className="text-white p-2" />
            {/* <Text variant={"footnote"} className='font-medium'>Chat</Text> */}
          </Button>

          <Button variant="ghost" rounded="full" className="bg-primary p-2  flex-row items-center justify-center gap-x-2 ">
            <ShieldCheck size={20} className="text-white p-2" />
            {/* <Text variant={"footnote"} className='font-medium'>Chat</Text> */}
          </Button>

        </View>


      </View>
      {/* Trip route */}
      <View className=' '>

        <View className='flex  gap-x-2  border border-slate-200 rounded-md pb-2 px-2 pt-1 '>
          <View className='flex flex-row gap-x-2 mt-1 items-center'>

            <View className='bg-primary/80 h-3 w-3 rounded-full '></View>
            {/* </View> */}

            <Text variant={"body"} className='font-semibold pl-1'>Pick-up location</Text>
          </View>

          <View className='flex flex-col '>

            <Text variant="callout" className='text-foreground font-medium  mt-2'>
              1234 Bedford Avenue, Brooklyn, NY,11216
            </Text>
          </View>

        </View>

        <View className='flex  gap-x-2 mt-1  border border-slate-200 rounded-md pb-2 px-2 pt-1 mb-8'>
          <View className='flex flex-row gap-x-2 mt-1 items-center'>

            <View className='bg-red-600/80 h-3 w-3 rounded-full '></View>
            {/* </View> */}

            <Text variant={"body"} className='font-semibold pl-2'>Destination</Text>
          </View>

          <View className='flex flex-col '>

            <Text variant="callout" className='text-foreground font-medium  mt-2'>
              1234 Myrle Drive, Brooklyn, NY,11216
            </Text>
          </View>

        </View>

      </View>

      {/* Cancel && passengers */}
      <View className='flex flex-row items-center gap-2'>
        <Button variant="ghost" rounded="base" className="bg-muted mt-5 flex-1" onPress={() => openPassengersSheet(true)}>
          <Text className='text-center py-3' variant="body">View Passengers </Text>
        </Button>
        <Button variant="destructive" rounded="base" className=" mt-5 flex-1" onPress={() => openCancelRideSheet(true)}>
          <Text variant={"body"} color={"none"} className=' text-white text-center py-3 font-semibold'>Cancel ride</Text>
        </Button>
      </View>

    </View>
  )
}

export default DriverIncoming