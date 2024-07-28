import { TextInput, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { router, useLocalSearchParams } from 'expo-router'
import StationList from '@/components/custom/stationList'
import { Separator } from '@/components/ui/seperator'
// import { BriefcaseBusiness, Ellipsis, Home, Locate, Plane, CreditCard, UserPlus, UserRound, MessageSquare } from '@/lib/icons/icons'
import { Input } from '@/components/ui/input'
// import { useSheetRef } from '@/components/ui/sheets'
import { Location, Prediction, SearchProps } from '@/types/types'
// import TripData from '@/components/ui/sheets/tripInfo'
import { selectSearchInfo, setDestination, setOrigin } from '@/redux/slices/search'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
// import { setOrigin } from "@/redux/slices/search"
import useLocation from '@/lib/useLocation'
import useDebounce from '@/lib/useDebounce'
import { AutoCompleteQuery, useGetAutoCompleteDataQuery, useGetGeocodedLocationQuery } from '@/redux/api/maps'
import * as Crypto from "expo-crypto"
import { selectUserInfo } from '@/redux/slices/user'
import { predictions } from "@/components/constants/predictions"
import { Locate } from '@/lib/icons/icons'
import { showToast } from "@/redux/slices/toast"
import { useSelector } from 'react-redux'

const search = () => {

  const dispatch = useAppDispatch();
  const tripInfo = useAppSelector(selectSearchInfo);
  const userInfo = useAppSelector(selectUserInfo);
  const { location, error, permissionGranted } = useLocation();

  const [places, setPlaces] = useState<Prediction[]>(predictions);
  const locationInputRef = useRef<TextInput | null>(null);
  const destinationInputRef = useRef<TextInput | null>(null);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { user, type } = useLocalSearchParams<{ user: string, type: "courier" | "inter" | "intra" }>();

  const [inputType, setInputType] = useState<"origin" | "destination">("destination");
  const [place, setPlace] = useState<Prediction | null>(null);

  const [geoCodeQuery, setGeoCodeQuery] = useState<{ lat?: number, lng?: number, type: "destination" | "origin", place_id?: string } | null>(null);
  const [skip, setSkip] = useState<boolean>(false);

  const [userLocationName, setUserLocationName] = useState<string>("");
  const [userDestinationName, setUserDestinationName] = useState<string>("");

  const [canUpdateUserLocationName, setCanUpdateUserLocationName] = useState<boolean>(true);
  const [canUpdateUserDestinationName, setCanUpdateUserDestinationName] = useState<boolean>(true);

  const [userLocationData, setUserLocationData] = useState<Location>({
    name: "",
    placeId: "",
    lat: 0, lng: 0
  });

  const [userDestinationData, setUserDestinationData] = useState<Location>({
    name: "",
    placeId: "",
    lat: 0, lng: 0
  });

  const debouncedLocationName = useDebounce(userLocationName, 500);
  const debouncedDestinationName = useDebounce(userDestinationName, 500);

  const [canUpdateDestinationNameDebounced, setCanUpdateDestinationNameDebounced] = useState<boolean>(true);
  const [canUpdateLocationNameDebounced, setCanUpdateLocationNameDebounced] = useState<boolean>(true);

  const { data: GeocodedResults, error: GeocodedError, isFetching: geolocationLoading, isSuccess } = useGetGeocodedLocationQuery(geoCodeQuery,
    {
      skip: skip && !place,
      refetchOnMountOrArgChange: true
    }
  );

  const handleFocus = (input: "origin" | "destination" | undefined) => {
    if (input !== "origin") {
      setInputType("destination");
      setCanUpdateDestinationNameDebounced(true);
    } else {
      setInputType("origin");
      setCanUpdateLocationNameDebounced(false);
    }
  };

  useEffect(() => {
    if (inputType === "origin") {
      setFocusedInput("origin");
      locationInputRef?.current?.focus();
    } else if (inputType === "destination") {
      setFocusedInput("destination");
      destinationInputRef?.current?.focus();
    }
  }, [inputType]);

  useEffect(() => {
    if (location?.lat && location?.lng && !debouncedLocationName) {
      setGeoCodeQuery({
        lat: location.lat,
        lng: location.lng,
        type: 'origin',
        place_id: ""
      });
    }
  }, [location]);

  useEffect(() => {
    if (GeocodedResults) {
      const parsed = JSON.parse(GeocodedResults);
      if (parsed?.results?.length > 0) {
        let state: string = "";
        let country: string = "";
        let city: string = "";

        parsed?.results[0]?.address_components.forEach((item: Record<string, string>) => {
          if (item.types.includes("administrative_area_level_2")) {
            city = item.long_name;
          }
          if (item.types.includes("administrative_area_level_1")) {
            state = item.long_name;
          }
          if (item.types.includes("country")) {
            country = item.long_name;
          }
        });

        if (parsed.type === "origin") {
          if (canUpdateUserLocationName) {
            setUserLocationName(parsed?.results[0]?.formatted_address);
          }
          dispatch(setOrigin({
            name: parsed?.results[0]?.formatted_address,
            placeId: parsed?.results[0]?.place_id,
            lat: parsed?.results[0]?.geometry?.location?.lat,
            lng: parsed?.results[0]?.geometry?.location?.lng,
            state,
            country,
            town: city
          }));
        } else {
          if (canUpdateUserDestinationName) {
            setUserDestinationName(parsed?.results[0]?.formatted_address);
          }
          dispatch(setDestination({
            name: parsed?.results[0]?.formatted_address,
            placeId: parsed?.results[0]?.place_id,
            lat: parsed?.results[0]?.geometry?.location?.lat,
            lng: parsed?.results[0]?.geometry?.location?.lng,
            state,
            country,
            town: city
          }));

          if (type !== "inter" && userLocationData?.state && userLocationData.state !== userDestinationData.state) {
            dispatch(showToast({
              message: "Inter state rides can only be done using state lines option",
              title: "Incompatible ride type selected",
              type: "foreground",
              notification: "error"
            }));
            setUserDestinationName("");
          }

          if (userDestinationData?.country && userLocationData?.country) {
            if (userDestinationData.country !== userLocationData.country) {
              dispatch(showToast({
                message: "We do not support rides beyond one country yet",
                title: "Unsupported ride type selected",
                type: "foreground",
                notification: "error"
              }));
              setUserDestinationName("");
            }
          }
        }

        if (!skip) {
          setSkip(true);
        }
      }
    }
  }, [GeocodedResults]);

  const [autocompleteQuery, setAutoCompleteQuery] = useState<Omit<AutoCompleteQuery, "radius" | "location">>({
    type: "",
    input: "",
    component: "",
    establishment: ""
  });

  const handleChange = (text: string, type: 'origin' | 'destination') => {
    if (type === 'origin') {
      setUserLocationName(text);
    } else if (type === 'destination') {
      setUserDestinationName(text);
    }
  };

  useEffect(() => {
    if ((inputType === "origin" && debouncedLocationName.length === 0) || (inputType === "destination" && debouncedDestinationName.length === 0)) {
      setPlaces(predictions);
    }

    setAutoCompleteQuery(prev => ({
      ...prev,
      type: inputType,
      input: inputType === "origin" ? debouncedLocationName : debouncedDestinationName,
      component: `country:${userInfo.country?.short_name}`,
      establishment: inputType === "destination" ? "bus_station" : ""
    }));
  }, [debouncedDestinationName, debouncedLocationName, canUpdateLocationNameDebounced, canUpdateDestinationNameDebounced]);

  const { data: AutocompleteResults, error: AutoCompleteError, isFetching: autCompleteLoading, isSuccess: autoCompleteQuerySuccess } = useGetAutoCompleteDataQuery(autocompleteQuery, {
    skip: (inputType === "origin" && !canUpdateLocationNameDebounced) || !autocompleteQuery?.input,
    refetchOnReconnect: true
  });

  useEffect(() => {
    if (autoCompleteQuerySuccess && typeof AutocompleteResults === "string") {
      const parsed = JSON.parse(AutocompleteResults);
      if (parsed?.predictions) {
        setPlaces(parsed?.predictions);
      }
    }
  }, [AutocompleteResults]);

  const handleSelection = (place: Prediction) => {
    if (inputType === "origin") {
      setUserLocationName(place.description);
      setCanUpdateUserLocationName(false);
    } else if (inputType === "destination") {
      setUserDestinationName(place.description);
      setCanUpdateUserDestinationName(false);
    }

    setGeoCodeQuery({
      place_id: place.place_id,
      type: inputType,
    });

    setFocusedInput(null);
    setPlace(place);
  }


  return (

    <View >
      <View className=' px-4 mt-2 '>
        <View className='flex flex-col gap-y-1.5 '>
          <View className='flex flex-row items-center gap-x-2'>

            <View className='flex flex-col w-[5%] items-center gap-y-2' >

              <View className='rounded-full h-6 w-6 bg-blue-800/10 flex flex-row justify-center items-center'>
                <View className='bg-primary/60 h-3 w-3 rounded-full '></View>
              </View>


            </View>
            <View className=' w-[90%] rounded-md '>

              <Input
                value={userLocationName}
                onFocus={() => handleFocus('origin')}
                onBlur={() => handleFocus(undefined)}
                className={`  border-none border-0  h-10 bg-accent border-transparent font-medium text-[8px]  cursor:text-gray-500 text-muted-foreground px-2 py-1 ${focusedInput === "origin" ? "border-2  border-blue-600" : ""}`}
                placeholder="Retrieving location..."
                onChangeText={(text) => handleChange(text, "origin")}
                aria-labelledbyledBy='inputLabel'
                aria-errormessage='inputError'
                style={{
                  fontSize: 14
                }}
              />
            </View>
          </View>

          {/* Separator */}
          <View className='relative'>
            <Separator className='h-6 w-[1px]  bg-transparent absolute border-l-[2px]  border-blue-600/80 ' orientation='vertical' style={{ left: 8, top: -12 }} />

          </View>
          <View className='flex flex-row items-center gap-x-2'>
            <View className='flex flex-col w-[5%] items-center gap-y-2 ' >

              <View className='rounded-full h-6 w-6 bg-blue-800/10 flex flex-row justify-center items-center'>
                <View className='bg-primary/80 h-3 w-3 rounded-full '></View>
              </View>

            </View>

            <View className='w-[90%] bg-accent rounded-md '>

              <Input
                value={userDestinationName}
                ref={destinationInputRef}

                className={` border-none border-0  h-10 bg-accent border-transparent font-medium text-[8px]  cursor:text-gray-500 text-muted-foreground px-2 py-1 ${focusedInput === "destination" ? "border-2  border-blue-600" : ""}`}
                placeholder="Search for bus stop"
                onFocus={() => handleFocus('destination')}
                onBlur={() => handleFocus(undefined)}
                // onSubmitEditing={(e) => handleDestinationSubmit(e.nativeEvent.text)}
                onChangeText={(text) => handleChange(text, "destination")}
                aria-labelledbyledBy='inputLabel'
                aria-errormessage='inputError'
                style={{
                  fontSize: 14
                }}
              />
            </View>


          </View>


        </View>

        {/* 
          <View className="flex-row  flex justify-center gap-x-2 max-w-[85%]  pb-4 mt-3 pl-1.5" >
            {
              SearchPropsArray.map(({ services, title, action, LeftIcon }: SearchProps, index) => {

                return (
                  services.includes(type!) &&

                  <Button key={title} variant="outline" size="badge" onPress={action} rounded="base" className={`flex-row items-center  gap-x-1.5 px-2 pr-3 } `} >

                    <LeftIcon size={18} color={"blue"} className='text-gray-600/80' />

                    <Text variant="tiny" color="secondary" className=' text-[6px] text-muted-foreground' style={{ fontSize: 14 }}>

                      {"riders" in tripInfo && tripInfo?.riders.length > 1 ? `${tripInfo.riders[0].name} & ${tripInfo.riders.length - 1} more` : "riders" in tripInfo && tripInfo?.riders.length === 1 && tripInfo.riders[0].name !== currentUser.mobile ? tripInfo.riders[0].name : title}

                    </Text>

                  </Button>
                )
              })
            }
          </View> */}



      </View>
      <Separator className='bg-slate-300/80 mt-4' orientation='horizontal' />
      {/* 
      <View className='px-4 mt-4'>
        <Text variant="subhead" color="secondary" className='font-semibold '>Saved Places</Text>

        <View className='flex flex-row gap-x-2 items-center justify-start mt-3'>
          <Button variant="outline" size="badge" rounded="full"
            className='flex flex-row items-center justify-between rounded-md gap-x-1 px-4 w-max dark:border'
          >
            <Home size={18} className='text-gray-600/80' />
            <Text variant={"tiny"} className='text-gray-600 font-medium' style={{ fontSize: 14 }}>Home</Text>

          </Button>
          <Button variant="outline" size="badge" rounded="full"
            className='flex flex-row items-center justify-between rounded-md gap-x-1 px-4 w-max  dark:border'
          >
            <BriefcaseBusiness size={18} className='text-gray-600/80' />
            <Text variant={"tiny"} className='text-foreground text-[10px]' style={{ fontSize: 14 }}>Work</Text>

          </Button>


          <Button variant="outline" size="badge" rounded="full"
            className='flex flex-row items-center justify-between rounded-md gap-x-1 px-4 w-max  dark:border-border'
          >
            <Ellipsis size={18} color={'#333333'} className='text-gray-600/80' />
            <Text className='text-foreground' style={{ fontSize: 14 }}>More</Text>

          </Button>
        </View>
      </View> */}

      {/* <Separator className='bg-slate-300/80 mt-4' orientation='horizontal' /> */}
      <View className='space-y-6 px-4 '>
        {/* <Text variant="subhead" color="secondary" className='font-semibold '>More Places</Text> */}

        <View className='gap-y-2 mt-4'>
          {
            Array.isArray(places) && places.map((place: Prediction, index: number) => {
              return (
                <Button variant={"ghost"} onPress={() => setPlace(place)} key={place.place_id} className='mt-0.5' >
                  <StationList prediction={place} isLast={index === predictions.length - 1} iconSize={24} />
                </Button>
              )

            }
            )}


        </View>
        <View className='w-full'>
          <Button variant="ghost" className=' h-10 flex flex-row gap-x-3.5 w-full text-left my-3' onPress={() => {
            router.push(({
              pathname: "/summary",
              params: {
                type: "intra",
                name: `${type === "courier" ? "Package" : "Ride"} details`,

              }
            }))
          }} >
            <Locate size={24} className="  pl-0 text-gray-600/80" />
            <Text variant={"body"} color="secondary" className=''>Set location on map</Text>
          </Button>

        </View>
      </View>


    </View >



  )
}

export default search