
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/seperator';
import TownsList, { PredictionOrLocation, renderSkeletons, StationList } from '@/components/custom/stationList';
import { selectSearchInfo, setDestination, setOrigin } from '@/redux/slices/search';
import { selectUserInfo } from '@/redux/slices/user';

import { Locate, X } from '@/lib/icons/icons';
import useLocation from '@/lib/useLocation';
import useDebounce from '@/lib/useDebounce';
import { AutoCompleteQuery, useGetAutoCompleteDataQuery, useGetGeocodedLocationQuery } from '@/redux/api/maps';
import { Location, Prediction } from '@/types/types';
import { predictions as defaultPredictions, locations } from "@/components/constants/predictions";
import { useSelector } from 'react-redux';

interface SearchLocateProps {

  openModal: Dispatch<SetStateAction<boolean>>

}


const SearchLocate: React.FC<SearchLocateProps> = ({ openModal }) => {
  const dispatch = useAppDispatch();
  const { location } = useLocation();
  //TODO UPDATE THIS TO MATCH
  const role = "rider"

  const ROLES = {
    driver: "driver",
    rider: "rider"
  }
  const { origin, destination } = useSelector(selectSearchInfo)

  const userInfo = useAppSelector(selectUserInfo);

  const { type } = useSelector(selectSearchInfo)

  const [originName, setOriginName] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [focusedInput, setFocusedInput] = useState<"origin" | "destination" | null>(null);
  const [initialGeocodeComplete, setInitialGeocodeComplete] = useState(false);
  const [canRunAutoComplete, setCanRunAutoComplete] = useState(false)
  const [canRunGeocode, setCanRunGeocode] = useState(true)
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



  useEffect(() => {

    // console.log(origin, destination, "Viaiaiai")

    if (origin || (destination && origin)) {


      setCanRunAutoComplete(false) //If there was a value in state we want to just track it within the results
      setCanRunGeocode(false)

      setOriginName(origin?.name)
      setInitialLocation(origin) //Setting the initial location

      if (destination) {

        setDestinationName(destination.name)  //seting value in destination input to the name in state
        setPredictionDestination(destination)
      }
      //Make the origin field editable 
      setInitialGeocodeComplete(true)
    }



    if ((!origin && !destination) || (origin && !destination)) {
      destinationInputRef.current?.focus();
    }


  }, []);


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



  const geocodeQuery = useMemo(() => {

    //This wont run on initial  query , if there is an origin  || an origin and a  destination, 
    if (!initialGeocodeComplete && location?.lat && location?.lng) {
      return { lat: location.lat, lng: location.lng, type: 'origin' as const };
    }

    if (selectedPlaceId) {

      return { placeId: selectedPlaceId, type: focusedInput! }
    }


    return null;
  }, [initialGeocodeComplete, location, selectedPlaceId]);


  // console.log(geocodeQuery, "Qywyeuiohgffghjoiuytfghjoiuytrfghjk")
  const { data: geocodedResults, isSuccess: isGeocodeSuccess } = useGetGeocodedLocationQuery(geocodeQuery, {
    skip: !geocodeQuery || !canRunGeocode,
    refetchOnMountOrArgChange: true
  });



  const autoCompleteQuery = useMemo(() => {
    const input = focusedInput === "origin" ? manualDebouncedOrigin : manualDebouncedDestination


    const response = manualDebouncedOrigin?.length > 1 || manualDebouncedDestination.length > 1 ? {
      type: focusedInput || "destination",
      input,
      component: `country:${userInfo.country?.short_name}`,
      establishment: focusedInput === "destination" ? "bus_station" : ""
    } : undefined

    return input && response ?
      response : undefined

  }, [focusedInput, manualDebouncedDestination, manualDebouncedOrigin, userInfo.country])

  console.log(autoCompleteQuery, "NIccce")

  const { data: autocompleteResults, isSuccess: isAutoCompleteSuccess, isLoading: isAutocompleteLoading, isFetching: isAutocompleteFetching } = useGetAutoCompleteDataQuery(autoCompleteQuery, {
    skip: !autoCompleteQuery || !canRunAutoComplete
  });



  // useEffect(() => {



  //   if (geocodedResults && isGeocodeSuccess && initialGeocodeComplete) {
  //     //This is now a geocode query after initial load  

  //     const parsed = JSON.parse(geocodedResults);
  //     if (parsed?.results?.length > 0) {



  //       let state: string = "";
  //       let country: string = "";
  //       let city: string = "";

  //       parsed?.results[0]?.address_components.forEach((item: Record<string, string>) => {
  //         if (item.types.includes("administrative_area_level_2")) {
  //           city = item.long_name;
  //         }
  //         if (item.types.includes("administrative_area_level_1")) {
  //           state = item.long_name;
  //         }
  //         if (item.types.includes("country")) {
  //           country = item.long_name;
  //         }
  //       });


  //       const locationInfo = {
  //         name: parsed.results[0].formatted_address,
  //         placeId: parsed.results[0].place_id,
  //         coordinates: [parsed.results[0].geometry.location.lat,
  //         parsed.results[0].geometry.location.lng] as [number, number],
  //         state,
  //         town: city,
  //         country
  //       }

  //       const type = parsed?.type


  //       if (type === "origin") {
  //         //Set  both initial and predicted to this value 
  //         setInitialLocation(locationInfo)

  //         setPredictionLocation(locationInfo)

  //       }
  //       else {
  //         setInitialDestination(locationInfo)

  //         setPredictionDestination(locationInfo)
  //       }


  //     }

  //   }

  //   if (geocodedResults && isGeocodeSuccess && !initialGeocodeComplete) {
  //     const parsed = JSON.parse(geocodedResults);
  //     if (parsed?.results?.length > 0) {

  //       let state: string = "";
  //       let country: string = "";
  //       let city: string = "";

  //       parsed?.results[0]?.address_components.forEach((item: Record<string, string>) => {
  //         if (item.types.includes("administrative_area_level_2")) {
  //           city = item.long_name;
  //         }
  //         if (item.types.includes("administrative_area_level_1")) {
  //           state = item.long_name;
  //         }
  //         if (item.types.includes("country")) {
  //           country = item.long_name;
  //         }
  //       });


  //       const locationInfo = {
  //         name: parsed.results[0].formatted_address,
  //         placeId: parsed.results[0].place_id,
  //         coordinates: [parsed.results[0].geometry.location.lat,
  //         parsed.results[0].geometry.location.lng] as [number, number],
  //         state,
  //         town: city,
  //         country
  //       }


  //       setInitialLocation(locationInfo)  //This is where we keep the initial geocoded location so we can compare when the field is blurred
  //       setPredictionLocation(undefined)

  //       setOriginName(parsed.results[0].formatted_address);

  //       setInitialGeocodeComplete(true);
  //     }
  //   }

  //   // setSelectedPlaceId(undefined)


  // }, [geocodedResults, isGeocodeSuccess, initialGeocodeComplete]);

  useEffect(() => {
    console.log(isAutoCompleteSuccess, "isSuccess")
    if (geocodedResults && isGeocodeSuccess) {
      const parsed = JSON.parse(geocodedResults);
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
        const locationInfo = {
          name: parsed.results[0].formatted_address,
          placeId: parsed.results[0].place_id,
          coordinates: [parsed.results[0].geometry.location.lat,
          parsed.results[0].geometry.location.lng] as [number, number],
          state,
          town: city,
          country
        }

        const type = parsed?.type;
        if (type === "origin") {
          setInitialLocation(locationInfo);
          setPredictionLocation(locationInfo);
          if (!initialGeocodeComplete) {
            setOriginName(parsed.results[0].formatted_address);
            setInitialGeocodeComplete(true);
          }
        } else {
          setInitialDestination(locationInfo);
          setPredictionDestination(locationInfo);
        }
      }
    }
  }, [geocodedResults, isGeocodeSuccess, initialGeocodeComplete]);


  useEffect(() => {

    // console.log(predictionDestination, predictionLocation, initialLocation, destinationNameEdited, originNameEdited, "eNTREWW WW dATE")

    if (predictionDestination && (initialLocation || predictionLocation) && (destinationNameEdited || originNameEdited)) {
      //Close the sheet, dispatch the action 
      dispatch(setOrigin(predictionLocation ?? initialLocation!))
      dispatch(setDestination(predictionDestination))

      //Close the sheet   
      setTimeout(() => {

        openModal(false)
      }, 100)

    }

  }, [initialLocation, predictionLocation, predictionDestination, destinationNameEdited, originNameEdited])


  useEffect(() => {

    if (autocompleteResults && isAutoCompleteSuccess) {

      const parsed = JSON.parse(autocompleteResults);

      if (parsed?.predictions) {

        setPredictions(prev => parsed.predictions);
      }
    } else {
      console.log("LOmemmemem")
      setPredictions(locations.slice(0, 6))
    }
  }, [autocompleteResults, isAutoCompleteSuccess, debouncedDestinationName, debouncedOriginName]);


  const handleInputChange = useCallback((text: string, inputType: "origin" | "destination") => {


    // console.log("RANNNNNNNN")
    //Ensure to set autocomplete to true incase its been set to false
    setCanRunAutoComplete(true)
    setCanRunGeocode(true)


    if (inputType === "origin") {

      setOriginName(text);

      // if (!originNameEdited) setOriginNameEdited(true);

      if (predictionLocation) {

        setPredictionLocation(undefined)
      }

    } else {
      setDestinationName(text);

      // if (!destinationNameEdited) setDestinationNameEdited(true);
      if (predictionDestination) {

        setPredictionDestination(undefined)
      }
    }
    if (!text) {
      console.log("simsmmsm")
      setPredictions(locations);
    }
  }, []);

  const handleBlur = (inputType: string) => {

    console.log(inputType, "BLURREDDDDDD")
    // console.log(predictionLocation, selectedPlaceId)

    setCanRunAutoComplete(false)

    if (inputType === "origin") {
      //Check if there is prediction location if there isnt , set the origin name to initialLocation but not before setting canRunAutocomplete to false

      if ((!predictionLocation && !selectedPlaceId) || !selectedPlaceId) {


        setOriginName(initialLocation?.name || "Unnamed road")
        // console.log(initialLocation, "OnBlur")

        setPredictionLocation(initialLocation)

      }

    }


  }


  const handlePredictionSelection = (prediction: PredictionOrLocation) => {

    //Prevent an automplete query
    setCanRunAutoComplete(false)

    const isPrediction = "structured_formatting" in prediction || "reference" in prediction

    if (isPrediction) {


      console.log("Van")

      if (focusedInput === "origin") {
        setOriginName(prediction.description);
        if (!originNameEdited) setOriginNameEdited(true);
        setSelectedPlaceId(prediction.place_id)

      } else {

        setDestinationName(prediction.description);
        // console.log("RUNNING POINT")
        if (!destinationNameEdited) setDestinationNameEdited(true);
        setSelectedPlaceId(prediction.place_id)
      }
    }
    else {
      //A cached location was picked , which means we can just automatically set the information withot geocoding
      if (initialGeocodeComplete) {
        //Make sure not to stop the initial location geocode when selecting a cached place 
        setCanRunGeocode(false)
      }

      console.log(canRunAutoComplete)
      if (focusedInput === "origin") {
        setOriginName(`${prediction.town} - ${prediction.state}, ${prediction.country} `);
        if (!originNameEdited) setOriginNameEdited(true);

        setPredictionLocation(prediction)
        // setSelectedPlaceId(prediction.place_id)

      } else {
        console.log("Nissane")
        // console.log(canRunAutoComplete, "Ekse")
        setDestinationName(`${prediction.town} - ${prediction.state}, ${prediction.country} `)
        // // console.log("RUNNING POINT")
        if (!destinationNameEdited) setDestinationNameEdited(true);

        setPredictionDestination(prediction)
        // setSelectedPlaceId(prediction.place_id)
      }

      //We also need to set a selected place id for the condition in handle blur to happen if the user does not select any prediction on the origin input
      setSelectedPlaceId(prediction.placeId)

    }


    Keyboard.dismiss()

    // setPredictions(locations.slice(0, 3));

  }

  const renderInput = useCallback((
    inputType: "origin" | "destination",
    value: string,
    placeholder: string,
    ref: React.RefObject<TextInput>
  ) => (
    <View className='w-[90%] rounded-md relative'>
      <Input
        ref={ref}
        selectTextOnFocus={true}
        // onPressIn={}
        value={value}
        onFocus={() => handleInputFocus(inputType)}
        onBlur={() => handleBlur(inputType)}
        className={`border-none border-0 h-10 bg-accent border-transparent font-medium text-[8px] cursor:text-gray-500 text-muted-foreground px-2 py-1 ${focusedInput === inputType ? "border-2 border-blue-600" : "border-2 border-gray-200"}`}
        placeholder={placeholder}
        onChangeText={(text) => handleInputChange(text, inputType)}
        editable={inputType === "destination" || initialGeocodeComplete}
        style={{ fontSize: 14 }}
      />

    </View>
  ), [focusedInput, initialGeocodeComplete, handleInputFocus, handleInputChange]);


  return (
    <View className=''>
      <View className='px-4'>
        <View className='flex flex-col gap-y-1.5'>
          <View className='flex flex-row items-center gap-x-2'>
            <View className='flex flex-col w-[5%] items-center gap-y-2'>
              <View className='rounded-full h-6 w-6 bg-blue-800/10 flex flex-row justify-center items-center'>
                <View className='bg-primary/60 h-3 w-3 rounded-full' />
              </View>
            </View>
            {renderInput("origin", originName, initialGeocodeComplete ? "Enter origin" : "Retrieving location...", originInputRef)}
          </View>

          <View className='relative'>
            <Separator className='h-6 w-[1px] bg-transparent absolute border-l-[2px] border-blue-600/80' orientation='vertical' style={{ left: 8, top: -12 }} />
          </View>

          <View className='flex flex-row items-center gap-x-2'>
            <View className='flex flex-col w-[5%] items-center gap-y-2'>
              <View className='rounded-full h-6 w-6 bg-blue-800/10 flex flex-row justify-center items-center'>
                <View className='bg-primary/80 h-3 w-3 rounded-full' />
              </View>
            </View>
            {renderInput("destination", destinationName, "Search towns e.g Ikeja", destinationInputRef)}
          </View>
        </View>
      </View>

      <Separator className='bg-slate-300/80 mt-4' orientation='horizontal' />

      <View className='space-y-6 px-4'>
        <View className='gap-y-2 mt-4'>

          <TownsList
            // locations={locations}
            predictions={predictions}
            onPress={handlePredictionSelection}
            isLoading={isAutocompleteLoading || isAutocompleteFetching} />


          {
            type === "courier" || role === ROLES?.DRIVER || focusedInput === "origin" &&

            <Button
              variant="ghost"
              className='h-10 flex flex-row gap-x-3.5 w-full text-left my-2'
              onPress={() => {
                router.push({
                  pathname: "/summary",
                  params: {
                    type: "couri",
                    name: `${type === "courier" ? "Package" : "Ride"} details`,
                  }
                });
              }}
            >
              <Locate size={28} className="pl-0 text-primary" />
              <Text variant="subhead" color="secondary">Set location on map</Text>
            </Button>
          }
          {/* {predictions.map((prediction, index) => (
            <Button
              key={prediction.place_id}
              variant="ghost"
              onPress={() => handlePredictionSelection(prediction)}
              className='mt-0.5'
            >
              <StationList prediction={prediction} isLast={index === predictions.length - 1} iconSize={24} />

            </Button>
          ))} */}
        </View>

        {/* <View className='w-full'>
          <Button
            variant="ghost"
            className='h-10 flex flex-row gap-x-3.5 w-full text-left my-3'
            onPress={() => {
              router.push({
                pathname: "/summary",
                params: {
                  type: "couri",
                  name: `${type === "courier" ? "Package" : "Ride"} details`,
                }
              });
            }}
          >
            <Locate size={24} className="pl-0 text-gray-600/80" />
            <Text variant="body" color="secondary">Set location on map</Text>
          </Button>
        </View> */}
      </View>
    </View>
  );
};

export default SearchLocate;