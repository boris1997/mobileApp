import { Button } from 'native-base';
import React, { FC, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { TargetProperties } from '../../AppState/ProfileState/Enums/TargetProperies';
import { IPropertyChange } from '../../AppState/ProfileState/Interfaces/IPropertyChange';
import { ISupervisor } from '../../AppState/ProfileState/Interfaces/ISupervisor';
import { changeTargetProp } from '../../AppState/ProfileState/ProfileSlice';
import store, { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { CheckboxView } from '../../Components/InputFields/CheckBox/CherboxView';
import { SingleLineTextInputView } from '../../Components/InputFields/TextComponents/Views/SinglelineTextInputView';
import { PickerView } from '../../Components/InputFields/UserSelector/Views/PickerView';
import DropdownView from '../../Components/LayoutComponents/DropdownView';
import { ICollectionElement } from '../Interfaces/ICollectionElement';
import { IMyProfileScreenProps } from '../Interfaces/IMyProfileScreenProps';
import { MyProfileViewStyle } from './myProfileViewsStyles/myProfileViewStyle';

const MyProfileScreen: FC<IMyProfileScreenProps> = ({ dataAccessLayer }) => {
    //#region Variables, collections, hooks
    const DAL = dataAccessLayer;
    const [actualPass, setActualPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [error, setError] = useState<string>('')
    const dispatch = useReduxDispatch()
    const { model, supervisorsList } = useReduxSelector(state => state.Profile)

    const authenticationTypes = {
        BUILTIN: 'Builtin',
        LDAP: 'Ldap',
        FEDERATION: 'Federation'
    };

    const languageTypes = {
        RU: 'ru',
        EN: 'en',
        DE: 'de'
    };

    const authenticationCollection: Array<ICollectionElement> = [
        {
            id: authenticationTypes.BUILTIN,
            name: authenticationTypes.BUILTIN
        },
        {
            id: authenticationTypes.LDAP,
            name: authenticationTypes.LDAP
        },
        {
            id: authenticationTypes.FEDERATION,
            name: authenticationTypes.FEDERATION
        }
    ];

    const languagesCollection: Array<ICollectionElement> = [
        {
            id: languageTypes.RU,
            name: languageTypes.RU
        },
        {
            id: languageTypes.EN,
            name: languageTypes.EN
        },
        {
            id: languageTypes.DE,
            name: languageTypes.DE
        }
    ];
    //#endregion

    //#region Data fetchign functions
    async function getProfileData(): Promise<void> {
        await DAL.getProfileInfo()
    };

    async function editProfileChanges(): Promise<void> {
        const obj = store.getState().Profile.model
        await DAL.editAccountInfo(obj!)
        await getProfileData();
    };

    // async function ResetUserPassword() {
    //     await viewModel.changeUserPassword(actualPass, newPass)
    //     setError(viewModel.passChange)
    // };

    //#endregion

    //#region handlers
    function textInputHandler(text: string, target: TargetProperties): void {
        const obj: IPropertyChange = {
            target: target,
            value: text
        };
        dispatch(changeTargetProp(obj))
    };

    function pickerHandler(value: string, target: TargetProperties): void {
        const obj: IPropertyChange = {
            target: target,
            value: value
        };
        dispatch(changeTargetProp(obj))
    };

    function checkboxHandler(value: boolean, target: TargetProperties): void {
        const obj: IPropertyChange = {
            target: target,
            value: value
        };
        dispatch(changeTargetProp(obj))
    };
    //#endregion

    //#region Profile view
    return (
        <View style={MyProfileViewStyle.boxView} >
            <Button
                style={{ marginTop: 10 }}
                bgColor={'#0575bd'}
                onPress={() => editProfileChanges()} >save profile changes</Button>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* <View>
                    <Text>Old pass</Text>
                    <Input
                    onChangeText={(text) => setActualPass(text)}
                    />
                    <Text>new pass</Text>
                    <Input
                    onChangeText={(text) => setNewPass(text)}
                    />
                    <Button
                    onPress={() => ResetUserPassword()}
                    >submit</Button>
                    <Text>{error}</Text>
                </View> */}
                <DropdownView header='Основные настройки' content={
                    <>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Язык</Text>
                            {new PickerView<ICollectionElement>(languagesCollection, model?.language, (value: any) => pickerHandler(value, TargetProperties.language)).getView()}
                        </View>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Метод проверки подлинности</Text>
                            {new PickerView<ICollectionElement>(authenticationCollection, model?.authenticationMethod, (value: any) => pickerHandler(value, TargetProperties.authenticationMethod)).getView()}
                        </View>
                    </>
                } />
                <DropdownView header='Контактная информация' content={
                    <>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Имя</Text>
                            {new SingleLineTextInputView(model?.fullName, false, (text: string) => textInputHandler(text, TargetProperties.fullName), 'default').getView()}
                        </View>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Имя пользователя</Text>
                            {new SingleLineTextInputView(model?.username, false, (text: string) => textInputHandler(text, TargetProperties.username), 'default').getView()}
                        </View>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Адрес эл. почты</Text>
                            {new SingleLineTextInputView(model?.mbox, false, (text: string) => textInputHandler(text, TargetProperties.mbox), 'default').getView()}
                        </View>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Телефон</Text>
                            {new SingleLineTextInputView(model?.phone, false, (text: string) => textInputHandler(text, TargetProperties.phone), 'numeric').getView()}
                        </View>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Skype</Text>
                            {new SingleLineTextInputView(model?.skype, false, (text: string) => textInputHandler(text, TargetProperties.skype), 'default').getView()}
                        </View>
                    </>
                } />
                <DropdownView header='Сведения о работе' content={
                    <>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Должность</Text>
                            {new SingleLineTextInputView(model?.title, false, (text: string) => textInputHandler(text, TargetProperties.title), 'default').getView()}
                        </View>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Руководитель</Text>
                            {new PickerView<ISupervisor>(supervisorsList!?.options, model?.manager, (value: any) => pickerHandler(value, TargetProperties.manager)).getView()}
                        </View>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Отдел</Text>
                            {new SingleLineTextInputView(model?.department, false, (text: string) => textInputHandler(text, TargetProperties.department), 'default').getView()}
                        </View>
                        <View style={MyProfileViewStyle.selectBox}>
                            <Text>Офис</Text>
                            {new SingleLineTextInputView(model?.office, false, (text: string) => textInputHandler(text, TargetProperties.office), 'default').getView()}
                        </View>
                    </>
                } />
                <DropdownView header='Статус' content={
                    <View style={MyProfileViewStyle.checkBox}>
                        {new CheckboxView(model!?.isActive, '', 'Активен', (value: boolean) => checkboxHandler(value, TargetProperties.isActive)).getView()}
                        {new CheckboxView(model!?.IsDisabled, '', 'В архиве', (value: boolean) => checkboxHandler(value, TargetProperties.IsDisabled)).getView()}
                        {/* <Text>{model?.lastLoginDate.toDateString()}</Text> */}
                    </View>
                } />
                <DropdownView header='Замещение' content={
                    <>
                        {/* <View style={{ marginBottom: 10 }} >
                            <Text>Skype</Text>
                            {new SingleLineTextInputView(ProfileInfo?.skype, true).getView()}
                        </View> */}
                    </>
                } />
            </ScrollView>
        </View >

    );
    //#endregion
};

export default MyProfileScreen;