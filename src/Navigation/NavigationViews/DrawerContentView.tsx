import React, { useEffect, FC } from 'react';
import { Button, Input, Divider, ScrollView } from 'native-base';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { OptionItem } from './OptionItem';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { setFilter, setSearchString } from '../../AppState/Navigation/NavigationSlice';
import ErrorHandler from '../../ErrorHandler/ErrorHandler';
import { DrawerItemStyle } from './NavigationStyles/drawerContentStyle';
import { WorkspaceItemConstructor } from './WorkspaceItemConstructor';
import { IGetRootNavigationProps } from '../../AppState/Navigation/Interfaces/IGetRootNavigationProps';
import { IDrawerContentViewProps } from '../Interfaces/IDrawerContentViewProps';

/**
 * @DrawerContentView
 * Функицональный компонент, реализующий представление
 * для навигации. 
*/
export const DrawerContentView: FC<IDrawerContentViewProps> = ({dataAccessLayer}) => {
    // const filter = new NavigationItemModelFilter()
    const optionsArray: string[] = []
    const DAL = dataAccessLayer;

    const dispatch = useReduxDispatch()
    const { model, filter, workspaceList } = useReduxSelector(state => state.Navigation)


    useEffect(() => {
        getNavigationData(null)
    }, []);

    const getNavigationData = async (filter: string[] | null) => {
        try {
            const obj: IGetRootNavigationProps = {
                filter: filter,
                searchString: ''
            };
            await DAL.getNavigationRoot(obj.filter, obj.searchString)
        } catch (error) {
            ErrorHandler.handleError(DrawerContentView.name, getNavigationData.name, error)
        };
    };

    async function textInputHandler(text: string) {
        dispatch(setSearchString(text))
        const obj: IGetRootNavigationProps = {
            filter: filter,
            searchString: text
        };
        await DAL.getNavigationRoot(obj.filter, obj.searchString)
    };

    async function saveFiltterChanges() {
        try {
            dispatch(setFilter(optionsArray))
            await getNavigationData(filter)
        } catch (error) {
            ErrorHandler.handleError(DrawerContentView.name, saveFiltterChanges.name, error)
        };
    };

    function NavigationOptions() {
        return workspaceList === undefined
            ? <View />
            : workspaceList.map(item => <OptionItem title={item.name} id={item.id} arr={optionsArray} key={item.id} />)
    };

    function NavigationItems() {
        return model === undefined
            ? <View />
            : model.map(item => new WorkspaceItemConstructor(item, DAL).onRender())
    };

    function RenderDrawerContentView() {
        if (model === undefined) {
            return (
                <View style={DrawerItemStyle.boxView}>
                    <ActivityIndicator animating={true} color='#00BFFF' size={60} />
                </View>
            )
        } else {
            return (
                <SafeAreaView style={DrawerItemStyle.boxField}>
                    <Input style={DrawerItemStyle.inputField} onChangeText={(text) => textInputHandler(text)} />
                    <ScrollView>
                        <View>{NavigationOptions()}</View>
                        <Button onPress={() => saveFiltterChanges()}>Save</Button>
                        <Divider />
                        <View>
                            {NavigationItems()}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )
        };
    };

    return (
        <>
            {RenderDrawerContentView()}
        </>
    );
};