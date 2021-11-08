import { useNavigation } from '@react-navigation/core';
import { Badge, Button } from 'native-base';
import React, { useEffect, useMemo, FC } from 'react';
import { View, Text } from 'react-native';
import { ConversationType } from '../../AppState/MessagingHubState/Enums/ConversationType';
import { passConversationObjectId } from '../../AppState/MessagingHubState/MessagingHubSlice';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { IMainScreenViewProps } from '../Interfaces/IMainScreenViewProps';
import { mainScreenStyle } from './mainScreenStyles/mainScreenStyle';

const MainScreenView: FC<IMainScreenViewProps> = ({ dataAccessLayer }) => {
    const DAL = dataAccessLayer;
    const navigation = useNavigation();
    const dispatch = useReduxDispatch();
    const { objectModel, passedObject } = useReduxSelector(state => state.MainScreen);
    const { conversations } = useReduxSelector(state => state.MessagingHub);

    const convId = useMemo(() => {
        return getConversationId(passedObject?.ObjectId!)
    }, [conversations])

    useEffect(() => {
        if (passedObject?.ObjectId != undefined) {
            DAL.subscribeToObject(passedObject)
        } else return;
    }, [objectModel]);

    function getConversationId(objId: string) {
        const conversation = conversations.find((conv) => {
            if (conv.linkedParticipant != undefined) {
                if (conv.linkedParticipant.id === objId) {
                    return conv
                } else {
                    return
                }
            } else {
                return;
            }
        })
        return conversation?.id
    };

    function goToConversation() {
        dispatch(passConversationObjectId(passedObject!.ObjectId))
        navigation.navigate('Conversation')
    };

    function convButtonEndIcon() {
        return (
            <>
                {conversations.map((conv) => {
                    if (conv.id === convId && conv.type != ConversationType.System) {
                        if (conv.unreadMessagesCount > 0) {
                            return (
                                <Badge style={mainScreenStyle.badge}>
                                    {conv.unreadMessagesCount.toString()}
                                </Badge>
                            )
                        } else return <View />
                    } else return <View />
                })}
            </>
        );
    };

    return (
        <View>
            {objectModel != undefined
                ? (
                    <View>
                        <View style={mainScreenStyle.boxView}>
                            <Button
                                style={mainScreenStyle.button}
                                onPress={() => goToConversation()}
                                endIcon={convButtonEndIcon()}
                            >
                                <Text>Go to conv</Text>
                            </Button>
                            <View>

                            </View>
                        </View>
                        <Text>{'Заголовок объекта:  ' + objectModel.title}</Text>
                    </View>
                )
                : <View />
            }
        </View >
    );
};

export default MainScreenView;