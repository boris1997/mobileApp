import { faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { View } from "react-native"
import React, { FC } from "react"
import { Platform, Pressable } from "react-native"
import { IReference } from "../../../AppState/MessagingHubState/Interfaces/IReferenceDetails"
import { Actionsheet, Box, Button, Text, useDisclose } from 'native-base';
interface IAttachmentButton {

    pickDocument(): Promise<IReference[] | undefined>;
    pickMedia(): Promise<IReference[] | undefined>;


}

export const AttachmentButton: FC<IAttachmentButton> = ({ pickMedia, pickDocument }) => {

    const { isOpen, onOpen, onClose } = useDisclose()

    return (
        <>
            <Pressable
                onPress={onOpen}
            >
                <FontAwesomeIcon icon={faPaperclip} size={30} color={'black'} />
            </Pressable>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Button onPress={async () => { onClose(); return await pickMedia()}} > Photo or Video </Button>
                    <Button onPress={async () => {onClose(); return await pickDocument()}} > File </Button>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    )
}