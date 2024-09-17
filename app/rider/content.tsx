import React from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
interface ActionItem {
  id: string;
  title: string;
  icon: string;
  page: string
}

const DrawerContent: React.FC = () => {
  const driverProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 4.8,
    totalRides: 1250
  };

  const actionItems: ActionItem[] = [
    { id: '1', title: 'Account Settings', icon: 'settings-outline', page: "/rider/(account)/settings" },
    { id: '2', title: 'Saved Places', icon: 'document-text-outline', page: "/rider/(account)/saved" },
    { id: '8', title: 'Documents', icon: 'document-text-outline', page: "/rider/(account)/documents" },
    { id: '3', title: 'Payment Methods', icon: 'card-outline', page: "/rider/(account)payment" },
    { id: '5', title: 'Legal', icon: 'shield-checkmark-outline', page: "/rider/(account)/legal" },
    { id: '6', title: 'Privacy Policy', icon: 'lock-closed-outline', page: "/rider/(account)/privacy" },
    { id: '4', title: 'Support', icon: 'headset-outline', page: "/account/support" },

  ];

  const renderActionItem = (item: ActionItem) => (
    <Button
      variant={"ghost"}
      key={item.id}
      className="flex-row items-center py-3 px-6 "
      onPress={() => router.push({
        pathname: item.page
      })}
    >
      <Ionicons name={item.icon as any} size={18} color="#134071" className="mr-4 text-foreground" />
      <Text variant={"callout"} className={`flex-1 font-medium`}>{item.title}</Text>
      {/* <Ionicons name="chevron-forward" size={18} color="#134071" /> */}
    </Button>
  );

  return (
    <SafeAreaView className="" style={{ flex: 1 }}>
      <View className='flex-1'>

        <ScrollView className='flex-1'>
          <View className="p-2 flex flex-col justify-center mb-2 mt-1 ">

            <View className='flex-row items-center justify-start pl-4'>

              <View className="mb-1 flex-row items-center justify-start">
                <Image
                  source={{ uri: driverProfile.avatarUrl }}
                  className="w-12 h-12 rounded-full mr-2"
                />
                <View className='flex-col items-start  mt-0'>
                  <View className='flex-row items-center gap-x-2'>
                    <View>
                      <Text className="font-semibold text-foreground">{driverProfile.name}</Text>
                    </View>
                    <View className="flex-row items-center justify-start">
                      <Ionicons name="star" size={12} color="#FFC107" />
                      <Text className=" font-semibold"> {driverProfile.rating.toFixed(1)}</Text>
                    </View>
                  </View>

                  <Text variant={"callout"} className=" text-muted-foreground dark:text-muted-foreground">{driverProfile.email}</Text>
                </View>


              </View>


            </View>

            <View className="flex-row justify-between rounded p-3 bg-pink-400/10 m-3 ">

              <View>
                <Text className="text-foreground text-center">Joined</Text>
                <View className="flex-row items-center">

                  <Text className="ml-1   font-semibold text-foreground">May, 2024</Text>
                </View>
              </View>
              <View>
                <Text className=" text-center">Total Rides</Text>
                <Text className=" font-semibold  text-center">{driverProfile.totalRides}</Text>
              </View>
            </View>

          </View>

          <View className=" rounded-t-lg overflow-hidden p-2 pl-0">
            {actionItems.map(renderActionItem)}
            <>
              <Button
                variant={"ghost"}
                className="flex-row  py-3 px-6 "
                onPress={() => router.push({
                  pathname: "/(auth)"
                })}
              >

                <Text variant={"callout"} className={`flex-1  font-medium text-destructive dark:text-destructive`}>Logout</Text>

              </Button>
            </>
          </View>
        </ScrollView>
        <View className='p-4'>
          <View className='bg-primary p-4 rounded-lg'>
            <Text variant={"smallTitle"} className='text-white dark:text-white'>Become a driver in minutes</Text>
            <Text variant={"footnote"} className='font-medium py-3 text-white dark:text-white'>
              Flexible schedule, verified pickups, whenever and wherever you choose
            </Text>
            <Button className='bg-white h-10 flex-row items-center justify-center text-white dark:text-white' rounded="base" >
              <Text variant={"body"} className='font-semibold'>
                Get started
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent