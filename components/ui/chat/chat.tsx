import React, { SetStateAction, useRef, useState, Dispatch, useEffect } from 'react';
import { View, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/slices/user";
import { addMessage, selectAllMessages } from "@/redux/slices/messages";
import { sendMessage } from '@/redux/slices/websocket';
import { PhoneOutgoing, Send } from "@/lib/icons/icons"
import { format } from "date-fns";
import { useAppDispatch } from '@/redux/hooks';
import { MessageQuery, useGetChatMessagesQuery } from '@/redux/api/chats';
import { messageSchema } from "@/app/rider/(verification)/schemas/index"
import { ArrowLeft } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { nanoid } from '@reduxjs/toolkit';

type HeaderProps = {
    userName: string,
    avatarUrl: string
} & ChatScreenProps
interface ChatScreenProps {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const Header: React.FC<HeaderProps> = ({ userName, avatarUrl, setIsModalOpen }) => (
    <View className="flex-row justify-between items-center p-4  pt-4 border-b border-slate-200 shadom-blue-100">
        <View className="flex-row items-center gap-x-2">
            <Button variant="ghost" onPress={() => setIsModalOpen(false)}>
                <ArrowLeft size={28} className="text-foreground" />
            </Button>

            <Image
                source={{ uri: avatarUrl }}
                className="w-9 h-9 rounded-full mr-2"
            />
            <Text variant="largeTitle" color="white" className="text-white text-lg">{userName}</Text>
        </View>
        <Button variant="ghost" className="bg-white rounded-full p-2">
            <PhoneOutgoing size={20} className="text-foreground" />
        </Button>
    </View>
);


const EmptyScreen = () => {
    return <>
        <View className='flex-1 items-center mt-1'>

            <Text>Start a new conversation with Anita</Text>
        </View>
    </>
}


const ChatScreen: React.FC<ChatScreenProps> = ({ setIsModalOpen }) => {

    const flashListRef = useRef<FlashList>(null);
    const user = useSelector(selectUserInfo);
    const messages = useSelector(selectAllMessages);
    const dispatch = useAppDispatch();
    const [messageQuery, setMessageQuery] = useState<MessageQuery>({ chatId: "", rideId: "" })
    const [counter, setCounter] = useState(0)


    const { control, handleSubmit, reset } = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            message: ""
        }
    });

    const { data, isFetching, isError } = useGetChatMessagesQuery(messageQuery, {
        skip: !messageQuery?.chatId,
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        if (flashListRef?.current && messages?.length > 0)

            setTimeout(() => {

                flashListRef.current.scrollToEnd({ animated: false, index: messages.length });
            }, 150);

    }, [messages])


    console.log(messages.length)

    const renderMessage = ({ item }) => {

        return (

            <View className={`my-2 mx-4 pr-4   ${item.sentBy === user?._id ? 'items-end' : 'items-start'}`}>
                <View className={`p-1.5 py-2  rounded-lg ${item.sentBy === user?._id ? 'bg-[#0077AA]' : 'bg-gray-100'} flex-col`}>
                    <Text variant="body" className={`${item.sentBy === user?._id ? 'text-white' : 'text-foreground'} font-medium pr-3`}>
                        {item.body}
                    </Text>
                    {/* <View className=' flex-row items-end justify-end pl-3'> */}

                    <Text variant={"caption1"} className={` ${item.sentBy === user?._id ? 'text-white' : 'text-foreground'} text-[11px] font-medium flex- justify-self-end items-end    `}>
                        {format(JSON.parse(item.sentAt), "HH:mm")}
                    </Text>
                    {/* </View> */}
                </View>

            </View>
        )
    }

    console.log(messages)

    const onSubmit = (data) => {


        setCounter(prev => prev + 1)

        console.log(data)


        dispatch(sendMessage({
            body: data.message,
            sentBy: "123234555",
            sentAt: JSON.stringify(new Date()),
            rideId: "2345676543",
            tempId: nanoid(),
            chatId: "ggtfhssyssjjjsjjss"
        }));


        reset({ message: "" });
    };

    console.log(messages, messages)

    if (isError) {
        return <Text>Error loading messages</Text>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }} className='flex-1'>
            <View className="flex-1 bg-white">
                <Header userName={`${user?.firstName} ${user?.lastName}` || "User"} avatarUrl={user?.avatar || "https://images.airtasker.com/v7/https://seo-assets.airtasker.com/en_AU/1670924334504_avatar-placeholder-240x240.png?w=80&h=80"} setIsModalOpen={setIsModalOpen} />

                <View className='my-2 mt-4 items-center sticky'>
                    <Text variant={"footnote"} className='text-center font-semibold w-max p-2 px-4 bg-gray-100 rounded-full'>{format(new Date(), "PPP")}</Text>

                </View>
                {isFetching && messages?.length !== 0 && (
                    <Text>Loading messages...</Text>
                )
                }
                {
                    messages?.length > 0 &&
                    (
                        <FlashList
                            ref={flashListRef}
                            data={messages}
                            renderItem={renderMessage}
                            estimatedItemSize={50}
                            keyExtractor={(item) => {
                                console.log(item)
                                return item?.id ? item.id : item.tempId!
                            }
                            }
                        />
                    )
                }

                {
                    !messages || messages?.length === 0 && <EmptyScreen />
                }


                <View className="flex-row items-center p-4 border-t border-gray-200">
                    <Controller
                        name="message"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
                                placeholder="Type a message"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    <Button variant="default" onPress={handleSubmit(onSubmit)} className="bg-foreground rounded-full p-2">
                        <Send size={20} color="white" className='text-white' />
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;