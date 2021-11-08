import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentView } from '../NavigationViews/DrawerContentView';
import AppHeader from '../../Components/LayoutComponents/AppHeader';
import ConversationView from '../../Conversations/ConversationViews/ConversationView';
import MainScreenView from '../../MainScreen/Views/MainScreenView';
import MyProfileScreen from '../../MyProfile/MyProfileViews/MyProfileScreen';
import { IMainDrawerProps } from '../Interfaces/IMainDrawerProps';

const Drawer = createDrawerNavigator();
function MainDrawerNavigator({ mediator, navigationDAL, mainScreenDAL, myProfileDAL, conversationDAL }: IMainDrawerProps) {
    return (
        <Drawer.Navigator
            drawerPosition='left'
            drawerType='back'
            //@ts-ignore
            drawerContent={() => <DrawerContentView dataAccessLayer={navigationDAL} />}
            backBehavior='initialRoute'
            initialRouteName='MasterStackNavigator'
            screenOptions={{
                header: () => <AppHeader mediator={mediator} />,
                headerShown: true,
            }}
        >
            <Drawer.Screen name="MainScreenView">
                {() => <MainScreenView dataAccessLayer={mainScreenDAL} />}
            </Drawer.Screen>
            <Drawer.Screen name="Conversation">
                {() => <ConversationView dataAccessLayer={conversationDAL} />}
            </Drawer.Screen>
            <Drawer.Screen name="Profile">
                {() => <MyProfileScreen dataAccessLayer={myProfileDAL} />}
            </Drawer.Screen>
        </Drawer.Navigator>

    );
};

export default MainDrawerNavigator;
