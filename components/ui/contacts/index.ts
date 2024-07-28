// ContactSelector.js
import * as Contacts from 'expo-contacts';

const useContactSelector = async () => {

    console.log("Missi")
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {


        const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });

        let contact;

        if (data.length > 0) {
            contact = data[0];
        }

        if (contact && contact?.phoneNumbers) {
            const phoneNumber = contact.phoneNumbers && contact.phoneNumbers[0] ? contact.phoneNumbers[0].number : '';
            const countryCode = phoneNumber?.startsWith('+') ? phoneNumber.split(' ')[0] : '+1';
            const mobile = phoneNumber?.replace(/\D/g, '').slice(-10);

            return {
                id: contact.id,
                firstName: contact.firstName || '',
                lastName: contact.lastName || '',
                mobile,
                countryCode,
            };
        }
    }
    return null;
};

export default useContactSelector