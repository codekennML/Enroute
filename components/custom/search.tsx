
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, TouchableOpacity, TextInput, Keyboard, Modal } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/seperator';
import TownsList, { PredictionOrLocation, renderSkeletons, StationList } from '@/components/custom/stationList';
import { selectSearchInfo, setDestination, setOrigin } from '@/redux/slices/search';
import { selectUserInfo } from '@/redux/slices/user';

import { Compass, Locate, X } from '@/lib/icons/icons';
import useLocation from '@/lib/useLocation';
import useDebounce from '@/lib/useDebounce';
import { AutoCompleteQuery, useGetAutoCompleteDataQuery, useGetGeocodedLocationQuery, useLazyGetGeocodedLocationQuery } from '@/redux/api/maps';
import { Location, Prediction } from '@/types/types';
import { predictions as defaultPredictions, locations } from "@/components/constants/predictions";
import { useSelector } from 'react-redux';
import { selectBusStations } from '@/redux/slices/busStations';
import { Skeleton } from '../ui/skeleton';
import LocationMapManual from '@/components/custom/selectLocationMapManual'
import { useWrappedErrorHandling } from '@/lib/useErrorHandling';
import { showToast } from '@/redux/slices/toast';

interface SearchLocateProps {

  openModal: Dispatch<SetStateAction<boolean>>

}

export const getPlaceFullName = (place: PredictionOrLocation, type: string) => {

  // console.log(place, "HIii")
  const name = `${place?.description ? `${place.description}` : place?.name ? `${place?.name}` : ""}`

  const townName = place?.town?.name ? `,${place?.town?.name}` : ""
  const stateName = place?.state?.name ? `,${place?.state?.name}` : ""
  const countryName = place?.country?.name ? `,${place?.country?.name}` : ""
  const placeName = name + townName + stateName + countryName

  const address = type === "courier" ? name : placeName.trim()

  return address
}



