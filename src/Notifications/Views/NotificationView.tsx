import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Input, Button } from "native-base"
import { useReduxSelector } from '../../AppState/Store';
import { ConversationType } from '../../AppState/MessagingHubState/Enums/ConversationType';
import { NotificationGroup } from './NotificationGroup';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { MessageDetails } from '../../AppState/MessagingHubState/Interfaces/MessageDetails';
import { ConversationDetails } from '../../AppState/MessagingHubState/Interfaces/IConversationDetails';
import { INotificationViewProps } from '../Interfaces/INotificationViewProps';
import { MessageStatus } from '../../AppState/MessagingHubState/Enums/MessageStatus';

export function NotificationView({ dataAccessLayer }: INotificationViewProps): JSX.Element {
    const conversations = useReduxSelector((state) => state.MessagingHub.conversations);
    const DAL = dataAccessLayer;
    let unreadMessagesCount: number = 0;
    let notArchivedMessages: MessageDetails[] = [];
    const [searchFilter, setSearchFilter] = useState<string>("")

    function search(conversation: ConversationDetails[], filter: string) {
        let lowerCaseFilter = filter.toLowerCase()
        let sysNotif = conversation.filter(item => item.type == ConversationType.System)
        let messages = sysNotif?.map(item => item.messages).reduce((acc, val) => acc.concat(val), [])
        let searchMess = messages?.filter(item => ((item?.title?.toLowerCase().includes(lowerCaseFilter) || item?.references[0]?.title?.toLowerCase().includes(lowerCaseFilter)) && !item.isArchived))
        return searchMess
    };

    return (
        <ScrollView >
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }} >
                <Button onPress={() => {
                    if (notArchivedMessages != undefined) {
                        notArchivedMessages.forEach((item) => { DAL.changeMessagesStatus([item.id], MessageStatus.Archived) })
                    } return;
                }}>
                    Clear all
                </Button>
            </View>
            <Input
                placeholder={"Search"}
                InputLeftElement={
                    <FontAwesomeIcon
                        icon={faSearch}
                    />
                }
                onChangeText={(text) => { setSearchFilter(text) }}
            />
            {conversations.map(item => {
                if (item.type == ConversationType.System) {
                    notArchivedMessages = item?.messages?.filter((item => (item.isArchived == false)))
                    unreadMessagesCount = item.unreadMessagesCount;
                    return (
                        <NotificationGroup
                            messages={search(conversations, searchFilter)}
                            dataAccessLayer={dataAccessLayer}
                            key={item.id}
                        />
                    )
                };
            })
            }
            {!(search(conversations, searchFilter)?.length > 0) && <Text>Нет новых уведомлений</Text>}
        </ScrollView>
    )
};


