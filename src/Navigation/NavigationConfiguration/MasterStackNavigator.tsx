import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreenView from '../../MainScreen/Views/MainScreenView';
import AppHeader from '../../Components/LayoutComponents/AppHeader';
import ConversationView from '../../Conversations/ConversationViews/ConversationView';
import MyProfileScreen from '../../MyProfile/MyProfileViews/MyProfileScreen';
import { _Mediator } from '../../../App';

const Stack = createStackNavigator();
function MasterStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MainScreenView" >
      <Stack.Screen name="MainScreenView" component={MainScreenView} />
      <Stack.Screen name="Conversation" component={ConversationView} />
      <Stack.Screen name="Profile" component={MyProfileScreen} />
    </Stack.Navigator>

  );
};

export default MasterStackNavigator;