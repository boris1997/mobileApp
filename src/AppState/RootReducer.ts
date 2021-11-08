import { combineReducers } from '@reduxjs/toolkit'
import MainScreenSlice from './MainScreenState/MainScreenSlice'
import NavigationSlice from './Navigation/NavigationSlice'
import MessagingHubSlice from './MessagingHubState/MessagingHubSlice'
import SearchSlice from './SearchState/SearchSlice'
import ProfileSlice from './ProfileState/ProfileSlice'
import DrawerControlSlice from './DrawerControl/DrawerControlSlice'
import AuthenticationSlice from './AuthenticationState/AuthenticationSlice'

/** 
 * @RootReducer
 * Registration redusers in root reducer
*/
const RootReducer = combineReducers({
    Navigation: NavigationSlice,
    MainScreen: MainScreenSlice,
    Search: SearchSlice,
    MessagingHub: MessagingHubSlice,
    Profile: ProfileSlice,
    DrawerControl: DrawerControlSlice,
    Authentication: AuthenticationSlice
});

export default RootReducer