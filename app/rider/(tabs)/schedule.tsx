import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { Text } from "@/components/ui/text"
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronDown, CircleCheck, Search, SlidersHorizontal, X, Receipt, CalendarDays, CalendarClock, Clock, MapPin } from '@/lib/icons/icons';
import { Skeleton } from '@/components/ui/skeleton';
import { COLOR_THEME } from '@/lib/constants';
import { Sheet, useSheetRef } from '@/components/ui/sheets';
import ScheduleFilters from '@/components/custom/scheduleFilters';
import { router } from 'expo-router';
import { locations } from '@/components/constants/predictions';
import { Location } from '@/types/types';
import { addRideRiders, setDestination, setOrigin, setTripType, updateOtherTripData } from '@/redux/slices/search';
import user, { selectUserInfo } from '@/redux/slices/user';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks';

interface DriverSchedule {
  id: string;
  driverName: string;
  avatarUrl: string;
  rating: number;
  carType: string;
  destination: Location
  origin: Location,
  // closestStop: string;
  takeoffTime: string;
  amountRange: string;
  availableSeats: number;
}

const renderCardSkeletons = (count: number) => {
  return Array(count).fill(6).map((_, index) => (
    <CardLoader key={`skeleton-${index}`} />
  ))
}


const FilterScreen = () => {


  const filterSheetRef = useSheetRef()

  return <View className='px-4 pb-2 border-b border-slate-200'>
    <View className='flex flex-row justify-between items-center'>
      <Text variant="subhead" className='text-muted-foreground font-medium'>Top rides near you</Text>
      <Button variant="ghost" size="sm" className="relative flex flex-row items-center justify-center px-4 mr-1.5 rounded-md  w-24 border border-slate-200 p-1" onPress={() => filterSheetRef.current?.present()}>
        <View className='flex-row items-center gap-x-3'>

          <SlidersHorizontal size={16} className='font-bold dark:text-foreground ' />

          <Text variant="callout" color="primary"
            className='font-medium dark:text-foreground'>Filters</Text>
        </View>

      </Button>
    </View>


    <Sheet ref={filterSheetRef}
      snapPoints={["100%"]}
      // enableDismissOnClose={false}
      // enableDynamicSizing={true}
      enableContentPanningGesture={false}
      enablePanDownToClose={false}
      enableHandlePanningGesture={false}
    >
      <View className="pb-4 w-full">
        <View className='flex flex-row items-center justify-end px-4 mt-2 bg-red-200 '>
          <Button variant={"ghost"} className='flex-row items-center justify-center' onPress={() => filterSheetRef.current?.close()}>

            <X size={24} className='text-foreground ml-auto' />
          </Button>
          <Text className="text-foreground font-medium flex-1 text-center" variant="callout">Filters </Text>
        </View>
        <View className='mt-3 gap-y-4 px-4'>
          <ScheduleFilters />
        </View>
      </View>
    </Sheet>

  </View>
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




const dummySchedules: DriverSchedule[] = [
  {
    id: '1',
    driverName: 'John Doe',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.8,
    carType: 'Sedan',
    destination: locations[0],
    origin: locations[1],
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
    destination: locations[1],
    origin: locations[0],
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
    destination: locations[2],
    origin: locations[3],
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
    destination: locations[1],
    origin: locations[5],
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
    destination: locations[3],
    origin: locations[4],
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
    destination: locations[2],
    origin: locations[1],
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
    destination: locations[7],
    origin: locations[4],
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
    destination: locations[9],
    origin: locations[6],
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
    destination: locations[8],
    origin: locations[5],
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
    destination: locations[6],
    origin: locations[0],
    takeoffTime: '01:00 PM',
    amountRange: '$22-$28',
    availableSeats: 1,
  },
];


const ScheduleList: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(selectUserInfo)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true)
  const [schedules, setSchedules] = useState<typeof dummySchedules>([])

  const weekDays = useMemo(() => {
    const days = [];
    const startDay = new Date();
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



  const handleScheduleBooking = (item: DriverSchedule) => {

    dispatch(setTripType("reset"))
    dispatch(addRideRiders([{ id: user._id, firstName: user?.firstName, lastName: user?.lastName, mobile: user.mobile, countryCode: user?.countryCode, added: true }]))
    dispatch(setOrigin(item.origin))
    dispatch(setDestination(item.destination))
    dispatch(updateOtherTripData({ when: JSON.stringify(new Date()) }))


    router.push({
      pathname: "/summary"
    })

  }

  const renderDateItem = useCallback((day: Date) => (
    <Button
      key={format(day, 'yyyy-MM-dd')}
      className={`items-center mx-2 py-2 px-3 rounded-md ${isSameDay(selectedDate, day) ? 'bg-primary' : 'bg-accent'
        }`}
      onPress={() => setSelectedDate(day)}
    >
      <Text className={`text-xs ${isSameDay(selectedDate, day) ? 'text-white dark:text-white' : 'text-foreground'}`}>
        {format(day, 'EEE')}
      </Text>
      <Text className={`text-md font-bold ${isSameDay(selectedDate, day) ? 'text-white dark:text-white ' : 'text-foreground'}`}>
        {format(day, 'd')}
      </Text>
    </Button>
  ), [selectedDate]);

  // const renderScheduleItem: ListRenderItem<DriverSchedule> = useCallback(({ item }) => (
  //   <View className="bg-white rounded-lg   shadow-md p-4 mb-2">

  //     <View className=" pt-1">

  //       <View className='flex  gap-x-2  rounded-md pb-0.5  pt-1 '>
  //         <View className='flex flex-row items-center gap-x-2'>

  //           <View className='flex flex-row gap-x-1  items-start'>

  //             {/* <Compass size={18} className="text-red-500" /> */}
  //             <View className='w-3 h-3 p-1 border  border-blue-500 rounded-full'></View>
  //             {/* <Text variant={"body"} className='font-bold'>{item.takeoffTime}</Text> */}
  //           </View>

  //           <View className='flex flex-col '>
  //             {/* <Text variant={"callout"} className='  text-semibold text-foreground/60 '>Start Location</Text> */}
  //             <Text variant="callout" className='text-foreground/60   '>
  //               1234 Bedford Avenue, Brooklyn, NY,11216
  //             </Text>
  //           </View>

  //         </View>
  //       </View>
  //       <View className='flex  gap-x-2  rounded-md pt-0.5   '>
  //         <View className='flex flex-row items-center gap-x-2'>

  //           <View className='flex flex-row gap-x-1  items-center'>

  //             {/* <MapPin size={18} className="text-green-500" /> */}
  //             <View className='w-3 h-3 p-1 border border-red-500 rounded-full'></View>
  //             {/* <Text variant={"body"} className='font-bold'>{item.takeoffTime}</Text> */}
  //           </View>

  //           <View className='flex flex-col '>
  //             {/* <Text variant={"callout"} className=' pl-1 text-semibold text-foreground/60 '>Destination</Text> */}
  //             <Text variant="callout" className='text-foreground/60  '>
  //               1234 Bedford Avenue, Brooklyn, NY,11216
  //             </Text>
  //           </View>

  //         </View>
  //       </View>


  //       {/* <Text className="text-base font-medium mb-1">To: {item.destination}</Text>
  //       <Text className="text-sm text-gray-600 mb-1">Closest Stop: {item.closestStop}</Text> */}

  //       <View className="flex-row justify-between items-center mt-4">
  //         <View className=" ">
  //           <Text variant={"callout"} className="text-foreground">{item.availableSeats} available seats</Text>
  //           <Text variant={"callout"} className="text-foreground ">Mercedes Benz GLE 450</Text>
  //         </View>
  //         <Button rounded={"base"} className="py-2 px-4">
  //           <Text className="text-white font-medium" style={{ color: "#fff" }}>Join</Text>
  //         </Button>
  //       </View>
  //     </View>

  //     <View className="flex-row items-center mb-1   pb-2">

  //       <View className="flex-1">

  //         <View className=' flex flex-row items-center gap-x-2 '>
  //           <View className='relative'>
  //             <Avatar alt="user avatar" className='h-10 w-10 rounded-full' >
  //               <AvatarImage source={{ uri: item.avatarUrl }} resizeMode='cover' className='object-fit' />
  //               <AvatarFallback>
  //                 <Text>Driver Avatar</Text>
  //               </AvatarFallback>
  //             </Avatar>

  //             <View className='bg-primary absolute right-1 -bottom-2 rounded-full'>
  //               <CircleCheck className='text-white' size={16} />
  //             </View>

  //           </View>
  //           {/* 
  //           <View>
  //             <View className='flex flex-row items-center gap-x-1 '>

  //               <Ionicons name='star' size={14} color={"#F4CD52"} />
  //               <Text className='text-foreground font-medium pr-1' variant={"body"}>{item.rating.toFixed(1)} </Text>

  //             </View>
  //           </View> */}

  //         </View>
  //       </View>
  //       <View>
  //         <Text variant={"mediumTitle"} className="text-foreground">{item.amountRange}</Text>
  //         <Text variant={"smallTitle"} className="text-foreground">{item.takeoffTime}</Text>

  //       </View>
  //     </View>


  //   </View>
  // ), []);



  const renderScheduleItem: ListRenderItem<DriverSchedule> = useCallback(({ item }) => (
    <Button onPress={() => handleScheduleBooking(item)} variant={"ghost"} className="rounded-lg shadow bg-white  p-4 mb-4  ">

      <View className="mb-2">

        <View className='flex-row gap-x-2 items-center'>
          <View className='h-2 w-2 rounded-full bg-destructive'></View>
          <Text variant="body" className="font-semibold ">
            1234 Bedford Avenue, Brooklyn, NY,11216
            {/* Ride to Eti-osa - 8 A.M */}
          </Text>

        </View>
      </View>
      <View className="space-y-1 mb-1">
        <View className="flex-row items-center gap-x-2">
          <MapPin size={18} className="text-foreground/60" />
          <Text variant="body" className="text-foreground dark:text-foreground"> 1234 Bedford Avenue, Brooklyn, NY,11216</Text>
        </View>
        <View className="flex-row items-center gap-x-2">
          <MapPin size={18} className="text-foreground/60" />
          <Text variant="body" className="dark:text-foreground">{item.carType} {`2km away`}</Text>
        </View>
        <View className='flex-row justify-between'>
          <View>

            <View className="flex-row items-center gap-x-2">
              <CalendarClock size={18} className="text-foreground/60" />
              <Text variant="body" className="text-foreground dark:text-foreground">03 seats left</Text>
            </View>
            {/* <View className="flex-row items-center gap-x-2">
             <Clock size={18} className="text-foreground/60" />
              <Text variant="body" className="text-foreground d ark:text-foreground">2:30 PM</Text>
            </View> */}
          </View>
          <View className='flex-col items-end'>
            <Image source={{ uri: item.avatarUrl }} resizeMode='cover' className='rounded-full h-12 w-12' />
          </View>
        </View>
      </View>
      <View className='flex flex-row justify-between ' >
        <Text variant="subhead" className="font-bold  dark:text-primary text-primary ">
          {item.amountRange}
        </Text>



      </View>
    </Button>


  ), []);


  return (


    <SafeAreaView style={{ flex: 1 }} className=" bg-gray-100">
      <View className='pt-4 px-4  flex-row items-center justify-between'>
        <Text className='text-[24px] font-semibold font-header'>Schedule</Text>
        {/* <Text className='text-[28px] font-semibold '>Ride along</Text> */}
        <Button variant={"ghost"} rounded={"base"} className=' mr-3 bg-accent  flex-row items-center gap-x-2'>
          <CalendarDays size={24} className='text-foreground dark:text-muted-foregorund' />
          {/* <Text variant={"subhead"} className='font-semibold'>Filters</Text> */}
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
        <FilterScreen />
      </View>

      <View className='h-full pb-2'>
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