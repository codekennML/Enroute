// ContactSelector.js
import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

const useContactSelector = () => {
    const [isSelecting, setIsSelecting] = useState(false);

    const openSettings = async () => {
        Alert.alert(
            'Contacts Permission Denied',
            'We need access to your address book  to add your emergency contacts. Please enable it in settings.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() }
            ]
        );
    };

    const selectContact = async () => {
        console.log("Starting contact selection");
        setIsSelecting(true);

        try {



            const { status } = await Contacts.requestPermissionsAsync();



            if (status !== 'granted') {
                Alert.alert(
                    "Permission Denied",
                    "We need access to your contacts to continue. Would you like to open settings and grant permission?",
                    [
                        {
                            text: "Open Settings",
                            onPress: () => {
                                openSettings();
                                setIsSelecting(false);
                            }
                        },
                        {
                            text: "Cancel",
                            style: "cancel",
                            onPress: () => setIsSelecting(false)
                        }
                    ]
                );
                return null;
            }

            const contact = await Contacts.presentContactPickerAsync(

            );


            if (!contact) {
                console.log("No contact selected");
                setIsSelecting(false);
                return null;
            }

            const phoneNumber = contact.phoneNumbers && contact.phoneNumbers[0] ? contact.phoneNumbers[0].number : '';

            if (!phoneNumber) {
                Alert.alert("Invalid Contact", "The selected contact does not have a phone number.");
                setIsSelecting(false);
                return null;
            }

            const countryCode = phoneNumber.startsWith('+') ? phoneNumber.split(' ')[0].replace('+', '') : '1';

            const mobile = phoneNumber.replace(/\D/g, '').slice(-10);

            setIsSelecting(false);
            return {
                id: contact.id,
                firstName: contact.firstName || '',
                lastName: contact.lastName || '',
                mobile: parseInt(mobile),
                countryCode: parseInt(countryCode),
            };

        } catch (error) {
            console.error("Error selecting contact:", error);
            Alert.alert("Error", "An error occurred while selecting the contact. Please try again.");
            setIsSelecting(false);
            return null;
        }
    };

    return { selectContact, isSelecting };
};

export default useContactSelector;