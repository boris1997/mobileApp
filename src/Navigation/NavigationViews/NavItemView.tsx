import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { INavItem } from '../Interfaces/INavItem';
import { NavItemStyle } from './NavigationStyles/navItemStyle';
import { NavigationOmni } from './NavigationStyles/navigationOmni';
import { useReduxSelector, useReduxDispatch } from '../../AppState/Store';
import { TextStyle } from './NavigationStyles/groupItemStyle';
import { setChekedItemId } from '../../AppState/Navigation/NavigationSlice';

const NavItemView: FC<INavItem> = ({ id, title, notify }) => {
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);
    const { chekedItemId } = useReduxSelector(state => state.Navigation);
    const dispatch = useReduxDispatch();

    function PressEvent() {
        // notify(EventList.notifyMainScreen, title)
        setChecked(!checked);
        dispatch(setChekedItemId(id));
        navigation.navigate('MainScreenView');
    };

    function setHighlight() {
        if (chekedItemId === id && checked) {
            return true;
        } else return false;
    };

    return (
        <Pressable style={NavigationOmni.boxField} onPress={() => PressEvent()}>
            {/* <Image style={NavigationOmni.iconMain} source={require('************')} Или source={{ uri: '*********' }}/> */}
            <View style={{borderWidth: 1, borderColor: "red", width: 15, height: 15, marginRight: 10}}></View>
            <TextStyle checked={setHighlight()} numberOfLines={1} ellipsizeMode='tail' >{title}</TextStyle>
        </Pressable>
    );
};

export default NavItemView;