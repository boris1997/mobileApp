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
    uri?: string;
    deliteFile(): void;
    type?: string | undefined;
};

export enum Doctype {
    Image = 'image',
    Video = 'video',
    Document = 'document',
};

export const AttachFilePreview: FC<IAttachFileProps> = ({ filename, uri, deliteFile, type }) => {
    
    let maxFileNameLength = 30;

    const deleteButton = () => {
        return (
            <IconButton
                style={{ alignSelf: "flex-end" }}
                onPress={() => deliteFile()}
                icon={
                    <FontAwesomeIcon
                        icon={faTrash}
                        size={15}
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
                size={15}
                color='blue' />
        )
    }

    return (
        <View style={DocStyles.container} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {defaultFileIcon()}
                {fileName()}
                {deleteButton()}
            </View>
        </View>
    )

};