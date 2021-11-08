import React, { FC } from 'react';
import { View } from 'react-native';
import { NotificationItem } from './NotificateItem';
import { INotificationGroupProps } from '../Interfaces/INotificationGroupProps';

export const NotificationGroup: FC<INotificationGroupProps> = ({ messages, dataAccessLayer }): JSX.Element => {

    if (!messages) return (<View />)

    return (
        <View>
            {[...messages]?.reverse().map(item =>
                <NotificationItem
                    message={item}
                    dataAccessLayer={dataAccessLayer}
                    key={item.id}
                />)}
        </View>
    );
};

