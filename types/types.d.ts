import { LucideIcon } from 'lucide-react-native'


interface Location {
  lat: number,
  lng: number,
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
  name: string,
  countryCode: number,
  mobile: number,
  active: boolean

}

export interface UserPackageInfo {
  rideId?: string
  recipient?: RiderData
  origin?: Location,
  destination?: Location,
  comments: string
  now: boolean,
  when?: Date
  express?: boolean
  budget: number
  type: string
}

export interface UserRideInfo {
  rideId?: string
  budget: number,
  riders: RiderData[],
  seats: number
  origin?: Location,
  destination?: Location,
  now: boolean,
  when?: Date
  luggage: boolean,
  charter: boolean
  type: string


}

export interface UserInfo {
  country?: Omit<Location, "placeId" | "town" | "state" | "country"> & { short_name?: string },
  state?: Omit<Location, "placeId" | "town" | "state" | "country">
  name: string
  avatar: string
  _id: string,
  email: string
  mobile: number,
  type: string
  countryCode: number,
}

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