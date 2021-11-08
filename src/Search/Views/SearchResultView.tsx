import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';
import { IFragment } from '../Interfaces/IFragment';
import { ISearchResultView } from '../Interfaces/ISearchResultView';
import { SearchResultViewStyles } from './SearchStyles/searchResultViewStyle';

/**
 * @SearchResultView
 * Functional component provides view of single search result
 * @returns JSX.Element
 */
const SearchResultView: FC<ISearchResultView> = ({ tempName, property, objectName, notify }): JSX.Element => {

    /**
     * @textHighLighter
     * Highlight search matching in text by entries index
     * @returns JSX.Elements array
     */
    function textHighLighter(): Array<JSX.Element> {
        const jsxArray: Array<JSX.Element> = [];
        const fragmetsArr: Array<IFragment> = [];
        let textValue: string = '';
        property.values.forEach(val => {
            textValue = val.value;
            val.fragments.forEach(frag => fragmetsArr.push(frag));
        })
        let splitedTextValue: Array<string> = textValue.split(' ');
        let entryIndex = 0;
        for (let i = 0; i < splitedTextValue.length; i++) {
            const item = splitedTextValue[i];
            let entryStart = fragmetsArr[entryIndex]?.propertyValueBegin;
            let entryEnd = fragmetsArr[entryIndex]?.propertyValueEnd;
            let entryString = textValue.slice(entryStart, entryEnd);
            if (item.includes(entryString)) {
                entryIndex++;
                jsxArray.push(<Text style={SearchResultViewStyles.text}>{item} </Text>);
            } else {
                jsxArray.push(<Text>{item} </Text>);
            };
        };
        return (jsxArray);
    };

    return (
        <Pressable onPress={() => notify()} >
            <View style={SearchResultViewStyles.boxView}>
                <View style={SearchResultViewStyles.boxText}>
                    <Text>
                        {objectName + ' (' + tempName + ')'}
                    </Text>
                </View>
                <Text>
                    {property.property.name + ': '}
                    {textHighLighter()}
                </Text>
            </View>
        </Pressable>
    );
};

export default SearchResultView;