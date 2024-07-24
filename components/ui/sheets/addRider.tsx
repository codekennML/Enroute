
import React, { useRef, forwardRef, useState, Dispatch, SetStateAction } from 'react'
import { Sheet, useSheetRef } from '../sheets'
// import { RiderData } from "@/app/(search)/index"
import { BottomSheetModal, BottomSheetView as View } from '@gorhom/bottom-sheet'
import { Text } from "@/components/ui/text"
import { Checkbox } from '../checkbox'
import { useAppSelector } from '@/redux/hooks'
import { selectSearchInfo } from '@/redux/slices/search'

interface AddRiderProps {
  snapPoints: string[],
  closeSheet: Dispatch<SetStateAction<string>>
}


const AddRider = forwardRef<BottomSheetModal, AddRiderProps>(
  ({ snapPoints, closeSheet }, ref) => {

    const [checked, setChecked] = useState(false);
    const tripInfo = useAppSelector(selectSearchInfo)

    // const handleSheetChanges = 


    // const [sheetToOpen, setSheetToOpen] =  useState<string>("")

    return (

      <Sheet ref={ref} snapPoints={snapPoints}  >
        <View>
          <Text variant="subhead" >
            Add  a rider
          </Text>
        </View>


        {
          "riders" in tripInfo &&
          tripInfo.riders.map((rider, index) => (
            <View key={index} className='flex flex-row justify-between items-center'>
              <View>
                <Text variant="body" className=''>
                  {tripInfo.riders[index].name}
                </Text>
              </View>
              <View>
                <Checkbox checked={checked} onCheckedChange={setChecked} />
              </View>
            </View>
          ))
        }


      </Sheet>

    )
  })



export default AddRider