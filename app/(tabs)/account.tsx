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

const AccountScreen: React.FC = () => {
  const driverProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 4.8,
    totalRides: 1250
  };

  const actionItems: ActionItem[] = [
    { id: '1', title: 'Account Settings', icon: 'settings-outline', page: "/(account)/settings" },
    { id: '2', title: 'Saved Places', icon: 'document-text-outline', page: "/(account)/saved" },
    { id: '8', title: 'Documents', icon: 'document-text-outline', page: "/(account)/documents" },
    { id: '3', title: 'Payment Methods', icon: 'card-outline', page: "/(account)/payment" },
    { id: '5', title: 'Legal', icon: 'shield-checkmark-outline', page: "/(account)/legal" },
    { id: '6', title: 'Privacy Policy', icon: 'lock-closed-outline', page: "/(account)/privacy" },
    { id: '4', title: 'Support', icon: 'headset-outline', page: "/(account)/support" },
    { id: '7', title: 'Logout', icon: 'log-out-outline', page: "/(account)/logout" },
  ];

  const renderActionItem = (item: ActionItem) => (
    <Button
      key={item.id}
      className="flex-row items-center py-3 px-6 bg-white "
      onPress={() => router.push({
        pathname: item.page
      })}
    >
      <Ionicons name={item.icon as any} size={24} color="#134071" className="mr-4 text-foreground" />
      <Text className={`flex-1 text-base font-medium  ${item.id === '7' ? "text-destructive" : "text-foreground"}`}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#134071" />
    </Button>
  );

  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView>
        <View className="bg-white p-6 flex flex-col justify-center mb-4">

          <View className='flex-col items-center justify-center'>

            <View className="mb-4">
              <Image
                source={{ uri: driverProfile.avatarUrl }}
                className="w-20 h-20 rounded-full mr-4"
              />
              <View>
                <Text className="text-xl font-bold text-foreground">{driverProfile.name}</Text>
                <Text className="text-sm text-gray-600">{driverProfile.email}</Text>
              </View>
            </View>


          </View>

          <View className="flex-row justify-between rounded-md px-4">
            <View>
              <Text variant="subhead" className="text-center text-foreground">Rating</Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={16} color="#FFC107" />
                <Text className="ml-1 text-base font-semibold">{driverProfile.rating.toFixed(1)}</Text>
              </View>
            </View>
            <View>
              <Text className="text-sm text-foreground text-center">Joined</Text>
              <View className="flex-row items-center">
                {/* <Ionicons name="star" size={16} color="#FFC107" /> */}
                <Text className="ml-1 text-base  font-semibold text-foreground">May, 2024</Text>
              </View>
            </View>
            <View>
              <Text className="text-sm  text-center">Total Rides</Text>
              <Text className="text-base font-semibold  text-center">{driverProfile.totalRides}</Text>
            </View>
          </View>



        </View>

        <View className="bg-white rounded-t-lg overflow-hidden">
          {actionItems.map(renderActionItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;