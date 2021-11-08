import React from 'react';
import { Select } from 'native-base';
import { PickerItem } from "./PickerItem";
import { FormControl } from 'native-base';
import { IPickerSelector } from '../Interfaces/IPickerSelector';
import { PickerVariables } from '../Enums/PickerVariables';
import { Pressable, View } from 'react-native';

export function PickerComponent<T>({ items, value, isRequired, isReadOnly, isDisabled, handler }: IPickerSelector<T>) {
    return (
        <FormControl isRequired={isRequired} isReadOnly={isReadOnly} isDisabled={isDisabled}  >
            {/* <FormControl.Label>{UserSelectorVariables.placeholderLabel}</FormControl.Label> */}
            <Select
                variant='rounded'
                selectedValue={value}
                placeholder={value}
                placeholderTextColor={PickerVariables.placeholderTextColor}
                onValueChange={(value) => handler(value)}
            >
                {
                    items != undefined
                        ? items.map(item =>
                            <PickerItem key={item.id} item={item} />)
                        : <View />
                }
            </Select>
        </FormControl>
    );
};


