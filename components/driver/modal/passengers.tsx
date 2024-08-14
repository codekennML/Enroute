import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Image, Alert, Linking, Modal } from 'react-native';
import { Text } from '@/components/ui/text';
import { MessageCircleMore, PhoneOutgoing, Star } from '@/lib/icons/icons';
import { FlashList } from "@shopify/flash-list";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '@/redux/slices/user';
import { Button } from '@/components/ui/button';
import ChatScreen from '../chat/chat';

export interface Passenger {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    pickupPoint: string;
    destination: string;
    joinedDate: string;
    boardedAt: Date;
    mobile: string,
    countryCode: number
}

interface PassengerItemProps {
    callRider: (string) => void
    passenger: Passenger,
    setIsChatModalOpen: Dispatch<SetStateAction<boolean>>
    setPassengerToChatData: Dispatch<SetStateAction<Passenger | undefined>>
}

interface PassengerListProps {
    passengers: Passenger[]
}

const PassengerItem: React.FC<PassengerItemProps> = ({ passenger, setIsChatModalOpen, setPassengerToChatData, callRider }) => {



    const userInfo = useSelector(selectUserInfo)

    const { role } = userInfo


    const handleChatRider = () => {
        console.log("Ego", passenger)
        setPassengerToChatData(passenger)
        setIsChatModalOpen(true)
    }



    return (
        <View className="flex-row bg-white rounded-lg p-4 m-2 mb-3 border border-slate-200 ">


            <View className="flex-1">
                <View className="flex-row justify-between items-center mb-2">
                    <View className='flex-row items-center gap-x-2'>
                        <Avatar alt="user avatar" className='h-12 w-12' >
                            <AvatarImage source={{ uri: passenger.avatar }} />
                            <AvatarFallback>
                                <Text>User Avatar</Text>
                            </AvatarFallback>
                        </Avatar>
                        <View>
                            <Text variant={'body'} className="font-semibold">{passenger.name}</Text>
                            <View className="flex-row items-center">
                                <Star size={16} color="#FFD700" fill="#FFD700" />
                                <Text className="ml-1 text-base font-medium">{passenger.rating.toFixed(1)}</Text>
                            </View>

                        </View>
                    </View>

                    <Button variant={"ghost"} className='flex-row items-center justify-center px-3 h-10 text-blue-50 bg-accent' rounded="full" >
                        <Text className='text-destructive-foreground font-medium' color={"light"} style={{ color: "red" }}>Cancel</Text>
                    </Button>
                </View>
                <View className='flex flex-col gap-y-1 '>
                    <Text variant={"body"} className='font-semibold text-primary-foreground'>Pick-up location</Text>
                    <Text variant="callout" className='text-foreground font-medium'>
                        {passenger.pickupPoint}
                    </Text>
                </View>


                {/* <Text variant={"body"} className="font-semibold mt-1">Destination</Text>
                <Text variant={"callout"} className="mb-1">{passenger.destination}</Text> */}
                <View className="flex-row  justify-between mt-4  ">
                    <View className='flex flex-row  items-end gap-x-4'>
                        <Button size={"sm"} variant="ghost" rounded="full" className="px-3  h-10 flex-row items-center justify-center gap-x-1 bg-accent" onPress={() => callRider(`${passenger?.countryCode}${passenger?.mobile}`)}>
                            <PhoneOutgoing size={20} className="text-primary p-1" />
                            <Text variant={"footnote"} className='font-semibold' style={{
                                color: "#007AFF"
                            }}>Call</Text>
                        </Button>


                        <Button
                            onPress={handleChatRider}
                            variant="ghost" size={"sm"} rounded="full" className="px-2 h-10  flex-row items-center justify-center gap-x-1 bg-accent ">
                            <MessageCircleMore size={20} className=" text-primary" />
                            <Text variant={"footnote"} className='font-semibold' style={{
                                color: "#007AFF"
                            }}>Chat</Text>
                        </Button>


                    </View>


                    <View>
                        {/* <Text variant={"callout"} className="">Boarded </Text>
                        <Text variant={"body"} className='font-semibold'>
                          
                            9:15 AM
                        </Text> */}

                        <Button
                            //  onPress={
                            //     // () => openChatModal(true)
                            // } 

                            variant="ghost" size={"sm"} rounded="full" className="px-4 h-10  flex-row items-center justify-center gap-x-1  bg-primary">

                            <Text variant={"footnote"} className='font-semibold' style={{
                                color: "#FFF"
                            }}>Start ride</Text>
                        </Button>



                    </View>


                </View>
            </View>
        </View>
    );
};

const PassengerList: React.FC<PassengerListProps> = ({ passengers }) => {
    console.log(passengers?.length, "Passenger")

    const [isChatModalOpen, setIsChatModalOpen] = useState(false)
    const [passengerToChat, setPassengerToChat] = useState<Passenger>()

    const callRider = (phoneNumber: string) => {

        const url = `tel:+${phoneNumber}`;

        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    Alert.alert('Error', 'Phone call is not supported on this device');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };


    return (
        <>

            <FlashList
                data={passengers}
                renderItem={({ item }) => <PassengerItem passenger={item} setIsChatModalOpen={setIsChatModalOpen} setPassengerToChatData={setPassengerToChat} callRider={callRider} />}
                keyExtractor={(item) => item.id}
                contentContainerClassName="p-4"
                estimatedItemSize={20}
            />


            <Modal
                visible={isChatModalOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsChatModalOpen(false)}
            >
                <View style={{
                    flex: 1,
                    // justifyContent: 'center'
                    //   , 
                    alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                        backgroundColor: 'white', paddingHorizontal: 0, paddingTop: 10
                        , borderRadius: 0, width: '100%', height: "100%"
                    }}>

                        <ChatScreen setIsModalOpen={setIsChatModalOpen} receiver={passengerToChat} callRider={callRider} />

                    </View>
                </View>
            </Modal >
        </>
    );
};

export default PassengerList;