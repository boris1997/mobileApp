import React, { FC } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faBell, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Badge, IconButton } from "native-base"
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeaderStyles, HeaderView, RightButtonContainet, SectionName } from './Styles/AppHeaderStyles';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { TargetView } from '../../AppState/DrawerControl/Enums/TargetView';
import { changeTargetView, toggleRightDrawer } from '../../AppState/DrawerControl/DrawerControlSlice';
import { IAppHeaderProps } from './Interfaces/IAppHeaderProps';
import { ConversationType } from '../../AppState/MessagingHubState/Enums/ConversationType';
import { View } from 'react-native';

const AppHeader: FC<IAppHeaderProps> = ({ mediator }) => {
    const navigation = useNavigation();
    const { header } = useReduxSelector(state => state.MainScreen);
    const { conversations } = useReduxSelector(state => state.MessagingHub);

    let unreadMessagesCount = conversations.filter(sysConv => sysConv.type == ConversationType.System).map(conv => conv.unreadMessagesCount)[0]


    const dispatch = useReduxDispatch();

    async function userPressEvent() {
        dispatch(toggleRightDrawer(true));
        dispatch(changeTargetView(TargetView.profile));
        await mediator.getProfileData();
    };

    function searchPressEvent(): void {
        dispatch(toggleRightDrawer(true));
        dispatch(changeTargetView(TargetView.search));
    };

    function notoficationPressEvent() {
        dispatch(toggleRightDrawer(true));
        dispatch(changeTargetView(TargetView.notifications));
    };

    async function burgerIconPressEvent(): Promise<void> {
        navigation.dispatch(DrawerActions.toggleDrawer())
        await mediator.openNavigationDrawer();
    };

    return (
        <SafeAreaView style={AppHeaderStyles.areaView} edges={["top"]} >
            <HeaderView>
                <IconButton
                    variant={'ghost'}
                    icon={<FontAwesomeIcon icon={faBars} size={35} color={"white"} />}
                    onPress={async () => await burgerIconPressEvent()}
                >
                </IconButton>
                <SectionName>
                    {header}
                </SectionName>
                <RightButtonContainet>
                    <IconButton
                        variant={'ghost'}
                        icon={<FontAwesomeIcon icon={faBell} size={35} color={"white"} />}
                        onPress={() => notoficationPressEvent()}
                        endIcon={ unreadMessagesCount == 0
                            ? <View />
                            : <Badge style={{ marginLeft: -12, marginTop: -12, borderRadius: 10, backgroundColor: "red" }} >
                                {unreadMessagesCount?.toString()}
                            </Badge>}
                    />
                    <IconButton
                        variant={'ghost'}
                        icon={<FontAwesomeIcon icon={faSearch} size={35} color={"white"} />}
                        onPress={() => searchPressEvent()}
                    />
                    <IconButton
                        variant={'ghost'}
                        icon={<FontAwesomeIcon icon={faUserCircle} size={35} color={"white"} />}
                        onPress={() => userPressEvent()}
                    />
                </RightButtonContainet>
            </HeaderView>
        </SafeAreaView>

    );
};

export default AppHeader;