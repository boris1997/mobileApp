import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { toggleRightDrawer } from '../../AppState/DrawerControl/DrawerControlSlice';
import { IModulesMediator } from '../../AppMediator/Interfaces/IModulesMediator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faIdCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { setLoggedIn } from '../../AppState/AuthenticationState/AuthenticationSlice';
import { AuthState } from '../../AppState/AuthenticationState/Enums/AuthState';
import { resetMessagingHubState } from '../../AppState/MessagingHubState/MessagingHubSlice';
import { resedPassedObject } from '../../AppState/MainScreenState/MainScreenSlice';

interface IAppHeaderProfileMenu {
    mediator: IModulesMediator;
};

function AppHeaderProfileMenu({ mediator }: IAppHeaderProfileMenu): JSX.Element {
    const dispatch = useReduxDispatch();
    const { model } = useReduxSelector(state => state.Profile);

    function userProfileButtonPressEvent() {
        mediator.navigateTo('Profile')
        dispatch(toggleRightDrawer(false));
    };

    function exitButtonPressEvent() {
        dispatch(setLoggedIn(AuthState.logouted));
        dispatch(resetMessagingHubState());
        dispatch(resedPassedObject());
        mediator.closeConnection();
        mediator.navigateTo('Login')
        dispatch(toggleRightDrawer(false));
    };

    return (
        <View  >
            <View style={{ marginLeft: 10, flexDirection: 'column' }} >
                <Text style={{ color: 'black', fontSize: 18 }} >{model?.username.toUpperCase()}</Text>
                <Text style={{ color: 'gray', fontSize: 12 }} >{model?.mbox}</Text>
            </View>
            <Pressable
                style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    margin: 5, padding: 5,
                    shadowColor: 'black',
                    shadowOpacity: 1,
                    shadowOffset: { width: 10, height: 10 },
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                    borderColor: '#DCDCDC',
                    borderRadius: 4
                }}
                onPress={() => userProfileButtonPressEvent()} >
                <FontAwesomeIcon icon={faIdCard} size={30} color={"#757575"} />
                <Text style={{ margin: 5 }}  >Profile</Text>
            </Pressable>
            <Pressable
                style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    margin: 5, padding: 5,
                    shadowColor: 'black',
                    shadowOpacity: 1,
                    shadowOffset: { width: 10, height: 10 },
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                    borderColor: '#DCDCDC',
                    borderRadius: 4
                }}
                onPress={() => exitButtonPressEvent()} >
                <FontAwesomeIcon icon={faSignOutAlt} size={30} color={"#757575"} />
                <Text style={{ margin: 5 }} >Exit</Text>
            </Pressable>
            <Image style={{ height: 33, width: 215, margin: 10 }} source={require('../../../assets/cmw_icon.png')} />
            <Text style={{ height: 40, width: 190, margin: 10 }} >Comindware Business Application Platform</Text>
        </View>
    );
};

export default AppHeaderProfileMenu;