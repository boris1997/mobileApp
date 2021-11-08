import React, { FC, useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import 'moment/locale/ru'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBan, faCheckDouble, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { IconButton } from 'native-base';
import { notificationTypes, icons } from '../meta';
import { NotificateItemStyle, ViewStyle } from './NotificationsStyles/notificateItemStyle';
import { RequestModule } from '../../RequestModule/RequestModule';
import { useReduxDispatch } from '../../AppState/Store';
import { toggleRightDrawer } from '../../AppState/DrawerControl/DrawerControlSlice';
import { MessageStatus } from '../../AppState/MessagingHubState/Enums/MessageStatus';
import { INotificationItemProps } from '../Interfaces/INotificationItemProps';
import { IObjectProps } from '../../MainScreen/Interfaces/IObjectProps';
import { MessageDetails } from '../../AppState/MessagingHubState/Interfaces/MessageDetails';




export const NotificationItem: FC<INotificationItemProps> = ({ message, dataAccessLayer }): JSX.Element => {
    
    const dispatch = useReduxDispatch();
    const DAL = dataAccessLayer;
    const [pressable, setPressable] = useState<boolean>(false);

    if (message.isArchived) { return <View /> }

    useEffect(() => {
        if (message.type == notificationTypes.userTask || message.type == notificationTypes.conversation) {
            setPressable(true)
        }
    }, [message.type])


    message = parseMessage(message);

    //TODO Localize it!
    function parseMessage(message: MessageDetails): MessageDetails {
        const eventsNumber = message.references.length;
        const eventsPluralForm = "новое уведомление";
        let copyMessage = { ...message }
        switch (copyMessage.type) {
            case notificationTypes.userTask: {
                let eventsContainerType = "задаче";
                copyMessage.icon = icons.task;
                const notificationTitle = `У вас есть ${eventsNumber} ${eventsPluralForm} в ${eventsContainerType}`;
                copyMessage.title = notificationTitle;
                return copyMessage;
            }
            case notificationTypes.history: //NOTE сейчас нет, но возможно появится
                copyMessage.icon = icons.history;
                copyMessage.title = "Выполнение операций";
                return copyMessage;
            case notificationTypes.baseNotification:
                copyMessage.icon = icons.from;
                return copyMessage;
            case notificationTypes.license:
                copyMessage.icon = icons.from;
                copyMessage.title = "лицензия";
                return copyMessage;
            case notificationTypes.conversation: {
                const eventsContainerType = "обсуждении"
                copyMessage.icon = icons.Conversation;
                const notificationTitle = `У вас есть ${eventsNumber} ${eventsPluralForm} в ${eventsContainerType}`;
                copyMessage.title = notificationTitle;
                return copyMessage;
            }
            default: return copyMessage
        };

    }

    function iconBar(): JSX.Element {
        return (
            <View style={NotificateItemStyle(pressable).view}>
                <IconButton
                    icon={<FontAwesomeIcon
                        icon={faCheckDouble}
                    />}
                    onPress={() => { DAL.changeMessagesStatus([message.id], MessageStatus.Read) }} //TODO переместить в другое место 
                />
                <IconButton
                    icon={<FontAwesomeIcon
                        icon={faBan}
                    />}
                    onPress={() => { DAL.changeMessagesStatus([message.id], MessageStatus.Archived) }} //TODO и это тоже 
                />
            </View>
        )
    };

    return (
        <Pressable
            onPress={async () => {
                if (pressable) {
                    let result = await RequestModule.send("/MyWorkTasks/GetTask", "POST", { taskId: message.parent.objectId })
                    let json = await result.json();
                    const obj: IObjectProps = { ObjectId: message.parent.objectId, ContainerId: json?.data?.container?.id, formId: json?.data?.formId };
                    DAL.notifyMainScreen(obj);
                    DAL.navigateTo("MainScreenView");
                    dispatch(toggleRightDrawer(false));
                }
            }}
        >
            <ViewStyle isRead={message.isRead}>
                <FontAwesomeIcon
                    icon={message.icon!}
                    style={NotificateItemStyle().icon}
                />
                <Text style={NotificateItemStyle(pressable).text}>
                    {`${message.title} ${message.parent.title == undefined ? "" : message.parent.title}`}
                </Text >
                <Text style={NotificateItemStyle().text}>
                    {message.type == notificationTypes.conversation ? message.references.map(reference => formatDate(reference.referencedMessage.creationDate)) : message.references.map(reference => formatDate(reference.creationDate))}
                </Text>
                <Text style={NotificateItemStyle().text}>
                    {message.type == notificationTypes.conversation ? message.references.map(reference => reference.referencedMessage.title) : message.references.map(reference => reference.title)}
                </Text>
                {iconBar()}
            </ViewStyle>
        </Pressable>

    );
};


function formatDate(date: Date) {
    return (moment(date).format("DD MMMM [в] HH:mm:ss").toString())
}