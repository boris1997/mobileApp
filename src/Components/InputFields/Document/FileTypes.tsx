import React, { FC } from 'react';
import { Text, Image, TouchableHighlight, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from "native-base"
import { useNavigation } from '@react-navigation/native';
import { filePreview } from './FilePreview';
import { DocStyles } from './DocumentStyles';

export interface IAttachFileProps {
    filename: string;
    uri: string;
    deliteFile(uri: string): any;
    type: string | undefined;
};

export enum Doctype {
    Image = 'image',
    Video = 'video',
    Document = 'document',
};

export const AttachFilePreview: FC<IAttachFileProps> = ({ filename, uri, deliteFile, type }) => {
    let docType: Doctype | undefined;
    let maxFileNameLength = 30;
    const navigation = useNavigation();

    switch (type) {
        case 'image':
            docType = Doctype.Image
            break;
        case 'document':
            docType = Doctype.Document
            break;
        case 'video':
            docType = Doctype.Video
            break;
        default:
            docType = undefined;
            break;
    }

    const deleteButton = () => {
        return (
            <IconButton
            style={DocStyles.iconButton}
                onPress={() => deliteFile(uri)}
                icon={
                    <FontAwesomeIcon
                        icon={faTrash}
                        size={30}
                        color='red'
                    />}
            />

        )
    };

    const fileName = () => {
        return (
            <Text>
                {filename.length > maxFileNameLength ? filename.substring(0, maxFileNameLength) + "..." : filename}
            </Text>
        )
    }

    const defaultFileIcon = () => {
        return (
            <FontAwesomeIcon
                icon={faFile}
                size={35}
                color='blue' />
        )
    }

    if (docType === Doctype.Image) {
        return (
            <View style={DocStyles.container} >
                <TouchableHighlight onPress={() => navigation.navigate("imagePreview", { uri: uri, type: type })} >
                    <Image
                        source={{ uri: uri }}
                        style={DocStyles.img}
                    />
                </TouchableHighlight>
                {fileName()}
                {deleteButton()}
            </View>
        )
    }
    else if (docType === Doctype.Document) {
        return (
            <View style={DocStyles.container} >
                <TouchableHighlight onPress={() => filePreview(uri)}>
                    {defaultFileIcon()}
                </TouchableHighlight>
                {fileName()}
                {deleteButton()}
            </View>
        )
    }
    else if (docType == Doctype.Video) {
        return (
            <View style={DocStyles.container} >
                <TouchableHighlight onPress={() => navigation.navigate("videoPreview", { uri: uri })}>
                    {defaultFileIcon()}
                </TouchableHighlight>
                {fileName()}
                {deleteButton()}
            </View>
        )
    }
    else return (
        <View style={DocStyles.container} >
            <Text>
                Unidentified file type
            </Text>
        </View>
    )
};