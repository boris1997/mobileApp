import React, { useEffect, useState } from 'react';
import { View, Button, } from 'react-native';
import { Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import { CameraTemplateStyle } from './CameraTemplateStyle';

export const CameraTemplate = () => {
  const [uri, setUri] = useState<string>();

  const LaunchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setUri(result.uri);
      SaveImage(result.uri)
    }
  };

  useEffect(() => { LaunchCamera() }, []);

  const SaveImage = async (uri: string) => {
    await MediaLibrary.saveToLibraryAsync(uri);
  };

  return (
    <><View style={CameraTemplateStyle.container}>
      <Image source={{ uri: uri }} resizeMode="contain" style={CameraTemplateStyle.img} />
    </View>
      <View style={CameraTemplateStyle.buttonContainer}>
        <Button
          title={"Take photo"}
          onPress={LaunchCamera} />
      </View></>
  )
};




