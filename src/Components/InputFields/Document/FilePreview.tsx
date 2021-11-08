import React from 'react';
import { Image, View, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from 'expo-sharing';
import { Video } from 'expo-av';
import { DocStyles } from './DocumentStyles';

export const filePreview = (uri: string) => {
    if (Platform.OS == "android") {
        FileSystem.getContentUriAsync(uri!).then(cUri => {
            IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: cUri,
                flags: 1,
            });
        });
    } else {
        Sharing.shareAsync(uri!);
    };
};

export const imagePreview = ({ route }: any) => {
    return (
        <View style={DocStyles.container}>
            <Image source={{ uri: route.params.uri }} resizeMode="cover" style={DocStyles.img} />
        </View>
    );
};

export const videoPreview = ({ route }: any) => {
    return (
        <View style={DocStyles.videoContainer}>
            <Video
                style={DocStyles.video}
                source={{ uri: route.params.uri }}
                useNativeControls={true}
            />
        </View>
    );
};


