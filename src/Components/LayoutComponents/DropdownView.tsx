import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DropdownViewStyle, DropdownMenuStyle, ViewStyle } from './Styles/dropdownViewStyle';
import { ViewArrow } from '../../Navigation/NavigationViews/NavigationStyles/navigationOmni';

interface IPopup {
    header: string;
    content: JSX.Element;
};

const DropdownView = ({ header, content }: IPopup): JSX.Element => {
    const [displayView, setDisplayView] = useState('flex')
    return (
        <>
            <DropdownMenuStyle checked={displayView === 'flex' ? true : false} >
                <Text style={DropdownViewStyle.text}>{header}</Text>
                <Pressable onPress={() => setDisplayView(displayView === 'none' ? 'flex' : 'none')} >
                    <ViewArrow checked={displayView === 'flex' ? true : false} >
                        <FontAwesomeIcon icon={faChevronDown} size={16} color={'white'} />
                    </ViewArrow>
                </Pressable>
            </DropdownMenuStyle>
            <ViewStyle displayView={displayView}>
                {content}
            </ViewStyle>
        </>
    );
};

export default DropdownView;