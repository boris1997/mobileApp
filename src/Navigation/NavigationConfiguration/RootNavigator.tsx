import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../Authentication/Views/LoginScreen'
import MainDrawerNavigator from './MainDrawerNavigator'
import SideMenu from 'react-native-side-menu-updated';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { TargetView } from '../../AppState/DrawerControl/Enums/TargetView';
import { Text, View } from 'react-native';
import { NotificationView } from '../../Notifications/Views/NotificationView';
import { SearchBar } from '../../Search/Views/SearchBar';
import AppHeaderProfileMenu from '../../MyProfile/MyProfileViews/AppHeaderProfileMenu';
import { IRootNavigatorProps } from '../Interfaces/IRootNavigator';
import { toggleRightDrawer } from '../../AppState/DrawerControl/DrawerControlSlice';

const Stack = createStackNavigator();

function RootNavigator({ mediator, viewModel, searchDAL, notificationDAL, navigationDAL, mainScreenDAL, myProfileDAL, conversationDAL }: IRootNavigatorProps) {
    const { isOpen, targetView } = useReduxSelector(state => state.DrawerControl);
    const dispatch = useReduxDispatch();

    function setMenuTargetWidget() {
        switch (targetView) {
            case TargetView.search: {
                return <SearchBar dataAccessLayer={searchDAL} />
            };
            case TargetView.profile: {
                return <AppHeaderProfileMenu mediator={mediator} />
            };
            case TargetView.notifications: {
                return <NotificationView dataAccessLayer={notificationDAL} />
            };
            case TargetView.undefined: {
                return <Text>undefined</Text>
            };
            default: {
                return <View />
            };
        };
    };

    return (
        <SideMenu
            menu={setMenuTargetWidget()}
            isOpen={isOpen}
            menuPosition='right'
            allowOverlayPressPropagation={true}
            disableGestures={true}
            onChange={() => { if (isOpen) { dispatch(toggleRightDrawer(false)) } }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name='Login'>
                    {() => <LoginScreen viewModel={viewModel} />}
                </Stack.Screen>
                <Stack.Screen name='MainDrawerNavigator'>
                    {() => <MainDrawerNavigator mediator={mediator} navigationDAL={navigationDAL} mainScreenDAL={mainScreenDAL} myProfileDAL={myProfileDAL} conversationDAL={conversationDAL} />}
                </Stack.Screen>
            </Stack.Navigator>
        </SideMenu>
    )
};

export default RootNavigator;

