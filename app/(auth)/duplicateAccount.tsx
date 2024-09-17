import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { CheckCircle } from '@/lib/icons/icons'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useHandleDuplicateRolesAccountMutation } from '@/redux/api/auth'
import { useWrappedErrorHandling } from '@/lib/useErrorHandling'
import { parse } from 'react-native-svg'
import { updateOtherUserData } from '@/redux/slices/user'
import { useAppDispatch } from '@/redux/hooks'
import { setItemAsync } from 'expo-secure-store'
import { showToast } from '@/redux/slices/toast'

interface AccountInfo {
    _id: string
    name: string
    mobile?: string
    email?: string
}

interface User {

    _id: string,
    firstName?: string,
    lastName?: string,
    mobile?: string,
    countryCode?: string,
    email?: string
}

interface DuplicateAccountParams {
    users: User[],
    currentUser: User,
    mobile: string,
    countryCode: string,
    isNonMobileSignup: string
    alterToken: string

}

const duplicateAccount = () => {

    const dispatch = useAppDispatch()

    const [selectedAccount, setSelectedAccount] = useState<'current' | 'duplicate' | null>("current")

    const [dispatchHandleDuplicateAccount] = useHandleDuplicateRolesAccountMutation()
    const { error, handleError, wrapWithHandling } = useWrappedErrorHandling()

    const { users, currentUser, mobile, isNonMobileSignup, countryCode, alterToken } = useLocalSearchParams<DuplicateAccountParams>()


    const parsedUsers = JSON.parse(users)
    const parsedCurrentUser = JSON.parse(currentUser)

    const duplicateUserIndex = parsedUsers.findIndex(user => user?._id !== currentUser?._id) as number

    const currentAccount: AccountInfo = {
        name: parsedCurrentUser?.firstName ? `${parsedCurrentUser?.firstName} ${parsedCurrentUser?.lastName}` : "Unverified account",
        // mobile: `+${parsedCurrentUser?.countryCode}${parsedCurrentUser?.mobile} `,
        email: parsedCurrentUser?.email,
        _id: parsedCurrentUser?._id

    }

    const duplicateAccount: AccountInfo = {
        name: parsedUsers[duplicateUserIndex]?.firstName ? `${parsedUsers[duplicateUserIndex]?.firstName} ${parsedUsers[duplicateUserIndex]?.lastName}` : "Unverified user",
        mobile: `+${parsedUsers[duplicateUserIndex]?.countryCode}${parsedUsers[duplicateUserIndex]?.mobile} `,
        _id: parsedUsers[duplicateUserIndex]?._id

    }


    const handleDispatch = async () => {

        const selectedAccountData = selectedAccount === "current" ? currentAccount : duplicateAccount


        console.log(currentAccount, "miiaiaiia", duplicateAccount, "umsushshsjs", selectedAccount, "MIZXXSS")


        if (selectedAccountData) {


            const request = {
                user: currentAccount?._id!,
                alterToken: alterToken!,
                selectedAccount: {
                    id: selectedAccountData?._id
                },
                accountToArchive: {
                    id: selectedAccountData?._id === currentAccount?._id ? duplicateAccount?._id : currentAccount?._id
                },
                mobile,
                isNonMobileSignup: isNonMobileSignup === "true" ? true : false,
                countryCode,
            }


            try {

                const { data, error } = await dispatchHandleDuplicateAccount(request)

                if (error) {
                    dispatch(showToast({
                        message: "An unknown error has occurred. Please try again or contact support",
                        notification: "danger",
                        type: "foreground",
                        title: "Error"

                    }))

                    router.replace({
                        pathname: "(auth)",

                    })
                }

                const { next, roles, verified, user, firstName, avatar } = data

                //Set the user ID into secure store for when we need to revalidate the data on app waking 
                await setItemAsync(process.env.EXPO_PUBLIC_USER_IDENTIFIER, user)
                //Set the user info into state 

                await dispatch(updateOtherUserData({
                    roles,
                    avatar,
                    firstName,
                    verified,
                    _id: user
                }))


                router.replace({
                    pathname: next
                })



                router.replace({
                    pathname: next,

                })


            } catch (e) {

                dispatch(showToast({
                    message: "An unknown error has occurred. Please try again or contact support",
                    notification: "danger",
                    type: "foreground",
                    title: "Error"

                }))

                router.replace({
                    pathname: "(auth)",

                })
            }

            // Add your logic to proceed with the selected account
        }


    }

    const handleContinue = async () => {

        const wrappedDispatch = wrapWithHandling(handleDispatch)
        await wrappedDispatch()


    }

    const AccountCard = ({ type, account }: { type: 'current' | 'duplicate', account: AccountInfo }) => (
        <Button
            variant="outline"
            className={`p-4 mb-4 rounded-lg ${selectedAccount === type ? 'border-2 border-primary' : 'border border-border'}`}
            onPress={() => setSelectedAccount(type)}
        >
            <View className="flex-row justify-between items-center w-full">
                <View>
                    <Text className="font-semibold mb-1 text-primary">{type === 'current' ? 'New Account' : 'Existing Account'}</Text>
                    <Text variant="body" className="text-muted-foreground">{account.name}</Text>
                    <Text variant="body" className="text-muted-foreground">{account.mobile ? account.mobile : account?.email}</Text>
                </View>
                {selectedAccount === type && (
                    <CheckCircle size={24} color="#3b82f6" className='text-primary' />
                )}
            </View>
        </Button>
    )

    return (
        <SafeAreaView>
            <View className="bg-white p-6 flex flex-col h-full">

                <View className="flex-1 mt-2">
                    <Text variant="heading" className="text-foreground mb-4">Choose your account</Text>

                    <Text variant="body" className="text-muted-foreground mb-6">
                        We've found an existing account associated with your information. Please choose which account you'd like to continue with:
                    </Text>
                    <View className='flex-col gap-y-3'>
                        <AccountCard type="current" account={currentAccount} />
                        <AccountCard type="duplicate" account={duplicateAccount} />

                    </View>
                </View>

                <View className="mt-6">
                    <Button
                        variant={"default"}
                        rounded={"base"}
                        size={"lg"}
                        onPress={handleContinue}
                        disabled={!selectedAccount}
                        className={`py-3 flex items-center justify-center text-white ${!selectedAccount ? 'opacity-70' : ''}`}
                    >
                        <Text variant="subhead" className="font-medium text-white ">Continue</Text>
                    </Button>
                </View>
            </View>


        </SafeAreaView>
    )
}

