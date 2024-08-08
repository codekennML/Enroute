import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { router } from 'expo-router';
import axios from 'axios';
import { useAppDispatch } from '@/redux/hooks';




const WelcomeScreen = () => {

  const [countryCode, setCountryCode] = useState("")


  return (
    <View className="  h-full flex flex-col justify-between  ">
      <View className=" flex flex-col justify-center items-center flex-1 bg-white">
        <Image
          source={require("../../assets/images/welcome.png")}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      <View className="  items-center  justify-end pb-10 ">
        <Text variant="heading" className="mb-1 text-foreground font-header ">Skip the bus</Text>
        <Text variant="heading" color={"secondary"} className="mb-5 text-foreground font-header ">Grab a ride along now</Text>

        <Button onPress={() => {
          router.push({
            pathname: "/rideLive",

            // pathname: "/rideHelp",
            params: {
              type: "rider"
            }
          })
        }}
          variant="default"
          size="lg"
          rounded="base"
          className="w-4/5 mb-2 flex flex-row justify-center items-center"
        >
          <Text variant={"mediumTitle"} className='font-semibold text-white'> Get started</Text>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          rounded="base"
          className='flex flex-row items-center gap-x-2'
          onPress=
          {() => {
            router.push({
              pathname: "/(auth)/login",
              params: {
                authType: "driver"
              }
            })
          }}
        >
          <Text variant="smallTitle" className="text-foreground font-medium ">
            Ready to earn?
          </Text>
          <Text variant="smallTitle" className="text-foreground font-semibold">Become a driver</Text>
        </Button>
      </View>
    </View>
  );
};

export default WelcomeScreen;