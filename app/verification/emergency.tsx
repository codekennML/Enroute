

import React, { useState } from 'react';
import { View, ScrollView, Alert, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Info, Plus, Trash2, User, UserPlus } from '@/lib/icons/icons';
import { emergencySchema, friendSchema } from './schemas';
import { z } from 'zod';
import AddContact from '@/components/ui/contacts/addContact';
import { router } from 'expo-router';
import Back from '@/components/ui/back';
import { useAuth } from '@/lib/useAuth';
import { ROLES } from '@/lib/config/enum';

type Friend = z.infer<typeof friendSchema>;

interface EmergencyContactFormData {
  friends: Friend[];
}

const EmergencyContactStep: React.FC = () => {

  const { roles } = useAuth()
  const { control, handleSubmit, watch, formState: { errors }, setValue, getValues } = useForm<EmergencyContactFormData>({
    resolver: zodResolver(emergencySchema),
    defaultValues: {
      friends: [],
    },
  });

  const [isAddContactModalVisible, setIsAddContactModalVisible] = useState(false);

  const friends = watch("friends");

  const onSubmit = (data: EmergencyContactFormData) => {
    console.log('Selected friends:', data.friends);


    if (roles === ROLES.DRIVER) {
      router.push({
        pathname: "/verification/success"

      })
    } else {
      router.push({
        pathname: "/verification/vehicleData"
      })

    }

  };

  const onError = (errors: any) => {
    console.log("Validation errors:", errors);
  };

  const handleAddContact = (newContact: Friend | null) => {
    if (newContact) {
      const currentFriends = getValues('friends');
      const updatedFriends = [...currentFriends, newContact];
      setValue('friends', updatedFriends, { shouldValidate: true });
    }
    setIsAddContactModalVisible(false);
  };

  const handleRemoveContact = (index: number) => {
    const currentFriends = getValues('friends');
    const updatedFriends = currentFriends.filter((_, i) => i !== index);
    setValue('friends', updatedFriends, { shouldValidate: true });
  };

  return (
    <View className='px-4 relative'>
      <View className='flex-col h-full justify-between'>
        <View className='flex-1 mt-[10%]'>
          <View className='mt-4'>
            <Back iconType='arrow' iconSize={30} />
            <Text className='text-[22px] font-semibold text-foreground'>Emergency Contacts</Text>
          </View>
          <Text className='font-medium my-3 text-justify mb-4'>Add your favorite person for trip sharing and safety</Text>

          <Controller
            name="friends"
            control={control}
            render={({ field }) => (
              <View className='flex-col gap-y-3'>
                {field.value && field.value.length > 0 && (
                  field.value.map((friend, index) => (
                    <View
                      key={friend.mobile}
                      className="p-4 h-[80px] rounded-md border border-slate-200 flex-row justify-between items-center gap-x-2 px-2"
                    >
                      <View className='flex-row gap-x-2 items-center'>
                        <View className='p-3 rounded-full bg-primary'>
                          <User size={20} className='text-white' />
                        </View>
                        <View>
                          <Text className='font-semibold'>{`${friend.firstName} ${friend.lastName}`}</Text>
                          <Text>{`+${friend.countryCode}${friend.mobile}`}</Text>
                        </View>
                      </View>
                      <Button variant="ghost" onPress={() => handleRemoveContact(index)}>
                        <Trash2 size={24} className='text-destructive' />
                      </Button>
                    </View>
                  ))
                )}
              </View>
            )}
          />

          {errors.friends?.message && (
            <View className='flex-row items-center gap-x-2 mt-20'>
              <Info size={16} className='text-red-500' />
              <Text className="text-destructive text-xs " style={{
                color: "red"
              }}>{errors.friends.message}</Text>
            </View>
          )}

          {/* {friends?.length < 2 && (
            <View className='flex-col gap-y-2 mt-4 mb-10 absolute bottom-8 right-2'>
              <Button
                variant="default"
                rounded="full"
                className='p-2 shadow-sm'
                onPress={() => setIsAddContactModalVisible(true)}
              >
                <View className='flex-row items-center gap-x-3 shadow-md'>
                  <View className='p-1 rounded-md '>
                    <UserPlus size={30} className='text-white' />
                  </View>
                </View>
              </Button>
            </View>
          )} */}
        </View>

        <View className='py-3'>
          <Button
            size={"lg"}
            rounded={"base"}
            className={`flex-row items-center justify-center ${friends?.length > 0 ? "bg-primary" : "bg-gray-200"} `}
            onPress={() => router.push("/verification/processing")}
          // onPress={handleSubmit(onSubmit, onError)}
          >
            <Text className='smallTitle font-semibold'>Continue</Text>
          </Button>
        </View>
      </View>

      <Modal
        visible={isAddContactModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddContactModalVisible(false)}
      >
        <View style={{
          flex: 1,
          // justifyContent+: 'center'
          //   , 
          alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View style={{
            backgroundColor: 'white', paddingHorizontal: 20, paddingTop: 10
            , borderRadius: 0, width: '100%', height: "100%"
          }}>
            <AddContact onAddContact={handleAddContact} openModal={setIsAddContactModalVisible} title={"Add Emergency contact"} />

          </View>
        </View>
      </Modal >
    </View >
  );
};

export default EmergencyContactStep;