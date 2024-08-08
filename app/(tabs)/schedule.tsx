import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { Text } from "@/components/ui/text"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CircleCheck, SlidersHorizontal, } from '@/lib/icons/icons';
import { Skeleton } from '@/components/ui/skeleton';

interface DriverSchedule {
  id: string;
  driverName: string;
  avatarUrl: string;
  rating: number;
  carType: string;
  destination: string;
  closestStop: string;
  takeoffTime: string;
  amountRange: string;
  availableSeats: number;
}

const renderCardSkeletons = (count: number) => {
  return Array(count).fill(6).map((_, index) => (
    <CardLoader key={`skeleton-${index}`} />
  ))
}


const CardLoader = () => {

  return (
    <View className='p-4 shadow-md'>
      <View>
        <Skeleton className=" h-12 rounded" />
      </View>
      <View className='my-3'>
        <Skeleton className="h-5 my-2 rounded" />
        <Skeleton className="h-5 rounded" />
      </View>
      <View className='flex flex-row justify-between items-center '>
        <View className='w-1/2'>
          <Skeleton className="w-full h-5 rounded-md" />
          <Skeleton className="w-4/5 h-5  mt-3" />
        </View>
        <View>
          <Skeleton className="w-12 h-10 " />
        </View>
      </View>
    </View>
  )
}


// const renderSkeletons = (count : number) => {
// <SafeAreaView className=" bg-gray-100">
//   <View className='flex flex-row justify-between'>
//     <Skeleton className="w-20 h-6" />
//     <Skeleton className="w-14 h-6" />
//   </View>
//   <View className='flex-row justify-evenly'>
//     <Skeleton className="w-8 h-6" />
//     <Skeleton className="w-8 h-6" />
//     <Skeleton className="w-8 h-6" />
//     <Skeleton className="w-8 h-6" />
//     <Skeleton className="w-8 h-6" />
//     <Skeleton className="w-8 h-6" />
//   </View>

//   <View>

//     renderCardSkeletons(count)

//   </View>
// </SafeAreaView>

// }

const dummySchedules: DriverSchedule[] = [
  {
    id: '1',
    driverName: 'John Doe',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.8,
    carType: 'Sedan',
    destination: 'Downtown',
    closestStop: 'Central Station',
    takeoffTime: '08:30 AM',
    amountRange: '$1,000',
    availableSeats: 3,
  },
  {
    id: '2',
    driverName: 'Jane Smith',
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 4.5,
    carType: 'SUV',
    destination: 'Uptown',
    closestStop: 'Park Avenue',
    takeoffTime: '09:00 AM',
    amountRange: '$12-$18',
    availableSeats: 2,
  },
  {
    id: '3',
    driverName: 'Michael Brown',
    avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 4.7,
    carType: 'Coupe',
    destination: 'Airport',
    closestStop: 'Main Terminal',
    takeoffTime: '09:30 AM',
    amountRange: '$20-$25',
    availableSeats: 4,
  },
  {
    id: '4',
    driverName: 'Emily Davis',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 4.6,
    carType: 'Minivan',
    destination: 'Shopping Mall',
    closestStop: 'Mall Entrance',
    takeoffTime: '10:00 AM',
    amountRange: '$8-$12',
    availableSeats: 5,
  },
  {
    id: '5',
    driverName: 'Robert Wilson',
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    rating: 4.9,
    carType: 'Convertible',
    destination: 'Beach',
    closestStop: 'Beachfront',
    takeoffTime: '10:30 AM',
    amountRange: '$15-$20',
    availableSeats: 2,
  },
  {
    id: '6',
    driverName: 'Jessica Martinez',
    avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 4.4,
    carType: 'Hatchback',
    destination: 'University',
    closestStop: 'Campus Gate',
    takeoffTime: '11:00 AM',
    amountRange: '$1000-$1500',
    availableSeats: 3,
  },
  {
    id: '7',
    driverName: 'David Garcia',
    avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    rating: 4.6,
    carType: 'Pickup Truck',
    destination: 'Suburbs',
    closestStop: 'Suburban Plaza',
    takeoffTime: '11:30 AM',
    amountRange: '$13-$17',
    availableSeats: 4,
  },
  {
    id: '8',
    driverName: 'Sarah Wilson',
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    rating: 4.7,
    carType: 'Luxury Sedan',
    destination: 'City Center',
    closestStop: 'Main Square',
    takeoffTime: '12:00 PM',
    amountRange: '$18-$25',
    availableSeats: 2,
  },
  {
    id: '9',
    driverName: 'Daniel Lee',
    avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    rating: 4.3,
    carType: 'Station Wagon',
    destination: 'Cultural District',
    closestStop: 'Cultural Park',
    takeoffTime: '12:30 PM',
    amountRange: '$10-$14',
    availableSeats: 3,
  },
  {
    id: '10',
    driverName: 'Laura Hernandez',
    avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
    rating: 4.8,
    carType: 'Sports Car',
    destination: 'Nightlife Area',
    closestStop: 'Nightclub Street',
    takeoffTime: '01:00 PM',
    amountRange: '$22-$28',
    availableSeats: 1,
  },
];