export default duplicateAccount



// import React, { useState } from 'react'
// import { View } from 'react-native'
// import { Text } from '@/components/ui/text'
// import { Button } from '@/components/ui/button'
// import { CheckCircle } from '@/lib/icons/icons'
// import { router } from 'expo-router'

// interface AccountInfo {
//     name: string
//     mobile: string
// }

// const duplicateAccount = () => {

//     const [selectedAccount, setSelectedAccount] = useState<'existing' | 'new' | null>(null)

//     const existingAccount: AccountInfo = {
//         name: "John Doe",
//         mobile: "+1 (555) 123-4567"
//     }

//     const newAccount: AccountInfo = {
//         name: "Jane Smith",
//         mobile: "+1 (555) 987-6543"
//     }

//     const handleContinue = () => {
//         if (selectedAccount) {
//             console.log(`Continuing with ${selectedAccount} account`)
//             // Add your logic to proceed with the selected account
//         }
//     }

//     const AccountCard = ({ type, account }: { type: 'existing' | 'new', account: AccountInfo }) => {
//         console.log(type, type === "existing", typeof type)

//         const title = type === 'existing' ? 'Existing Account' : 'New Account'
//         console.log(title)

//         return (
//             <Button
//                 variant="outline"
//                 className={`p-4 mb-4 rounded-lg ${selectedAccount === type ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
//                 onPress={() => setSelectedAccount(type)}
//             >
//                 <View className="flex-row justify-between items-center w-full">
//                     <View>
//                         <Text variant={"smallTitle"} className='text-foreground' >{title}</Text>
//                         <Text variant="body" className="text-gray-600">{account.name}</Text>
//                         <Text variant="body" className="text-gray-600">{account.mobile}</Text>
//                     </View>
//                     {selectedAccount === type && (
//                         <CheckCircle size={24} color="#3b82f6" />
//                     )}
//                 </View>
//             </Button>
//         )

//     }

//     return (
//         <View className="bg-white p-6 flex flex-col h-full">
//             <View className="flex-1">
//                 <Text variant="heading" className="text-foreground mb-6">Choose Your Account</Text>

//                 <Text variant="body" className="text-foreground mb-4">
//                     We've found an existing account associated with your information. Please choose which account you'd like to continue with:
//                 </Text>

//                 <AccountCard type="existing" account={existingAccount} />
//                 <AccountCard type="new" account={newAccount} />
//             </View>

//             <View className="mt-6">
//                 <Button
//                     variant={"default"}
//                     rounded={"base"}
//                     onPress={() => {
//                         router.push({
//                             pathname: "/(tabs)"
//                         })
//                     }}
//                     // onPress={handleContinue}
//                     disabled={!selectedAccount}
//                     className={`py-3 flex items-center justify-center text-white ${!selectedAccount ? 'opacity-70' : ''}`}
//                 >
//                     <Text variant="subhead" className="font-medium text-white ">Continue</Text>
//                 </Button>
//             </View>
//         </View>
//     )
// }

// export default duplicateAccount