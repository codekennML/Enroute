import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Modal } from 'react-native';
import { Text } from "../ui/text";
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Trash2, UserPlus, UserRoundPen, X } from '@/lib/icons/icons';
import AddContact from '../ui/contacts/addContact';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { friendSchema, friendsWithAddedTag } from '@/app/(verification)/schemas';
// import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
// import { Sheet, useSheetRef } from '../ui/sheets';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import { addPackageRecipient, addRideRiders, selectSearchInfo } from '@/redux/slices/search';
import { selectUserInfo } from '@/redux/slices/user';
import { z } from "zod"
import { useAppDispatch } from '@/redux/hooks';

type Friend = z.infer<typeof friendsWithAddedTag>

// type FriendsWithToggle =  Friend & {added : boolean}

const validationData = z.object({

    friends: z.array(friendsWithAddedTag)
})

type RidersData = z.infer<typeof validationData>


interface RiderListProps {
    closeAddRiderSheet: (value: string | null) => void
}


const RiderList: React.FC<RiderListProps> = ({ closeAddRiderSheet }) => {


    const [contactToEdit, setContactToEdit] = useState<Friend | undefined>()

    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const userInfo = useSelector(selectUserInfo)

    const { _id, firstName, lastName, mobile, countryCode } = userInfo

    const tripInfo = useSelector(selectSearchInfo)

    const { type, recipient } = tripInfo

    const { control, watch, handleSubmit, getValues, setValue, formState: { errors } } = useForm<RidersData>({
        resolver: zodResolver(validationData),
        mode: "onChange",
    })

    const friends = watch("friends") ?? []




    useEffect(() => {

        if (type === "courier") {

            // console.log(tripInfo?.recipient, "Miiieiiiriir")

            setValue('friends', tripInfo?.recipient ? [tripInfo?.recipient] : [])

        }
        else {
            console.log(tripInfo, "RIDE RIDERSS")
            setValue('friends', tripInfo.riders)
        }
    }, [])


    const toggleAccountOwner = () => {

        const riders = getValues("friends")

        if (riders.length === 1) {
            riders[0].added = true
            setValue('friends', riders, { shouldValidate: true });

        } else {

            const newRiders = riders.map((rider: Friend) => rider.id === _id ? { ...rider, added: !rider.added } : rider)
            setValue('friends', newRiders, { shouldValidate: true });
        }



    };

    const deleteRider = (id: string) => {
        const friends = getValues("friends") as Friend[]

        if (friends.length === 2 && friends[0].id === _id && friends[1].id === id) {
            friends[0].added = true
            setValue('friends', friends, { shouldValidate: true });

        }


        const newFriends = friends?.filter((friend) => friend.id !== id)
        setValue('friends', newFriends, { shouldValidate: true })

    }

    console.log(friends, "Froiend")

    const onError = (data) => {

        console.log(JSON.stringify(data), errors, 'ERROR ADDRIDER')
    }


    const handleAddContact = (newContact: Omit<Friend, "id" | "added"> | null) => {
        const riderId = `rider-${new Date()}`

        if (newContact) {

            // console.log("NEW CONTACT", newContact)

            const currentFriends = getValues('friends');
            const updatedFriends = [...currentFriends, { ...newContact, id: riderId }];
            // console.log(updatedFriends, "lOLAOLS")
            setValue('friends', updatedFriends, { shouldValidate: true });

            console.log(errors, "Errors")


        }
    };

    const editContact = (contact: Friend) => {
        setContactToEdit(contact)
        setIsModalOpen(true)
    }

    const handleUpdateContact = (contact: Omit<Friend, "added"> | null) => {
        // console.log(contact, "New cupdated contact ")
        if (contact && contact.id) {
            const friends = getValues("friends");
            if (friends && friends.length > 0) {
                const updatedFriends = friends.map(friend =>
                    friend.id === contact.id ? { ...friend, ...contact } : friend
                );
                setValue('friends', updatedFriends, { shouldValidate: true });
            }
        }
    }


    const saveRiders = (data: { friends: Friend[] }) => {

        // console.log(data.friends)
        type !== "courier" ?
            dispatch(
                addRideRiders(data.friends)
            ) :
            dispatch(addPackageRecipient(data.friends[0]))

        // console.log("Data",)

        closeAddRiderSheet(null)


    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    };

    const renderRider: React.FC<{ item: Friend }> = ({ item }) => {
        console.log(item)


        return (
            <View className="flex-row items-center justify-between p-2 border-b border-gray-200 ">
                <View className="flex-row items-center">
                    <View className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                        <Text className="text-white font-bold">
                            {getInitials(item.firstName, item.lastName)}
                        </Text>
                    </View>
                    <Text variant={"body"} className="font-semibold">
                        {item.firstName} {item.lastName}
                    </Text>
                </View>
                {
                    item?.id === _id ?
                        <Checkbox checked={item.added} onCheckedChange={toggleAccountOwner} /> : (
                            <View className="flex-row items-center gap-x-4 mt-3">
                                <Button variant={"ghost"} onPress={() => editContact(item)}>
                                    <UserRoundPen size={20} className='text-foreground' />
                                </Button>
                                <Button variant={"ghost"} onPress={() => deleteRider(item.id)}>
                                    <Trash2 size={20} className='text-destructive' />
                                </Button>
                            </View>
                        )

                }
            </View>

        );

    };


    return (
        <View className="flex-1  flex-col justify-between h-full  px-2 mt-6">

            <>
                {
                    ((type === "courier" && (recipient || friends?.length > 0)) || type !== "courier") ?
                        (<FlashList
                            data={friends}
                            renderItem={renderRider}
                            estimatedItemSize={10}
                            keyExtractor={item => (item.id ?? item?.mobile)}
                            scrollEnabled={true}
                        // style={{ flexGrow: 1 }}
                        // contentContainerStyle={{ paddingHorizontal: 12 }}
                        />)
                        : null

                }

                {
                    ((type === "courier" && friends?.length === 0) || (type !== "courier" && friends?.length <= 49)) &&
                    <Button
                        variant={"ghost"}
                        onPress={() => setIsModalOpen(true)}
                        className="py-1 px-2 rounded-md flex-row items-center gap-x-2 border-y border-blue-100 mb-8"
                    >
                        <View className="w-14 h-14 rounded-lg flex items-center justify-center">
                            <UserPlus size={26} className="text-foreground" />
                        </View>
                        <Text variant={"smallTitle"} className="text-white font-semibold">{type === "courier" ? "Add a recipient" : "Add a rider  "}</Text>
                    </Button>
                }


            </>


            <View className=" px-2 py-4 flex-row items-center">

                <Button
                    variant={"default"}
                    size={"lg"}
                    onPress={handleSubmit(saveRiders, onError)}
                    disabled={friends?.length < 1}
                    className="py-1 px-2 rounded-md flex-row items-center justify-center gap-x-2 flex-1"
                >

                    <Text variant={"body"} className="text-white font-medium">Save</Text>
                </Button>
            </View>



            <Modal
                visible={isModalOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalOpen(false)}
            >
                <View style={{
                    flex: 1,
                    // justifyContent: 'center'
                    //   , 
                    alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                        backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10
                        , borderRadius: 0, width: '100%', height: "100%"
                    }}>
                        <AddContact onAddContact={handleAddContact} openModal={setIsModalOpen} title={"Add new rider"} contactToEdit={contactToEdit} updateContact={handleUpdateContact} />

                    </View>
                </View>
            </Modal >



        </View>
    );
};

export default RiderList;
