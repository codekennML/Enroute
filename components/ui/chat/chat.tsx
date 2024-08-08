import React, { useRef } from 'react';
import { View, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Text } from '@/component/ui/text';
import { Button } from '@/component/ui/button';
import { Input } from '@/component/ui/input';
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/slices/user";
import { selectAllMessages } from "@/redux/slices/messages";
import { sendMessage } from '@/redux/slices/websocket';
import { PhoneOutgoing } from "@/lib/icons/icons"
import { format } from "date-fns";
import { useAppDispatch } from '@/redux/hooks';
import { useGetChatMessagesQuery } from '@/redux/api/chats';
import { messageSchema } from "@/verification/schema"

const Header = ({ userName, avatarUrl }) => (
    <View className="flex-row justify-between items-center p-4 bg-[#0077AA]">
        <View className="flex-row items-center">
            <Image
                source={{ uri: avatarUrl }}
                className="w-10 h-10 rounded-full mr-3"
            />
            <Text variant="bold" className="text-white text-lg">{userName}</Text>
        </View>
        <Button variant="icon" className="bg-white rounded-full p-2">
            <PhoneOutgoing size={20} color="#0077AA" />
        </Button>
    </View>
);





const ChatScreen = () => {
    const flashListRef = useRef(null);
    const user = useSelector(selectUserInfo);
    const messages = useSelector(selectAllMessages);
    const dispatch = useAppDispatch();

    const { control, handleSubmit, reset } = useForm({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            message: ""
        }
    });

    const { data, isFetching, isError } = useGetChatMessagesQuery(undefined, {
        refetchOnMountOrArgChange: true
    });


    const renderMessage = ({ item }) => (
        <View className={`my-2 mx-4 ${item.sentBy === user?.id ? 'items-end' : 'items-start'}`}>
            <View className={`p-3 rounded-lg ${item.sentBy === user?.id ? 'bg-[#0077AA]' : 'bg-gray-200'}`}>
                <Text className={`${item.sentBy === user?.id ? 'text-white' : 'text-[#134071]'}`}>
                    {item.text}
                </Text>
            </View>
            <Text variant="small" className="text-gray-500 mt-1">
                {format(new Date(item.date), "HH:mm")}
            </Text>
        </View>
    );

    const onSubmit = (data) => {

        dispatch(sendMessage({
            body: data.message,
            sentBy: user.id,
            date: new Date().toDateString()
        }));


        reset({ message: "" });
    };

    if (isError) {
        return <Text>Error loading messages</Text>;
    }

    return (
        <View className="flex-1 bg-white">
            <Header userName={`${user?.firstName} ${user?.lastName}` || "User"} avatarUrl={user?.avatar || "https://images.airtasker.com/v7/https://seo-assets.airtasker.com/en_AU/1670924334504_avatar-placeholder-240x240.png?w=80&h=80"} />
            {isFetching ? (
                <Text>Loading messages...</Text>
            ) : (
                <FlashList
                    ref={flashListRef}
                    data={messages}
                    renderItem={renderMessage}
                    estimatedItemSize={50}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
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
                <Button variant="icon" onPress={handleSubmit(onSubmit)} className="bg-[#0077AA] rounded-full p-2">
                    <Send size={20} color="white" />
                </Button>
            </View>
        </View>
    );
};

export default ChatScreen;