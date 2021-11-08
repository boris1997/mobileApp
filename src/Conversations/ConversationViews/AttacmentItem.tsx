import React, { FC, useEffect, useState } from 'react';
import { Platform, Pressable, Text, Share, View, Image } from 'react-native';
import { IAttacmentItem } from '../Interfaces/IAttacmentItem';
import * as FileSystem from 'expo-file-system';
import { AttacmentItemStyle } from './ConversationViewsStyles/attacmentItemStyle';
import * as MediaLibrary from 'expo-media-library';
import { IAttachmentReferenceDetails } from '../../AppState/MessagingHubState/Interfaces/IAttachmentReferenceDetails';
import Constants from 'expo-constants';
import { useToast } from 'native-base';
import { DocStyles } from '../../Components/InputFields/Document/DocumentStyles';
import { useReduxSelector } from '../../AppState/Store';

const AttacmentItem: FC<IAttacmentItem> = ({ attachment }) => {
   
    const { sessionid, token } = useReduxSelector(state => state.Authentication);

    const toast = useToast()

    const [attachmentItem, updateAttachment] = useState<JSX.Element>(<View></View>);
    //TODO add video, audio, think about refactoring??
    useEffect(() => {
        if (attachment.mimeType.includes("image")) {
            let headers = getHeaders()
            updateAttachment(<Pressable onPress={() => onPresshandler()} >
                <Image
                    source={{ uri: attachment.downloadReference, headers: headers, }}
                    style={DocStyles.img}
                />
                <Text style={AttacmentItemStyle.text}>{attachment.title}</Text>
            </Pressable>)
        } else {
            updateAttachment(<Pressable onPress={() => onPresshandler()} >
                <Text style={AttacmentItemStyle.text}>{attachment.title}</Text>
            </Pressable>)
        }
    }, [])

    async function onPresshandler() {
        await download(attachment)
    };

    const download = async (attachment: IAttachmentReferenceDetails) => {

        let headers = getHeaders()
        let file = await FileSystem.downloadAsync(attachment.downloadReference, FileSystem.documentDirectory + attachment.title, {
            headers: headers

        })

        if (Platform.OS == "ios") {
            await Share.share({
                url: file.uri
            }, {})
            return
        }

        if (attachment.mimeType.includes("image") || attachment.mimeType.includes("video")) {
            //NOTE working only for  images and videos
            let premission = await MediaLibrary.getPermissionsAsync();
            if (!premission.granted) {
                await MediaLibrary.requestPermissionsAsync()
            }
            await MediaLibrary.requestPermissionsAsync()

            try {
                let asset = await MediaLibrary.createAssetAsync(file.uri)
                await MediaLibrary.createAlbumAsync(Constants.manifest.name, asset, false)

            } catch (error) {
                console.log(error);
            }
            toast.show({ description: "Downloaded to folder " + Constants.manifest.name, placement: "top", status: "success" })
        } else {
            await Share.share({
                url: file.uri
            }, {})
        }
    }

    return (
        attachmentItem
    );

    function getHeaders() {
        return {
            sessionid: sessionid!,
            "request-token": token!,
            "request-signature": "",
            Accept: "*/*",
            "Content-Type": "application/json",
        }
    }
}

export default AttacmentItem;