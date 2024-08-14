import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { useTailwind } from 'tailwind-rn';

export default function SelfieScreen() {
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);
  const tw = useTailwind();

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
      // Handle the captured photo here
    }
  };

  return (
    <View style={tw('flex-1 bg-black')}>
      <Camera
        style={tw('flex-1')}
        type={type}
        ref={cameraRef}
      >
        <View style={tw('flex-1 bg-transparent')}>
          {/* Face guide circle */}
          <View style={tw('absolute inset-0 items-center justify-center')}>
            <View style={tw('w-64 h-64 rounded-full border-4 border-white opacity-50')} />
          </View>

          {/* Capture button */}
          <View style={tw('absolute inset-x-0 bottom-10 flex-row justify-center')}>
            <TouchableOpacity
              onPress={takePicture}
              style={tw('w-20 h-20 rounded-full bg-white items-center justify-center')}
            >
              <View style={tw('w-16 h-16 rounded-full bg-white border-4 border-black')} />
            </TouchableOpacity>
          </View>

          {/* Flip camera button */}
          <TouchableOpacity
            style={tw('absolute top-10 right-10')}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={tw('text-white text-lg')}>Flip</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}