const SearchLocate: React.FC<SearchLocateProps> = ({ openModal }) => {
  const dispatch = useAppDispatch();
  const { location } = useLocation();
  const { handleError } = useWrappedErrorHandling()




  //TODO UPDATE THIS TO MATCH
  const role = "rider"

  const ROLES = {
    driver: "driver",
    rider: "rider"
  }
  const tripInfo = useSelector(selectSearchInfo)

  const { origin, destination, type } = tripInfo
  // console.log(origin, destination, "FOLLLL")
  const userInfo = useAppSelector(selectUserInfo);

  const busStations = useSelector(selectBusStations)

  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [focusedInput, setFocusedInput] = useState<"origin" | "destination" | null>(null);
  const [manualLocationPickerOpen, setIsManualLocationPickerOpen] = useState<boolean>(false)
  const [initialGeocodeComplete, setInitialGeocodeComplete] = useState(false);
  const [canRunAutoComplete, setCanRunAutoComplete] = useState(false)
  const [predictions, setPredictions] = useState<PredictionOrLocation[]>(locations);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>()
  const [initialLocation, setInitialLocation] = useState<Location | undefined>()
  const [predictionLocation, setPredictionLocation] = useState<Location | undefined>()
  const [hasSelectedPlace, setHasSelectedPlace] = useState(false)

  const [initialDestination, setInitialDestination] = useState<Location | undefined>()
  const [predictionDestination, setPredictionDestination] = useState<Location | undefined>()


  const originInputRef = useRef<TextInput>(null);
  const destinationInputRef = useRef<TextInput>(null);

  const debouncedOriginName = useDebounce(originName, 500)
  const debouncedDestinationName = useDebounce(destinationName, 500)

  const [manualDebouncedOrigin, setManualDebouncedOrigin] = useState(debouncedOriginName);
  const [manualDebouncedDestination, setManualDebouncedDestination] = useState(debouncedDestinationName);

  const [originNameEdited, setOriginNameEdited] = useState(false);
  const [destinationNameEdited, setDestinationNameEdited] = useState(false);
  const [triggerGeolocate] = useLazyGetGeocodedLocationQuery()




  useEffect(() => {


    if (origin || (destination && origin)) {


      setCanRunAutoComplete(false) //If there was a value in state we want to just track it within the results

      setOriginName(getPlaceFullName(origin, type))
      console.log("RAN INTIAL LOCATION POPULATE")
      setInitialLocation(origin) //Setting the initial location

      if (destination) {

        setDestinationName(getPlaceFullName(destination, type))  //seting value in destination input to the name in state
        setPredictionDestination(destination)
      }
      //Make the origin field editable 
      setInitialGeocodeComplete(true)
    }

    if ((!origin && !destination) || (origin && !destination)) {
      destinationInputRef.current?.focus();
    }

  }, [tripInfo]);



  useEffect(() => {
    setManualDebouncedOrigin(debouncedOriginName);
  }, [debouncedOriginName]);

  useEffect(() => {
    setManualDebouncedDestination(debouncedDestinationName);
  }, [debouncedDestinationName]);



  const handleInputFocus = useCallback((input: "origin" | "destination") => {

    setFocusedInput(input);

    //Lets check if there is a value for the previous input 

    const inputRef = input === "origin" ? originInputRef : destinationInputRef;
    const inputValue = input === "origin" ? originName : destinationName;

    setManualDebouncedDestination("")
    setManualDebouncedOrigin("")

    inputRef?.current?.focus()

    setCanRunAutoComplete(false)
  }, [originName, destinationName]);


  const autoCompleteQuery = useMemo(() => {

    const input = focusedInput === "origin" ? manualDebouncedOrigin : manualDebouncedDestination
    const response = manualDebouncedOrigin?.length > 1 || manualDebouncedDestination.length > 1 ? {
      type: focusedInput || "destination",
      input,
      service: type,
      component: `country:${userInfo.country?.iso_code?.toLowerCase()}`,

    } : undefined

    if (focusedInput === "destination" && type !== "courier" && response)
      response["establishment"] = "bus_station"

    return input && response ?
      response : undefined

  }, [focusedInput, manualDebouncedDestination, manualDebouncedOrigin, userInfo.country])


  const { data: autocompleteResults, isSuccess: isAutoCompleteSuccess, isLoading: isAutocompleteLoading, isFetching: isAutocompleteFetching } = useGetAutoCompleteDataQuery(autoCompleteQuery, {
    skip: !autoCompleteQuery || !canRunAutoComplete
  });



  useEffect(() => {

    // console.log(predictionDestination, predictionLocation, initialLocation, destinationNameEdited, originNameEdited, "eNTREWW WW dATE")

    if (predictionDestination && (initialLocation || predictionLocation) && (destinationNameEdited || originNameEdited)) {
      //Close the sheet, dispatch the action 
      console.log(predictionDestination, "logging FINAL ORIGIN")
      dispatch(setOrigin(predictionLocation ?? initialLocation!))
      dispatch(setDestination(predictionDestination))

      //Close the sheet   
      setTimeout(() => {

        openModal(false)
      }, 100)

    }

  }, [initialLocation, predictionLocation, predictionDestination])


  useEffect(() => {

    if (autocompleteResults && isAutoCompleteSuccess) {


      if (autocompleteResults?.searchType === "towns" || autocompleteResults?.searchType === "stations") {
        setPredictions(autocompleteResults?.predictions?.data)
      }
      else if (autocompleteResults?.searchType === "google") {
        // console.log(autocompleteResults?., "MILLER")
        const parsedLocations = JSON.parse(autocompleteResults?.predictions);
        setPredictions(parsedLocations);
      }
    } else {
      setPredictions(busStations)
    }
  }, [autocompleteResults, isAutoCompleteSuccess, debouncedDestinationName, debouncedOriginName]);


  const handleInputChange = useCallback((text: string, inputType: "origin" | "destination") => {

    //Ensure to set autocomplete to true incase its been set to false
    setCanRunAutoComplete(true)

    if (inputType === "origin") {

      setOriginName(text);

      // if (!originNameEdited) setOriginNameEdited(true);

      // if (predictionLocation) {

      // setPredictionLocation(undefined)
      // }

    } else {
      setDestinationName(text);

      // if (!destinationNameEdited) setDestinationNameEdited(true);
      if (predictionDestination) {

        setPredictionDestination(undefined)
      }
    }
    if (!text) {
      setPredictions(busStations);
    }
  }, []);

  const handleBlur = (inputType: string) => {

    console.log("RUNNING BLUR FN", "A")

    // console.log(predictionLocation, selectedPlaceId)

    setCanRunAutoComplete(false)

    if (inputType === "origin") {
      //Check if there is prediction location if there isnt , set the origin name to initialLocation but not before setting canRunAutocomplete to false
      console.log(selectedPlaceId, !predictionLocation && !selectedPlaceId, "SELECTED CONDITION RESPONSE")
      if (!predictionLocation && !selectedPlaceId) {

        console.log("RUNNING FAILED AREA", initialLocation?.name)

        setOriginName(initialLocation?.name || "Unnamed road")

        setPredictionLocation(initialLocation)

      }
    }
  }
  const handlePredictionSelection = async (prediction: PredictionOrLocation) => {
    console.log("BUllard")
    //Prevent an automplete query
    setCanRunAutoComplete(false)

    const isPrediction = "structured_formatting" in prediction

    if (isPrediction) {

      if (focusedInput === "origin") {
        setOriginName(getPlaceFullName(prediction, type));
        if (!originNameEdited) setOriginNameEdited(true);
        setSelectedPlaceId(prediction.place_id)
        console.log("RAN_PREDICTION, NO GEO")
        await getGeocodedResults("origin", prediction)

      } else {

        setDestinationName(getPlaceFullName(prediction, type));

        if (!destinationNameEdited) setDestinationNameEdited(true);

        setSelectedPlaceId(prediction.place_id)

        await getGeocodedResults("destination", prediction)
      }


    }
    else {
      //A cached location was picked , which means we can just automatically set the information withot geocoding
      if (focusedInput === "origin") {

        setOriginName(getPlaceFullName(prediction, type));
        if (!originNameEdited) setOriginNameEdited(true);

        setPredictionLocation(prediction)
        setSelectedPlaceId(prediction._id)

      } else {

        setDestinationName(getPlaceFullName(prediction, type))

        if (!destinationNameEdited) setDestinationNameEdited(true);

        setPredictionDestination(prediction)
        setSelectedPlaceId(prediction._id)
      }

    }

    Keyboard.dismiss()

    // setPredictions(locations.slice(0, 3));

  }
  const getGeocodedResults = async (type: "origin" | "destination", prediction: Prediction) => {


    const { error, data } = await triggerGeolocate({
      type,
      placeId: prediction.place_id,
      isManual: false
    })

    if (error) {

      //TODO SEND TO LOGGING SERVICE HERE
      // const message =  error?.message

      // error["message"] =  "Something went wrong.Please try again."

      dispatch(showToast({
        notification: "danger",
        title: "Error",
        message: "Something went wrong.Please try again in some minutes",
        type: "foreground"
      }))

      return
    }

    const parsed = JSON.parse(data as string);
    if (parsed?.results?.results?.length > 0) {
      const placeData = parsed?.results?.results
      let state: string = "";
      let country: string = "";
      let city: string = "";

      placeData[0]?.address_components.forEach((item: Record<string, string>) => {
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

      const locationInfo = {
        name: placeData[0].formatted_address,
        placeId: placeData[0].place_id,
        coordinates: [placeData[0].geometry.location.lat,
        placeData[0].geometry.location.lng] as [number, number],
        state: { name: state, _id: undefined },
        town: { name: city, _id: undefined },
        country: { name: country, _id: undefined }
      }

      const type = parsed?.type;
      if (type === "origin") {
        setInitialLocation(locationInfo);
        setPredictionLocation(locationInfo);

      } else {
        setInitialDestination(locationInfo);
        setPredictionDestination(locationInfo);
      }
    }

  }

  const renderInput = useCallback((
    inputType: "origin" | "destination",
    value: string,
    placeholder: string,
    ref: React.RefObject<TextInput>
  ) => (
    <View className='w-[83%] rounded-md relative'>
      <Input
        ref={ref}
        selectTextOnFocus={true}
        // onPressIn={}
        value={value}
        onFocus={() => handleInputFocus(inputType)}
        onBlur={() => handleBlur(inputType)}
        className={`h-10  font-medium text-[8px] cursor:text-gray-500 text-foreground px-2 py-1 ${focusedInput === inputType ? "border-2 border-primary dark:border-primary" : "border-2 border-gray-200"}`}
        placeholder={placeholder}
        onChangeText={(text) => handleInputChange(text, inputType)}
        editable={inputType === "destination" || initialGeocodeComplete}
        style={{ fontSize: 14 }}
      />

    </View>
  ), [focusedInput, initialGeocodeComplete, handleInputFocus, handleInputChange]);


  const handleLocationManualPicker = () => {
    setIsManualLocationPickerOpen(true)
  }

  return (
    <View className=''>
      <View className='px-2'>
        <View className='flex flex-col gap-y-1.5'>
          <View className='flex flex-row items-center gap-x-2'>
            <View className='flex flex-col w-[10%] items-center gap-y-2'>
              <View className='rounded-full h-6 w-6 bg-blue-800/10 flex flex-row justify-center items-center'>
                <View className='bg-primary/60 h-3 w-3 rounded-full' />
              </View>
            </View>
            {renderInput("origin", originName, initialGeocodeComplete ? "Pickup location" : "Retrieving location...", originInputRef)}
          </View>

          <View className='relative'>
            <Separator className='h-6 w-[1px] bg-transparent absolute border-l-[2px] border-primary' orientation='vertical' style={{ left: 18, top: -12 }} />
          </View>

          <View className='flex flex-row items-center gap-x-2'>
            <View className='flex flex-col w-[10%] items-center gap-y-2'>
              <View className='rounded-full h-6 w-6 bg-blue-800/10 flex flex-row justify-center items-center'>
                <View className='bg-primary/80 h-3 w-3 rounded-full' />
              </View>
            </View>
            {renderInput("destination", destinationName, "Search for city e.g Ikeja", destinationInputRef)}
          </View>
        </View>
      </View>

      <Separator className='bg-slate-300/80 mt-4' orientation='horizontal' />

      <View className='space-y-6 px-1'>
        <View className='gap-y-2 mt-4'>

          <TownsList
            predictions={predictions}
            onPress={handlePredictionSelection}
            isLoading={isAutocompleteLoading || isAutocompleteFetching} />

          {
            isAutocompleteLoading || isAutocompleteFetching ?
              <Skeleton className={"w-3/4 h-8"} />
              :
              predictions.length > 0 && focusedInput && type === "courier" &&
              <Button
                variant="ghost"
                className='h-10 flex flex-row gap-x-3.5 w-full text-left my-2  ml-3'
                onPress={() => handleLocationManualPicker()}
              >
                <Compass size={24} className="pl-4 text-foreground" />
                <Text variant="body" color="secondary">Set location on map</Text>
              </Button>
          }

        </View>


      </View>

      <Modal
        visible={manualLocationPickerOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsManualLocationPickerOpen(false)}
      >
        <View className='flex-1 bg-slate-100'>


          <LocationMapManual setIsManualLocationPickerOpen={setIsManualLocationPickerOpen} focusedInput={focusedInput} openParentLocateModal={openModal} />
        </View>
      </Modal >
    </View>
  );
};

export default SearchLocate;





