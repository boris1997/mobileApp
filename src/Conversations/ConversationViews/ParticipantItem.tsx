import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IParticipantDetails } from '../../AppState/MessagingHubState/Interfaces/IParticipantDetails';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { IParticipantItem } from '../Interfaces/IParticipantItem';
import { ParticipantItemStyle } from './ConversationViewsStyles/participantItemStyle';

const ParticipantItem: FC<IParticipantItem> = ({participant}) => {
    return (
        <View style={ParticipantItemStyle.boxView}>
            <FontAwesomeIcon icon={faUser} size={30} color={participant.color} />
            <Text>{participant.fullName}</Text>
        </View>
    );
}

export default ParticipantItem;