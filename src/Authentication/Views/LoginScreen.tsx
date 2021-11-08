import React, { useState, useEffect, useCallback } from 'react';
import { Platform, Button, ScrollView, Image, View, Text, Pressable, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import { Alert, CloseIcon, IconButton, KeyboardAvoidingView } from "native-base"
import { useNavigation } from '@react-navigation/native';
import { SavedCurrentData, SavedData } from '../Data/Data';
import { useFocusEffect } from '@react-navigation/native';
import { TextStyle, LoginScreenStyles, LoginButton, FieldText } from './Styles/LoginScreenStyles';
import { faEye, faEyeSlash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FormControl, Input } from "native-base"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { AuthState } from '../../AppState/AuthenticationState/Enums/AuthState';
import { setDomain, setLoggedIn, setPassword, setServerAdress, setShowError, setUsername, setIsLoading } from '../../AppState/AuthenticationState/AuthenticationSlice';
import { RequestModule } from '../../RequestModule/RequestModule';
import { SecureStore } from '../../SecureStore/SecureStore';
import ErrorHandler from '../../ErrorHandler/ErrorHandler';
import { ILoginScreenProps } from '../Interfaces/ILoginScreenProps';

export function LoginScreen({ viewModel }: ILoginScreenProps) {
    const ViewModel = viewModel;
    const [errorMessage, setErrorMessage] = useState<string>();
    const [savedUserData, setSavedUserData] = useState<SavedData[]>([]);
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const navigation = useNavigation();
    const dispatch = useReduxDispatch();
    const { loggedIn, serverAddress, username, password, showError, isLoading, domain } = useReduxSelector(state => state.Authentication);

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            showPrefill();
            dispatch(setShowError(false));
            return () => {
                // Do something when the screen is unfocused
                showPrefill();
                dispatch(setShowError(false));
            };
        }, [])
    );

    useEffect(() => {
        showPrefill();
        ViewModel.setNavigation(navigation);
        if (loggedIn === AuthState.undefined) {
            ViewModel.tryLogin();
        }
    }, []);

    async function showPrefill() {
        let data = await SecureStore.getSavedUsersData();
        setSavedUserData(data);
    };

    const tryLogin = async () => {
        let sendRequest = await ViewModel.validateForm({ username, serverAddress, password, domain })
        if (sendRequest != undefined) {
            dispatch(setShowError(true))
            setErrorMessage(ViewModel.getErrorMessage());
        } else {
            setErrorMessage(undefined);
        }
    };

    function LoginPage(): JSX.Element {
        return (
            <KeyboardAvoidingView
                style={LoginScreenStyles.mainPage}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Image style={LoginScreenStyles.imageField} source={require('../../../assets/cmw_icon.png')} />
                <ScrollView>
                    <FieldText>Адрес сервера</FieldText>
                    <View style={LoginScreenStyles.inputBox}>
                        <FormControl isInvalid={!serverAddress?.trim()}>
                            <Input
                                scrollEnabled={false}
                                multiline={false}
                                style={LoginScreenStyles.inputField}
                                onChangeText={(text) => dispatch(setServerAdress(text))}
                                value={serverAddress}

                            />
                        </FormControl>
                    </View>
                    <FieldText>Домен</FieldText>
                    <View style={LoginScreenStyles.inputBox}>
                        <FormControl isInvalid={false}>
                            <Input
                                scrollEnabled={false}
                                multiline={false}
                                style={LoginScreenStyles.inputField}
                                onChangeText={(text) => dispatch(setDomain(text))}
                                value={domain}
                            />
                        </FormControl>
                    </View>
                    <FieldText>Эл. почта или имя пользователя</FieldText>
                    <View style={LoginScreenStyles.inputBox}>
                        <FormControl isInvalid={!username?.trim()}>
                            <Input
                                scrollEnabled={false}
                                multiline={false}
                                style={LoginScreenStyles.inputField}
                                onChangeText={(text) => dispatch(setUsername(text))}
                                value={username}
                                placeholder="Username"
                            />
                        </FormControl>
                    </View>
                    <FieldText>Пароль</FieldText>
                    <FormControl isInvalid={!password?.trim()}>
                        <Input
                            scrollEnabled={false}
                            multiline={false}
                            onChangeText={(text) => dispatch(setPassword(text))}
                            InputRightElement={<IconButton
                                icon={
                                    <FontAwesomeIcon icon={hidePassword ? faEye : faEyeSlash} />}
                                onPress={() => setHidePassword(!hidePassword)}
                            >
                            </IconButton>}
                            secureTextEntry={hidePassword}
                            style={LoginScreenStyles.inputField}
                            value={password}
                            placeholder="*******"
                        />
                    </FormControl>
                    <LoginButton onPress={() => tryLogin()}>
                        <TextStyle>Войти</TextStyle>
                    </LoginButton>
                    <Button onPress={() => { dispatch(setPassword("C0m1ndw4r3Pl@tf0rm")) }} title={"Fill in password"} />
                    {showError && <Alert
                        style={LoginScreenStyles.alertField}
                        status="error"
                        action={<IconButton
                            icon={<CloseIcon size="xs" />}
                            onPress={() => dispatch(setShowError(false))} />}
                    >
                        <Alert.Icon />
                        <Alert.Description>{errorMessage}</Alert.Description>
                    </Alert>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
        )
    };

    interface ISelectableUserItem {
        onPress: () => void;
        title: string
    };

    function SelectableUserItem({ onPress, title }: ISelectableUserItem) {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={{
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: '#DCDCDC',
                    margin: 5,
                    alignItems: 'center',
                    height: 40,
                    width: '60%'
                }}
            >
                <Text>{title}</Text>
            </TouchableOpacity>
        )
    };

    async function selectableUserItemPressEvent(userName: string, serverAddres: string) {
        try {
            dispatch(setIsLoading(true))
            await SecureStore.deleteCurrentUser();
            const savedData = await SecureStore.getSavedUsersData();
            const savedItem = savedData.find((item) => {
                return item.userName === userName && item.serverAddres === serverAddres;
            });
            const data: SavedCurrentData = {
                token: savedItem!.token,
                sessionId: savedItem!.sessionId,
                serverAddress: savedItem!.serverAddres,
                username: savedItem!.userName,
                accountId: savedItem!.accountId,
                protocol: savedItem!.protocol,
                domain: savedItem!.domain,
            };
            await SecureStore.setCurrentUser(data);
            ViewModel.tryLogin();
        } catch (error) {
            dispatch(setIsLoading(false))
            ErrorHandler.handleError(LoginScreen.name, selectableUserItemPressEvent.name, error);
        };
    };

    function PickUserPage() {
        return (
            <View style={{ marginTop: 20 }} >
                <Image style={LoginScreenStyles.imageField} source={require('../../../assets/cmw_icon.png')} />
                <Text style={{ marginLeft: 5, fontSize: 20 }} >Select user</Text>
                <ScrollView>
                    {savedUserData.map(item => {
                        let domain: string = "";
                        if (item.domain) {
                            domain = item.domain + "\\"
                        }
                        return (<SelectableUserItem
                            key={Math.random()}
                            title={domain + item.userName + "\n" + item.protocol + item.serverAddres}
                            onPress={() => selectableUserItemPressEvent(item.userName, item.serverAddres)
                            }
                        />)
                    }
                    )}
                    <Pressable
                        onPress={() => dispatch(setLoggedIn(AuthState.undefined))}
                        style={{
                            borderStyle: 'solid',
                            borderWidth: 1,
                            borderColor: '#DCDCDC',
                            margin: 5,
                            paddingLeft: 10,
                            alignItems: 'center',
                            flexDirection: 'row',
                            height: 40,
                            width: '60%',
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} color={'#303030'} size={25} />
                        <Text style={{ margin: 5, fontSize: 15 }} >Add new user</Text>
                    </Pressable>
                </ScrollView>
            </View>
        )
    };

    function getView() {
        ViewModel.setNavigation(navigation);
        if (isLoading) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
                    <ActivityIndicator animating={true} color={'#1E90FF'} size={100} />
                </View>
            )
        } else switch (loggedIn) {
            case AuthState.logouted: {
                if (savedUserData != []) {
                    return PickUserPage();
                } else {
                    return LoginPage();
                };
            };
            case AuthState.undefined: {
                return LoginPage();
            };
        };
    };

    return (
        <View style={{ flex: 1 }} >
            {getView()}
        </View>
    )
    //TODO добавить дополнительные возможности для входа
};

export default LoginScreen;