import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { CheckCircle } from '@/lib/icons/icons'
import { router } from 'expo-router'

interface AccountInfo {
    name: string
    mobile: string
}

const duplicateAccount = () => {

    const [selectedAccount, setSelectedAccount] = useState<'existing' | 'new' | null>(null)

    const existingAccount: AccountInfo = {
        name: "John Doe",
        mobile: "+1 (555) 123-4567"
    }

    const newAccount: AccountInfo = {
        name: "Jane Smith",
        mobile: "+1 (555) 987-6543"
    }

    const handleContinue = () => {
        if (selectedAccount) {
            console.log(`Continuing with ${selectedAccount} account`)
            // Add your logic to proceed with the selected account
        }
    }

    const AccountCard = ({ type, account }: { type: 'existing' | 'new', account: AccountInfo }) => (
        <Button
            variant="outline"
            className={`p-4 mb-4 rounded-lg ${selectedAccount === type ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
            onPress={() => setSelectedAccount(type)}
        >
            <View className="flex-row justify-between items-center w-full">
                <View>
                    <Text variant="subhead" className="font-semibold mb-1">{type === 'existing' ? 'Existing Account' : 'New Account'}</Text>
                    <Text variant="body" className="text-gray-600">{account.name}</Text>
                    <Text variant="body" className="text-gray-600">{account.mobile}</Text>
                </View>
                {selectedAccount === type && (
                    <CheckCircle size={24} color="#3b82f6" />
                )}
            </View>
        </Button>
    )

    return (
        <View className="bg-white p-6 flex flex-col h-full">
            <View className="flex-1">
                <Text variant="heading" className="text-foreground mb-6">Choose Your Account</Text>

                <Text variant="body" className="text-foreground mb-4">
                    We've found an existing account associated with your information. Please choose which account you'd like to continue with:
                </Text>

                <AccountCard type="existing" account={existingAccount} />
                <AccountCard type="new" account={newAccount} />
            </View>

            <View className="mt-6">
                <Button
                    variant={"default"}
                    rounded={"base"}
                    onPress={() => {
                        router.push({
                            pathname: "/(tabs)"
                        })
                    }}
                    // onPress={handleContinue}
                    disabled={!selectedAccount}
                    className={`py-3 flex items-center justify-center text-white ${!selectedAccount ? 'opacity-70' : ''}`}
                >
                    <Text variant="subhead" className="font-medium text-white ">Continue</Text>
                </Button>
            </View>
        </View>
    )
}

export default duplicateAccount