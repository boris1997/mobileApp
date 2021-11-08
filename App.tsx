import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/Navigation/NavigationConfiguration/RootNavigator'
import { NativeBaseProvider, StatusBar } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TestNavigationDAL } from './src/Navigation/DataAccessLayer/TestNavigationDAL';
import { RealNavigationDAL } from './src/Navigation/DataAccessLayer/RealNavigationDAL';
import { TestAuthenticationDAL } from './src/Authentication/DataAccessLayer/TestAuthenticationDAL';
import { RealAuthenticationDAL } from './src/Authentication/DataAccessLayer/RealAuthenticationDAL';
import { AuthenticationViewModel } from './src/Authentication/ViewModels/AuthenticationViewModel';
import { Provider } from 'react-redux';
import store from './src/AppState/Store';
import { ModulesMediator } from './src/AppMediator/ModulesMediator';
import { INavigationDAL } from './src/Navigation/DataAccessLayer/INavigationDAL';
import { TestMainScreenDAL } from './src/MainScreen/DataAccessLayer/TestMainScreenDAL';
import { IMainScreenDAL } from './src/MainScreen/Interfaces/IMainScreenDAL';
import { IAuthenticationDAL } from './src/Authentication/Interfaces/IAuthenticationDAL';
import { ISearchDAL } from './src/Search/Interfaces/ISearchDAL';
import { RealSearchDAL } from './src/Search/DataAccessLayer/RealSearchDAL';
import { TestSearchDAL } from './src/Search/DataAccessLayer/TestSearchDAL';
import { INotificationDAL } from './src/Notifications/Interfaces/INotificationDAL';
import { RealNotificationDAL } from './src/Notifications/DataAccessLayer/RealNotificationsDAL';
import { TestNotificationDAL } from './src/Notifications/DataAccessLayer/TestNotificationsDAL';
import { IConversationDAL } from './src/Conversations/DataAccessLayer/IConversationDAL';
import { RealConversationDAL } from './src/Conversations/DataAccessLayer/RealConversationDAL';
import { TestConversationDAL } from './src/Conversations/DataAccessLayer/TestConversationDAL';
import { MessagingHubMediator } from './src/AppMediator/MessagingHubMediator';
import { TestMyProfileDAL } from './src/MyProfile/DataAccessLayer/TestMyProfileDAL';
import * as SecureStore from "expo-secure-store";
import { IMyProfileDAL } from './src/MyProfile/Interfaces/IMyProfileDAL';
import { RealMyProfileDAL } from './src/MyProfile/DataAccessLayer/RealMyProfileDAL';

async function ttt() {
  await SecureStore.deleteItemAsync('currentUser');
  await SecureStore.deleteItemAsync('usersData');
};

//  ttt()

let initType = 'test'

export const NavigationDAL = (): INavigationDAL => {
  if (initType === 'test') {
    return new TestNavigationDAL(_Mediator)
  }
  if (initType === 'real') {
    return new RealNavigationDAL(_Mediator)
  }
  else return new TestNavigationDAL(_Mediator)
};

const AuthenticationDAL = (): IAuthenticationDAL => {
  if (initType === 'test') {
    return new TestAuthenticationDAL(_Mediator);
  }
  if (initType === 'real') {
    return new RealAuthenticationDAL(_Mediator);
  }
  return new TestAuthenticationDAL(_Mediator);
};

const SearchDAL = (): ISearchDAL => {
  if (initType === 'test') {
    return new TestSearchDAL(_Mediator);
  }
  if (initType === 'real') {
    return new RealSearchDAL(_Mediator);
  }
  return new TestSearchDAL(_Mediator);
};

const NotificationDAL = (): INotificationDAL => {
  if (initType === 'test') {
    return new TestNotificationDAL(_Mediator, _MessagingHubMediator);
  }
  if (initType === 'real') {
    return new RealNotificationDAL(_Mediator, _MessagingHubMediator);
  }
  return new TestNotificationDAL(_Mediator, _MessagingHubMediator);
};

const ConversationDAL = (): IConversationDAL => {
  if (initType === 'test') {
    return new TestConversationDAL(_MessagingHubMediator);
  }
  if (initType === 'real') {
    return new RealConversationDAL(_MessagingHubMediator);
  }
  return new TestConversationDAL(_MessagingHubMediator);
};

const MainScreenDAL = (): IMainScreenDAL => {
  return new TestMainScreenDAL(_Mediator, _MessagingHubMediator)
};

const ProfileDAL = (): IMyProfileDAL => {
  if (initType === 'test') {
    return new TestMyProfileDAL(_Mediator);
  }
  if (initType === 'real') {
    return new RealMyProfileDAL(_Mediator);
  }
  return new TestMyProfileDAL(_Mediator);
};

const _MessagingHubMediator = new MessagingHubMediator();
const _Mediator = new ModulesMediator(_MessagingHubMediator);
const authenticationDAL = AuthenticationDAL();
const navigationDAL = NavigationDAL();
const mainScreenDAL = MainScreenDAL();
const searchDAL = SearchDAL();
const profileDAL = ProfileDAL();
const notificationDAL = NotificationDAL();
const conversationDAL = ConversationDAL();
const _AuthenticationViewModel = new AuthenticationViewModel(authenticationDAL);

function App() {
  return (
    <Provider store={store} >
      <SafeAreaProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <StatusBar />
            <RootNavigator
              mediator={_Mediator}
              viewModel={_AuthenticationViewModel}
              searchDAL={searchDAL}
              notificationDAL={notificationDAL}
              navigationDAL={navigationDAL}
              mainScreenDAL={mainScreenDAL}
              myProfileDAL={profileDAL}
              conversationDAL={conversationDAL}
            />
          </NativeBaseProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;