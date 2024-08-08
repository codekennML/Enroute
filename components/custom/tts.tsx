<AppBottomSheet
    // onChange={handleSheetChanges}
    ref={driverListSheetRef}
    enablePanDownToClose={false}
    backdropOpacity={0}
    enableDynamicSizing={true}
    enableHandlePanningGesture={true}
    enableContentPanningGesture={true}
    pressBehaviour='none'
    enableTouchThrough={true}
    handleIndicatorStyle={{
        backgroundColor: "light-gray",
        padding: 0,
        margin: 0
    }} style={{
        zIndex: 12
    }}

    animatedPosition={animatedPosition}
    backgroundStyle={{ borderRadius: 10 }}
    animateOnMount={false}

>

    <BottomSheetScrollView className='w-full px-4' style={{
        flex: 0,
        minHeight: "100%",

    }} >


        <>


            {
                showLoader &&
                <View className='mb-3'>

                    <View>
                        <HorizontalLoader onDismiss={() => setShowLoader(false)} />
                    </View>
                </View>
            }
            {sheetScreenToRender === "raiseFare" &&
                <View className='w-full flex flex-row  items-center '>
                    <View className="flex-1 text-center">
                        <Text variant={'smallTitle'} className='text-[18px] text-center text-primary' style={{ color: "#007AFF" }}>

                            {sheetMainText}

                        </Text>
                        <Text variant={"callout"} className='font-medium text-center mt-1 px-2'>{sheetSubtitle}</Text>
                    </View>



                </View>

            }

            {

                sheetScreenToRender === "raiseFare" &&
                <View>
                    <RaiseFare />
                </View>
            }

            {/* 
        {
            sheetScreenToRender === "driverIncoming" && <DriverIncoming timeToArrival={6} carName={'Mercedes Benz GLE 450'} licensePlate={'MA53G7'} openPassengersSheet={openPassengersSheet} openCancelRideSheet={openCancelRideSheet} />
        } */}


            {
                // Driver arrived
                sheetScreenToRender === "driverArrived" && <DriverArrived timeToArrival={6} carName={'Mercedes Benz GLE 450'} licensePlate={'MA53G7'} openPassengersSheet={openPassengersSheet} openCancelRideSheet={openCancelRideSheet} />

            }

            {
                //Driving to destination

                sheetScreenToRender === "driverIncoming" && <DestinationDrive />
            }

            {
                // OPEN PASSENGER MODAL

                <Sheet ref={passengerSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false} pressBehaviour='none' style={{
                    // marginHorizontal: 16, // Adjust margin as needed
                    marginBottom: 12,
                    borderRadius: 16,
                }}>
                    <View className=' my-5 px-4 fixed'>
                        <View className='flex-row items-center'>
                            <Button variant={"ghost"} onPress={() => openPassengersSheet(false)}>
                                <X size={24} className='text-foreground' />
                            </Button>
                            <Text variant={"mediumTitle"} className='flex-1 text-center '>
                                Riders on this trip
                            </Text>
                        </View>
                    </View>

                    <BottomSheetScrollView>
                        <View >
                            <Passenger passengers={passengers} />
                        </View>

                    </BottomSheetScrollView>
                </Sheet>

            }

            {
                // Cancel ride sheet ref 
                <Sheet ref={cancelRideSheetRef} detached={true} snapPoints={["100%"]} enablePanDownToClose={false} pressBehaviour='none' style={{
                    // marginHorizontal: 16, // Adjust margin as needed
                    marginBottom: 12,
                    borderRadius: 16,
                }}>
                    <View className=' mt-5 px-4 fixed'>
                        <View className='flex-row items-center'>
                            <Button variant={"ghost"} onPress={() => openCancelRideSheet(false)}>
                                <X size={28} className='text-foreground' />
                            </Button>

                        </View>
                    </View>

                    <View >
                        <CancelRide closeSheet={openCancelRideSheet} />
                    </View>


                </Sheet>

            }

        </>

    </BottomSheetScrollView>

</AppBottomSheet>

