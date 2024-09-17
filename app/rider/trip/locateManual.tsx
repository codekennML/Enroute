import { View, Text } from 'react-native'
import React from 'react'
import LocationMapManual from '@/components/custom/selectLocationMapManual'

const locateManual = () => {
    return (


        <LocationMapManual />

    )
}

export default locateManual


// <View style={{ position: "relative", flex: 1 }}>
//     <Animated.View

//         style={[
//             {
//                 position: "absolute",
//                 // flex: 1,
//                 zIndex: 0,
//                 top: 0,
//                 width: "100%",
//                 // height: "100%"
//             },
//             animatedMapHeight
//         ]}
//     >
//         <Map />
//     </Animated.View>

//     <Button variant="ghost" className='absolute top-10 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center z-5 bg-white  '

//         onPress={() => {
//             router?.canGoBack() ? router.back() : router.push({
//                 pathname: "/search",
//                 params: {
//                     type
//                 }
//             })
//         }}
//     >

//         <ArrowLeft size={18} className='text-foreground p-3' />

//     </Button>

//     {/* Drivers prices */}
//     <Animated.View className=' absolute top-20 shadow-sm  overflow-scroll  w-full bg-transparent' style={[
//         {

//             zIndex: 2
//         },
//         animatedPriceCardHeight
//     ]
//     }>


//         {offers?.length > 0 && (
//             <ScrollView horizontal={false} >
//                 {offers.map((offer) => (
//                     <View key={offer.id} className='px-4'>
//                         <DriverPriceCard offer={offer} setAcceptedOffer={setAcceptedOffer} />
//                     </View>
//                 ))}
//             </ScrollView>
//         )}

//     </Animated.View>


//     <Modal
//         visible={isChatModalOpen}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setIsChatModalOpen(false)}
//     >
//         <View style={{
//             flex: 1,
//             // justifyContent: 'center'
//             //   ,
//             alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
//         }}>
//             <View style={{
//                 backgroundColor: 'white', paddingHorizontal: 0, paddingTop: 10
//                 , borderRadius: 0, width: '100%', height: "100%"
//             }}>

//                 <ChatScreen setIsModalOpen={setIsChatModalOpen} />

//             </View>
//         </View>
//     </Modal >


//     <AppBottomSheet
//         // onChange={handleSheetChanges}
//         ref={driverListSheetRef}
//         enablePanDownToClose={false}
//         backdropOpacity={0}
//         enableDynamicSizing={true}
//         enableHandlePanningGesture={true}
//         enableContentPanningGesture={true}
//         pressBehaviour='none'
//         enableTouchThrough={true}
//         handleIndicatorStyle={{
//             backgroundColor: "light-gray",
//             padding: 0,
//             margin: 0
//         }} style={{
//             zIndex: 12
//         }}

//         animatedPosition={animatedPosition}
//         backgroundStyle={{ borderRadius: 10 }}
//         animateOnMount={false}

//     >

//         <BottomSheetScrollView className='w-full px-4' style={{
//             flex: 0,
//             minHeight: "100%",

//         }} >


// <>



//     {sheetScreenToRender === "raiseFare" &&
//         <View className='w-full flex flex-row  items-center '>
//             <View className="flex-1 text-center">
//                 <Text variant={'subhead'} className='text-[18px] text-center text-primary font-semibold'>

//                     {sheetMainText}

//                 </Text>
//                 <Text variant={"callout"} className='font-medium text-center mt-2 px-2 text-muted-foreground dark:text-muted-foregound'>{sheetSubtitle}</Text>
//             </View>



//         </View>

//     }

//     {

//         sheetScreenToRender === "raiseFare" &&
//         <View>
//             <RaiseFare />
//         </View>
//     }
//     {
//         showLoader &&
//         <View className='mb-0'>

//             <View>
//                 <HorizontalLoader onDismiss={() => setShowLoader(false)} />
//             </View>
//         </View>
//     }

//     {
//         sheetScreenToRender === "driverIncoming" && <DriverIncoming timeToArrival={6} carName={'Mercedes Benz GLE 450'} licensePlate={'MA53G7'} openPassengersSheet={openPassengersSheet} openCancelRideSheet={openCancelRideSheet} openChatModal={setIsChatModalOpen} />
//     }


//     {
//         // Driver arrived
//         sheetScreenToRender === "driverArrived" && <DriverArrived timeToArrival={6} carName={'Mercedes Benz GLE 450'} licensePlate={'MA53G7'} openPassengersSheet={openPassengersSheet} openCancelRideSheet={openCancelRideSheet} openChatModal={setIsChatModalOpen} />

//     }

//     {
//         //Driving to destination

//         sheetScreenToRender === "drivingToDestination" && <DestinationDrive />
//     }

//     {
//         // OPEN PASSENGER MODAL

//         <Sheet ref={passengerSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false} pressBehaviour='none' style={{
//             // marginHorizontal: 16, // Adjust margin as needed
//             marginBottom: 12,
//             borderRadius: 16,
//         }}>
//             <View className=' my-5 px-4 fixed'>
//                 <View className='flex-row items-center'>
//                     <Button variant={"ghost"} onPress={() => openPassengersSheet(false)}>
//                         <X size={24} className='text-foreground' />
//                     </Button>
//                     <Text variant={"mediumTitle"} className='flex-1 text-center '>
//                         Riders on this trip
//                     </Text>
//                 </View>
//             </View>

//             <BottomSheetScrollView>
//                 <View >
//                     <Passenger passengers={passengers} />
//                 </View>

//             </BottomSheetScrollView>
//         </Sheet>

//     }

//     {
//         // Cancel ride sheet ref
//         <Sheet ref={cancelRideSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false} pressBehaviour='none' style={{
//             // marginHorizontal: 16, // Adjust margin as needed
//             marginBottom: 12,
//             borderRadius: 16,
//         }}>
//             <View className=' mt-5 px-4 fixed'>
//                 <View className='flex-row items-center'>
//                     <Button variant={"ghost"} onPress={() => openCancelRideSheet(false)}>
//                         <X size={28} className='text-foreground' />
//                     </Button>

//                 </View>
//             </View>

//             <View >
//                 <CancelRide closeSheet={openCancelRideSheet} />
//             </View>


//         </Sheet>

//     }

// </>

//         </BottomSheetScrollView>

//     </AppBottomSheet>



// </View>