import { PenLine } from "@/lib/icons/icons";
import { Button } from "../ui/button";
import { View } from "react-native";
import { Text } from "@/components/ui/text"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { summaryInfo } from "@/app/rider/trip/summary";
import { useSelector } from "react-redux";
import { selectSearchInfo } from "@/redux/slices/search";
import { useEffect, useState } from "react";
import { selectUserInfo } from "@/redux/slices/user";

interface SummaryCardProps {
    handleSheetToOpen: (value: string) => void
    summary: summaryInfo
}



const SummaryCard: React.FC<SummaryCardProps> = ({ summary, handleSheetToOpen }) => {

    const [subtitle, setSubtitle] = useState<T>("")

    const tripInfo = useSelector(selectSearchInfo)

    const userInfo = useSelector(selectUserInfo)



    useEffect(() => {

        const handleSubTitle = (name: string) => {

            switch (name) {

                case "destination":
                    console.log(tripInfo)
                    const location = tripInfo?.type === "courier" ? tripInfo?.origin?.name : tripInfo?.origin?.town ? `${tripInfo.origin?.name} ${tripInfo.origin?.town?.name}, ${tripInfo.origin?.state?.name}` : tripInfo?.origin?.name ? tripInfo?.origin?.name : "Pick-up location"

                    const destination = tripInfo?.type === "courier" && tripInfo?.destination ? tripInfo?.destination?.name : tripInfo?.destination ? `${tripInfo?.destination?.name ? tripInfo?.destination?.name : ""}, ${tripInfo.destination?.state?.name ? tripInfo.destination?.state?.name : ""}, ${tripInfo.destination?.country?.name ? tripInfo.destination?.country?.name : ""}` : "Destination"

                    console.log(tripInfo?.origin, tripInfo?.destination, "Detinate")

                    setSubtitle(`${location}%${destination}`)
                    break

                // case "pickupLocation": {
                //     const title = tripInfo?.scheduledPickupLocation ? tripInfo?.scheduledPickupLocation : summary.title

                //     setSubtitle(title)
                // }

                // case "busStopName":
                //     setSubtitle(tripInfo?.busStopName ? tripInfo.busStopName : summary.subtitle)

                //     break

                case "luggage":

                    setSubtitle(tripInfo?.luggage ? tripInfo.luggage : summary.subtitle)
                    break

                case "recipient":
                    setSubtitle(tripInfo?.recipient ? `${tripInfo?.recipient?.firstName} ${tripInfo?.recipient?.lastName}  +${tripInfo?.recipient?.countryCode} ${tripInfo?.recipient?.mobile}` : summary?.subtitle)
                    break

                case "riders":

                    let details = `${userInfo.firstName} ${userInfo.lastName}`

                    if (tripInfo?.riders?.length === 1) {
                        details = ` ${tripInfo?.riders[0]?.firstName} ${tripInfo?.riders[0]?.lastName}`

                    }

                    if (tripInfo?.riders?.length > 1 && tripInfo?.riders[0]?.added) {
                        details = `${tripInfo?.riders[0]?.firstName} & ${tripInfo?.riders?.length - 1} more`
                    }

                    if (tripInfo?.riders?.length > 1 && !tripInfo?.riders[0]?.added) {

                        if (tripInfo?.riders?.length > 2) {

                            //There is a third person , thern we can show the more flag 
                            details = `${tripInfo?.riders[1]?.firstName} & ${tripInfo?.riders?.length - 2} more`
                        }
                        else {
                            details = `${tripInfo?.riders[1]?.firstName} ${tripInfo?.riders[1]?.lastName}`
                        }
                    }

                    setSubtitle(details)

                    break

                case "budget":
                    setSubtitle(`${userInfo?.country?.currency} ${tripInfo?.budget ? tripInfo?.budget : summary.subtitle}`)
                    break

                case "comments":
                    // console.log("KEY ==== COMMENTS", tripInfo?.comments, summary?.subtitle)
                    setSubtitle(tripInfo?.comments ? tripInfo?.comments : summary.subtitle)
                    break

                case "description":
                    // console.log("KEY ==== DESCRIPTION", tripInfo?.description, summary?.subtitle)
                    setSubtitle(tripInfo?.description ? tripInfo?.description : summary.subtitle)
                    break

                default:
                    setSubtitle(summary?.subtitle ?? "")
                    break
            }
        }
        handleSubTitle(summary?.name)

        // const route =   summary?.name === "destination" ? subtitle.split("/")  : `${ subtitle } `}

        // const location = Array.isArray(route) ?  route[0]  : ""
        // const destination = Array.isArray(route) ?route[1] : ""


    }, [tripInfo])

    return <Card className='mt-1 shadow-none w-full rounded-md bg-transparent border-b p-2 border-slate-200' key={summary.id}>
        <CardContent className='max-w-full flex flex-row justify-between items-center'>
            <View className='flex flex-row items-center justify-center gap-x-3'>
                <View>
                    <CardHeader className='p-0 flex flex-row justify-between items-center space-y-0 w-full'>
                        <View>
                            <CardTitle className='pt-1 flex flex-row justify-between'>
                                <Text variant="body" className="">{summary.title}</Text>

                            </CardTitle>
                        </View>
                        <View className='rounded-md'>
                            <Button variant="ghost" onPress={() => handleSheetToOpen(summary.sheetName)}>
                                <PenLine size={16} className='text-foreground dark:text-muted-foreground' />
                            </Button>
                        </View>
                    </CardHeader>
                    <View className="font-medium mt-1 ">
                        {
                            summary?.name === "destination" ?
                                <View className="flex-col gap-y-1 pt-1">
                                    <View className="flex-row items-center gap-x-2.5   ">
                                        <View className=" w-2 h-2 rounded-full bg-slate-100 border-2 border-pink-700"></View>
                                        <View className="flex-1">
                                            <Text className="text-ellipsis overflow-hidden whitespace-nowrap">
                                                {subtitle.split("%")[0]}
                                            </Text>
                                        </View>
                                    </View>
                                    <View className=" flex-row items-center gap-x-2.5">
                                        <View className="w-2 h-2 rounded-full border-primary border-2 bg-gray-100"></View>
                                        <View className="flex-1">
                                            <Text className="text-ellipsis overflow-hidden whitespace-nowrap">
                                                {subtitle.split("%")[1]}
                                            </Text>

                                        </View>
                                    </View>
                                </View> :

                                <Text>
                                    {subtitle}
                                </Text>

                        }

                    </View>
                </View>
            </View>

        </CardContent>
    </Card>

}



export default SummaryCard