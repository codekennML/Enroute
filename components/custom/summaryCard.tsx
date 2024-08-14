import { PenLine } from "@/lib/icons/icons";
import { Button } from "../ui/button";
import { View } from "react-native";
import { Text } from "@/components/ui/text"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { summaryInfo } from "@/app/summary";
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
                    const location = tripInfo?.origin?.town ? `${tripInfo.origin?.town}, ${tripInfo.origin?.state}` : "Pick-up location"

                    const destination = tripInfo?.destination ? `${tripInfo?.destination?.town}, ${tripInfo.destination?.state}` : "Destination"

                    setSubtitle(`${location} / ${destination}`)
                    break

                case "pickupLocation": {
                    const title = tripInfo?.scheduledPickupLocation ? tripInfo?.scheduledPickupLocation : summary.title

                    setSubtitle(title)
                }

                case "busStopName":
                    setSubtitle(tripInfo?.busStopName ? tripInfo.busStopName : summary.subtitle)

                    break

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
                    setSubtitle(tripInfo?.budget ? tripInfo?.budget : summary.subtitle)
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
    }, [tripInfo])

    return <Card className='mt-3 shadow-none w-full rounded-md bg-transparent' key={summary.id}>
        <CardContent className='max-w-full flex flex-row justify-between items-center'>
            <View className='flex flex-row items-center justify-center gap-x-3'>
                <View>
                    <CardHeader className='p-0 flex flex-row space-y-0'>
                        <View>
                            <CardTitle className='pt-2 flex flex-row justify-between'>
                                <Text variant="body">{summary.title}</Text>
                            </CardTitle>
                        </View>
                    </CardHeader>
                    <CardDescription className="font-medium mt-2  ">
                        {subtitle}
                    </CardDescription>
                </View>
            </View>
            <View className='rounded-md'>
                <Button variant="ghost" onPress={() => handleSheetToOpen(summary.sheetName)}>
                    <PenLine size={20} className='text-blue-800/80' />
                </Button>
            </View>
        </CardContent>
    </Card>

}



export default SummaryCard