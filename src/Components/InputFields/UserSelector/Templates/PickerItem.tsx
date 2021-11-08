import React from 'react';
import { Select } from 'native-base';

export function PickerItem<T>({item}: T) {
    return (
        <Select.Item label={item.name} value={item.name} />
    );
};