import React, { FC, useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { NavigationItemModel } from '../Interfaces/NavigationItemModel';
import { NavigationItemConstructor } from './NavigationItemConstructor';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IGroupItemProps } from '../Interfaces/IGroupItem';
import { TextStyle } from './NavigationStyles/groupItemStyle';
import { NavigationOmni, ViewArrow } from './NavigationStyles/navigationOmni';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { setChekedItemId } from '../../AppState/Navigation/NavigationSlice';

const GroupItemView: FC<IGroupItemProps> = ({ id, title, children, getItems, getChildrenFor, dataAccessLayer, newItemClass }) => {
    const [model, setModel] = useState<NavigationItemModel[] | undefined>()
    const [checked, setChecked] = useState(false);
    const { searchString, chekedItemId } = useReduxSelector(state => state.Navigation);
    const dispatch = useReduxDispatch();


    useEffect(() => {
        if (children === undefined) {
            setModel(getChildrenFor());
            getItems();
        }
    }, [checked]);

    function pressEvent() {
        setChecked(!checked);
        dispatch(setChekedItemId(id))
    };

    function setHighlight() {
        if (chekedItemId === id && checked) {
            return true;
        } else return false;
    };

    function RenderChildren() {
        if (checked || searchString != '') {
            if (children != undefined) {
                return children.map(item => new newItemClass(item, dataAccessLayer).onRender())
            } else if (checked) {
                return model === undefined
                    ? <View />
                    : model.map(item => new newItemClass(item, dataAccessLayer).onRender())
            }
        } else {
            return <View />
        };
    };

    return (
        <Pressable onPress={() => { model === undefined ? () => { } : model[0] === undefined ? () => { } : pressEvent() }}>
            <View style={NavigationOmni.boxField}>
                {/* <Image style={NavigationOmni.iconMain} source={require('************')} Или source={{ uri: '*********' }}/> */}
                <View style={{ borderWidth: 1, borderColor: "red", width: 15, height: 15, marginRight: 10 }}></View>
                <TextStyle checked={setHighlight()} numberOfLines={1} ellipsizeMode='tail'>{title}</TextStyle>
                {model === undefined ? <View /> : model[0] === undefined ? <View /> :
                    <ViewArrow checked={checked}><FontAwesomeIcon icon={faChevronDown} /></ViewArrow>}
            </View>
            <View >
                {RenderChildren()}
            </View>
        </Pressable >
    );
};

export default GroupItemView;