const ScheduleList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true)
  const [schedules, setSchedules] = useState<typeof dummySchedules>([])

  const weekDays = useMemo(() => {
    const days = [];
    const startDay = startOfWeek(new Date());
    for (let i = 0; i < 7; i++) {
      days.push(addDays(startDay, i));
    }
    return days;
  }, []);

  useEffect(() => {

    setTimeout(() => {

      setSchedules(dummySchedules)
      setIsLoading(false);
    }, 3000)

  }, [schedules])



  const renderDateItem = useCallback((day: Date) => (
    <Button
      key={format(day, 'yyyy-MM-dd')}
      className={`items-center mx-2 py-2 px-3 rounded-md ${isSameDay(selectedDate, day) ? 'bg-blue-200' : 'bg-accent'
        }`}
      onPress={() => setSelectedDate(day)}
    >
      <Text className={`text-xs ${isSameDay(selectedDate, day) ? 'text-white' : 'text-foreground'}`}>
        {format(day, 'EEE')}
      </Text>
      <Text className={`text-md font-bold ${isSameDay(selectedDate, day) ? 'text-white' : 'text-gray-800'}`}>
        {format(day, 'd')}
      </Text>
    </Button>
  ), [selectedDate]);

  const renderScheduleItem: ListRenderItem<DriverSchedule> = useCallback(({ item }) => (
    <View className="bg-white rounded-lg   shadow-md p-4 mb-2">
      <View className="flex-row items-center mb-1   pb-2">

        <View className="flex-1">

          <View className=' flex flex-row items-center gap-x-2 '>
            <View className='rrelative'>
              <Avatar alt="user avatar" className='h-14 w-14 rounded-full' >
                <AvatarImage source={{ uri: item.avatarUrl }} resizeMode='cover' className='object-fit' />
                <AvatarFallback>
                  <Text>Driver Avatar</Text>
                </AvatarFallback>
              </Avatar>

              <View className='bg-primary absolute right-1 -bottom-2 rounded-full'>
                <CircleCheck className='text-white' size={20} />
              </View>

            </View>

            <View>

              <Text className='text-foreground font-semibold' variant={"body"}>{item.driverName}</Text>
              <View className='flex flex-row items-center gap-x-1 '>

                <Ionicons name='star' size={14} color={"#F4CD52"} />
                <Text className='text-foreground font-medium pr-1' variant={"body"}>{item.rating.toFixed(1)} </Text>
                {/* <Text className='text-green-500 '>Verified</Text> */}

              </View>
            </View>

          </View>
        </View>
        <View>
          {/* <Text variant={"mediumTitle"} className="text-foreground">{item.amountRange}</Text> */}
          <Text variant={"smallTitle"} className="text-foreground">{item.takeoffTime}</Text>

        </View>
      </View>

      <View className=" pt-1">

        <View className='flex  gap-x-2  rounded-md pb-0.5  pt-1 '>
          <View className='flex flex-row items-center gap-x-2'>

            <View className='flex flex-row gap-x-1  items-start'>

              {/* <Compass size={18} className="text-red-500" /> */}
              <View className='w-3 h-3 p-1 bg-blue-500 rounded-full'></View>
              {/* <Text variant={"body"} className='font-bold'>{item.takeoffTime}</Text> */}
            </View>

            <View className='flex flex-col '>
              {/* <Text variant={"callout"} className='  text-semibold text-foreground/60 '>Start Location</Text> */}
              <Text variant="body" className='text-foreground/60 font-medium  '>
                1234 Bedford Avenue, Brooklyn, NY,11216
              </Text>
            </View>

          </View>
        </View>
        <View className='flex  gap-x-2  rounded-md pt-0.5   '>
          <View className='flex flex-row items-center gap-x-2'>

            <View className='flex flex-row gap-x-1  items-center'>

              {/* <MapPin size={18} className="text-green-500" /> */}
              <View className='w-3 h-3 p-1 bg-red-500 rounded-full'></View>
              {/* <Text variant={"body"} className='font-bold'>{item.takeoffTime}</Text> */}
            </View>

            <View className='flex flex-col '>
              {/* <Text variant={"callout"} className=' pl-1 text-semibold text-foreground/60 '>Destination</Text> */}
              <Text variant="callout" className='text-foreground/60 font-medium '>
                1234 Bedford Avenue, Brooklyn, NY,11216
              </Text>
            </View>

          </View>
        </View>


        {/* <Text className="text-base font-medium mb-1">To: {item.destination}</Text>
        <Text className="text-sm text-gray-600 mb-1">Closest Stop: {item.closestStop}</Text> */}

        <View className="flex-row justify-between items-center mt-4">
          <View className=" ">
            <Text className="text-sm text-foreground">{item.availableSeats} available seats</Text>
            <Text variant={"callout"} className="text-foreground ">Mercedes Benz GLE 450</Text>
          </View>
          <Button rounded={"base"} className="py-2 px-4">
            <Text className="text-white font-medium">Join</Text>
          </Button>
        </View>
      </View>
    </View>
  ), []);


  return (


    <SafeAreaView className=" bg-gray-100">
      <View className='pt-4 px-4  flex-row items-center justify-between'>
        <Text className='text-[24px] font-semibold font-header'>Schedule</Text>
        {/* <Text className='text-[28px] font-semibold '>Ride along</Text> */}
        <Button variant={"ghost"} rounded={"base"} className='py-1.5 px-4 bg-accent  flex-row items-center gap-x-2'>
          <SlidersHorizontal size={18} className='text-foreground' />
          <Text variant={"subhead"} className='font-semibold'>Filters</Text>
        </Button>
      </View>
      <View className="py-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 2 }}
        >
          {weekDays.map(renderDateItem)}
        </ScrollView>
      </View>

      <View className='h-full pb-20'>
        {isLoading ? (
          renderCardSkeletons(6)
        ) : (
          // <View className=' pb-20'>
          <FlashList<DriverSchedule>
            data={dummySchedules}
            renderItem={renderScheduleItem}
            estimatedItemSize={10}
            contentContainerStyle={{ padding: 16 }}
          />
          // </View>
        )}
      </View>
      <Button
        className="absolute bottom-6 right-6 bg-blue-500 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        onPress={() => console.log('Request Ride')}
      >
        <Ionicons name="add" size={30} color="white" />
      </Button>
    </SafeAreaView>
  )
}

export default ScheduleList;