import { LucideIcon } from 'lucide-react-native'


interface Location {
  coordinates: [number, number]
  placeId: string
  name: string
  town?: string,
  state?: string,
  country?: string

}

interface SearchProps {
  title: string,
  subtitle: string,
  services: Array<string> //"ride" | "package" | "share",
  LeftIcon: LucideIcon,
  // rightIconName?: ComponentProps<typeof LucideIcon>
  action: () => void

}


export interface RiderData {
  firstName: string,
  lastName: string
  countryCode: number,
  mobile: string,
  id?: string,
  added?: boolean
}

export interface UserPackageInfo {
  rideId?: string
  recipient?: RiderData
  origin?: Location,
  destination?: Location,
  comments: string
  description: string
  when?: string //stringified Date
  express?: boolean
  budget: number
  type: string
}

export interface UserRideInfo {
  recipient: never[]
  rideId?: string
  budget: number,
  busStopName: string
  scheduledPickupLocation?: string //This is for the pickup location of the scheduled rides originating from the schedule page 
  riders: RiderData[],
  origin?: Location,
  destination?: Location,
  when?: string  //Stringified Date so we can use it in redux 
  luggage: string,
  charter?: boolean
  type: string

}

export type UserInfo = {
  country?: Omit<Location, "placeId" | "town" | "state" | "country"> & { short_name?: string, currency: string },
  state?: Omit<Location, "placeId" | "town" | "state" | "country">
  firstName?: string
  lastName?: string
  roles?: number
  subRole?: number
  lastName: string
  avatar?: string
  _id?: string,
  email?: string
  mobile?: string,
  verified?: boolean
  // type: string 
  countryCode?: number,
  deviceToken?: string
  currentLocation?: Location
} | undefined

export type UserUpdateData = Partial<Omit<UserInfo, "country" | "state" | "roles" | "subRole" | "ratings">>

export type RideInfo = UserRideInfo | IserPackageInfo

interface MatchedSubstring {
  length: number;
  offset: number;
}

interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

interface Term {
  offset: number;
  value: string;
}

export interface Prediction {
  description: string;
  matched_substrings?: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms?: Term[];
  types: string[];
}

export interface AutocompleteResponse {
  predictions: Prediction[];
}