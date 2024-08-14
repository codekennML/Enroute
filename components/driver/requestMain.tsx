import { useEffect, useState } from 'react';
import IncomingRideRequestCard from './requestCard';
import { View, Text } from 'react-native'
import React from 'react'
import NewFinalizedRideCard from './newRidePickup';

const RequestMain = () => {
    //We need to get the current ws info for the ride info
    const [rideRequest, setRideRequest] = useState(null);


    useEffect(() => {
        // When a new ride request comes in:
        setRideRequest({
            passengerPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
            passengerName: 'John Doe',
            passengerRating: 4.8,
            pickupLocation: '123 Main St, City',
            dropoffLocation: '456 Elm St, City',
            estimatedFare: '350',
            estimatedDistance: 5.2,
            estimatedDuration: 15,
        });
    }, [])

    return (
        <View>
            {/* 
            {rideRequest && (
                <IncomingRideRequestCard
                    request={rideRequest}
                    onAccept={() => {
                        // Handle ride acceptance
                        console.log('Ride accepted');
                        setRideRequest(null);
                    }}
                    onDecline={() => {

                        console.log('Ride declined');
                        setRideRequest(null);
                    }}
                />
            )} */}

            {
                rideRequest && <NewFinalizedRideCard request={rideRequest} />
            }
        </View>
    )
}

export default RequestMain


